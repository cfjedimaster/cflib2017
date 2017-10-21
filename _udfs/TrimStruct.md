---
layout: udf
title:  TrimStruct
date:   2002-07-11T15:57:07.000Z
library: DataManipulationLib
argString: "st[, excludeList]"
author: Mike Gillespie
authorEmail: mike@striking.com
version: 3
cfVersion: CF5
shortDescription: Trims spaces from all keys in a structure.
description: |
 Allows for trimming of all fields in a structure. Useful for automatically trimming the Form scope for example.

returnValue: Returns a structure.

example: |
 <cfscript>
 st = structNew();
 st.apple = "  Ray  ";
 st.banana = "Camden";
 st.leaveme = "           Foo ";
 </cfscript>
 <!--- use pass by rev --->
 <cfset trimStruct(st,"leaveme")>
 <cfoutput>
 <pre>
 <cfloop item="key" collection="#st#">
 st.#key# = #st[key]#
 </cfloop>
 </pre>
 </cfoutput>

args:
 - name: st
   desc: Structure to trim.
   req: true
 - name: excludeList
   desc: List of keys to exclude.
   req: false


javaDoc: |
 /**
  * Trims spaces from all keys in a structure.
  * Version 2 by Raymond Camden
  * Version 3 by author - he mentioned the need for isSimpleValue
  * 
  * @param st      Structure to trim. (Required)
  * @param excludeList      List of keys to exclude. (Optional)
  * @return Returns a structure. 
  * @author Mike Gillespie (mike@striking.com) 
  * @version 3, July 11, 2002 
  */

code: |
 function TrimStruct(st) {
     var excludeList = "";
     var key = "";
 
     if(arrayLen(arguments) gte 2) excludeList = arguments[2];
     for(key in st) {
         if(not listFindNoCase(excludeList,key) and isSimpleValue(st[key])) st[key] = trim(st[key]);
     }
     return st;
 }

---

