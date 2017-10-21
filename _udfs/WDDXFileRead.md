---
layout: udf
title:  WDDXFileRead
date:   2002-10-15T13:17:32.000Z
library: CFMLLib
argString: "file"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 2
cfVersion: CF6
shortDescription: Reads a file containing WDDX and returns the CF variable.
description: |
 Ever get annoyed at the couple of lines you are always writing to store and retrieve WDDX in flat files?  Then this is the UDF for you.  Also see it's sister UDF WDDXFileWrite()

returnValue: Returns deserialized data.

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
   desc: File to read and deserialize.
   req: true


javaDoc: |
 <!---
  Reads a file containing WDDX and returns the CF variable.
  Updated for CFMX var scope syntax.
  
  @param file      File to read and deserialize. (Required)
  @return Returns deserialized data. 
  @author Nathan Dintenfass (nathan@changemedia.com) 
  @version 2, October 15, 2002 
 --->

code: |
 <cffunction name="WDDXFileRead" output="no">
     <cfargument name="file" required="yes">
     
     <cfset var tempPacket = "">
     <cfset var tempVar = "">
     
     <!--- make sure the file exists, otherwise, throw an error --->
     <cfif NOT fileExists(file)>
         <cfthrow message="WDDXFileRead() error: File Does Not Exist" detail="The file #file# called in WDDXFileRead() does not exist">
     </cfif>
     <!--- read the file --->
     <cffile action="read" file="#file#" variable="tempPacket">
     <!--- make sure it is a valid WDDX Packet --->
     <cfif NOT isWDDX(tempPacket)>
         <cfthrow message="WDDXFileRead() error: Bad Packet" detail="The file #file# called in WDDXFileRead() does not contain a valid WDDX packet">        
     </cfif>
     <!--- deserialize --->
     <cfwddx action="wddx2cfml" input="#tempPacket#" output="tempVar">
     <cfreturn tempVar>    
 </cffunction>

---

