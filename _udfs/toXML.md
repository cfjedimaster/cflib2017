---
layout: udf
title:  toXML
date:   2009-09-09T22:30:56.000Z
library: DataManipulationLib
argString: "input, element"
author: Phil Arnold
authorEmail: philip.r.j.arnold@googlemail.com
version: 0
cfVersion: CF6
shortDescription: Convert Structures/Arrays (including embedded) to XML.
description: |
 Need to convert a structure or array to XML and have it multi-level? This one recursive function will convert these items into a XML string (without the XML header), beginning with one element and walking through all keys and arrays.
 
 Very simple and very fast - for arrays it assumes that the array name is plural, and children will be the non-plural version (will be the same if not plural) - ending with an &quot;S&quot;, not intelligent, i.e. won't convert &quot;spies&quot; to &quot;spy&quot;.

returnValue: Returns a string.

example: |
 <cfscript>
     t = structNew();
     t.logical = "true";
     t.data = structNew();
     t.data.item = 1;
     t.data.another_item = 2;
     t.data.string = "hello";
     t.array_items = arrayNew(1);
     arrayAppend(t.array_items, "error 1");
     arrayAppend(t.array_items, "error 2");
     arrayAppend(t.array_items, "error 3");
 
     x = toXML(t, "root");
 </cfscript>
 <cfoutput>#HTMLeditFormat(x)#</cfoutput>

args:
 - name: input
   desc: Data to convert into XML.
   req: true
 - name: element
   desc: Used to name the root element.
   req: true


javaDoc: |
 <!---
  Convert Structures/Arrays (including embedded) to XML.
  
  @param input      Data to convert into XML. (Required)
  @param element      Used to name the root element. (Required)
  @return Returns a string. 
  @author Phil Arnold (philip.r.j.arnold@googlemail.com) 
  @version 0, September 9, 2009 
 --->

code: |
 <cffunction name="toXML" output="false" returntype="String">
     <cfargument name="input" type="Any" required="true" />
     <cfargument name="element" type="string" required="true" />
     <cfscript>
         var i = 0;
         var s = "";
         var s1 = "";
         s1 = arguments.element;
         if (right(s1, 1) eq "s") {
             s1 = left(s1, len(s1)-1);
         }
         
         s = s & "<#lcase(arguments.element)#>";
         if (isArray(arguments.input)) {
             for (i = 1; i lte arrayLen(arguments.input); i = i + 1) {
                 if (isSimpleValue(arguments.input[i])) {
                     s = s & "<#lcase(s1)#>" & arguments.input[i] & "</#lcase(s1)#>";
                 } else {
                     s = s & toXML(arguments.input[i], s1);
                 }
             }
         } else if (isStruct(arguments.input)) {
             for (i in arguments.input) {
                 if (isSimpleValue(arguments.input[i])) {
                     s = s & "<#lcase(i)#>" & arguments.input[i] & "</#lcase(i)#>";
                 } else {
                     s = s & toXML(arguments.input[i], i);
                 }
             }
         } else {
             s = s & XMLformat(arguments.input);
         }
         s = s & "</#lcase(arguments.element)#>";
     </cfscript>
     <cfreturn s />
 </cffunction>

---

