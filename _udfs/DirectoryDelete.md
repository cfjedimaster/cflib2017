---
layout: udf
title:  DirectoryDelete
date:   2002-10-15T12:36:08.000Z
library: CFMLLib
argString: "directory"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cfdirectory tag, action=&quot;delete&quot; command.
description: |
 Mimics the cfdirectory tag, action=&quot;delete&quot; command.

returnValue: Does not return a value.

example: |
 <cfscript>
 //directoryDelete("c:\neotestingzone\madedir");
 </cfscript>

args:
 - name: directory
   desc: The directory to delete.
   req: true


javaDoc: |
 <!---
  Mimics the cfdirectory tag, action=&quot;delete&quot; command.
  
  @param directory      The directory to delete. (Required)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="directoryDelete" output="false" returnType="void">
     <cfargument name="directory" type="string" required="true">
     <cfdirectory action="delete" directory="#directory#">
 </cffunction>

---

