---
layout: udf
title:  FileDelete
date:   2002-10-15T13:01:25.000Z
library: CFMLLib
argString: "file"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cffile, action=&quot;delete&quot; command.
tagBased: true
description: |
 Mimics the cffile, action=&quot;delete&quot; command.

returnValue: Does not return a value.

example: |
 <cfscript>
 //fileDelete("c:\neotestingzone\udf\cfml\val.cfm");
 </cfscript>

args:
 - name: file
   desc: The file to delete.
   req: true


javaDoc: |
 <!---
  Mimics the cffile, action=&quot;delete&quot; command.
  
  @param file      The file to delete. (Required)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="fileDelete" output="false" returnType="void">
     <cfargument name="file" type="string" required="true">
     <cffile action="delete" file="#file#">    
 </cffunction>

oldId: 621
---

