---
layout: udf
title:  WDDXFileWrite
date:   2002-10-15T13:17:15.000Z
library: CFMLLib
argString: "file, var"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 2
cfVersion: CF6
shortDescription: Write a flat file containing a WDDX packet of any CF variable
description: |
 Ever get annoyed at the couple of lines you are always writing to store and retrieve WDDX in flat files?  Then this is the UDF for you.  Also see it's sister UDF WDDXFileRead().

returnValue: Does not return a value.

example: |
 <cfscript>
     hello = structNew();
     hello.foo.bar = 2;
     hello.thing = "a string";
 //    wddxfileWrite(expandPath("test.wddx"),hello);
 //    stuff = WDDXFileRead(expandPath("test.wddx"));
 </cfscript>
 <!---
 <cfdump var="#stuff#">
 --->

args:
 - name: file
   desc: The file to write to.
   req: true
 - name: var
   desc: The value to serialize.
   req: true


javaDoc: |
 <!---
  Write a flat file containing a WDDX packet of any CF variable
  Updated for CFMX var scope syntax.
  
  @param file      The file to write to. (Required)
  @param var      The value to serialize. (Required)
  @return Does not return a value. 
  @author Nathan Dintenfass (nathan@changemedia.com) 
  @version 2, October 15, 2002 
 --->

code: |
 <cffunction name="WDDXFileWrite" output="no" returnType="void">
     <cfargument name="file" required="yes">
     <cfargument name="var" required="yes">
     
     <cfset var tempPacket = "">
     
     <!--- serialize --->
     <cfwddx action="cfml2wddx" input="#var#" output="tempPacket">
     <!--- write the file --->
     <cffile action="write" file="#file#" output="#tempPacket#">
 </cffunction>

---

