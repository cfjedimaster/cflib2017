---
layout: udf
title:  FileAppend
date:   2002-10-15T13:00:53.000Z
library: CFMLLib
argString: "file, output[, mode][, addNewLine][, attributes]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cffile, action=&quot;append&quot; command.
tagBased: true
description: |
 Mimics the cffile, action=&quot;append&quot; command.

returnValue: Does not return a value.

example: |
 <cfscript>
 //fileAppend("c:\neotestingzone\udf\cfml\foo.txt","Ray was here","","Yes");
 </cfscript>

args:
 - name: file
   desc: The file to append.
   req: true
 - name: output
   desc: The data to append.
   req: true
 - name: mode
   desc: Defines permissions for a file on non-Windows systems.
   req: false
 - name: addNewLine
   desc: If true, a new line character is added to output.
   req: false
 - name: attributes
   desc: File attributes.
   req: false


javaDoc: |
 <!---
  Mimics the cffile, action=&quot;append&quot; command.
  
  @param file      The file to append. (Required)
  @param output      The data to append. (Required)
  @param mode      Defines permissions for a file on non-Windows systems. (Optional)
  @param addNewLine      If true, a new line character is added to output. (Optional)
  @param attributes      File attributes. (Optional)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="fileAppend" output="false" returnType="void">
     <cfargument name="file" type="string" required="true">
     <cfargument name="output" type="string" required="true">
     <cfargument name="mode" type="string" default="" required="false">
     <cfargument name="addNewLine" type="boolean" default="yes" required="false">
     <cfargument name="attributes" type="string" default="" required="false">
     <cfif mode is "">
         <cffile action="append" file="#file#" output="#output#" addNewLine="#addNewLine#" attributes="#attributes#">    
     <cfelse>
         <cffile action="append" file="#file#" output="#output#" mode="#mode#" addNewLine="#addNewLine#" attributes="#attributes#">    
     </cfif>
 </cffunction>

oldId: 623
---

