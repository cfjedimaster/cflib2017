---
layout: udf
title:  DirectoryCreate
date:   2002-10-15T12:35:36.000Z
library: CFMLLib
argString: "directory[, mode]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cfdirectory, action=&quot;create&quot; command.
tagBased: true
description: |
 Mimics the cfdirectory, action=&quot;create&quot; command.

returnValue: Does not return a value.

example: |
 <cfscript>
 //directoryCreate("c:\neotestingzone\madedir");
 </cfscript>

args:
 - name: directory
   desc: Name of directory to create.
   req: true
 - name: mode
   desc: Mode to apply to directory.
   req: false


javaDoc: |
 <!---
  Mimics the cfdirectory, action=&quot;create&quot; command.
  
  @param directory      Name of directory to create. (Required)
  @param mode      Mode to apply to directory. (Optional)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="directoryCreate" output="false" returnType="void">
     <cfargument name="directory" type="string" required="true">
     <cfargument name="mode" type="string" required="false" default="">
     <cfif len(mode)>
         <cfdirectory action="create" directory="#directory#" mode="#mode#">
     <cfelse>
         <cfdirectory action="create" directory="#directory#">
     </cfif>
 </cffunction>

---

