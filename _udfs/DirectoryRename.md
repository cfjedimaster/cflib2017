---
layout: udf
title:  DirectoryRename
date:   2002-10-15T12:37:29.000Z
library: CFMLLib
argString: "directory, newDirectory"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cfdirectory, action=&quot;rename&quot; command.
description: |
 Mimics the cfdirectory, action=&quot;rename&quot; command.

returnValue: Does not return a value.

example: |
 <cfscript>
 //directoryRename("c:\goo","c\foo");
 </cfscript>

args:
 - name: directory
   desc: Directory to rename.
   req: true
 - name: newDirectory
   desc: New name for directory.
   req: true


javaDoc: |
 <!---
  Mimics the cfdirectory, action=&quot;rename&quot; command.
  
  @param directory      Directory to rename. (Required)
  @param newDirectory      New name for directory. (Required)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="directoryRename" output="false" returnType="void">
     <cfargument name="directory" type="string" required="true">
     <cfargument name="newDirectory" type="string" required="true">
     <cfdirectory action="rename" directory="#directory#" newDirectory="#newDirectory#">
 </cffunction>

---

