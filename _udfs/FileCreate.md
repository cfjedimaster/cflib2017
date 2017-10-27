---
layout: udf
title:  FileCreate
date:   2003-02-20T13:22:31.000Z
library: FileSysLib
argString: "filename[, force]"
author: Jesse Houwing
authorEmail: j.houwing@student.utwente.nl
version: 1
cfVersion: CF5
shortDescription: Create a new file.
tagBased: false
description: |
 This will create a new file, only if a file with the given name does not exist. Use force=true to overwrite a file that already exists

returnValue: Returns nothing.

example: |
 <!---
 <cfset filename="c:\autoexec.bat">
 <cfset FileCreate(filename, false)> <!--- probably won't work --->
 <cfset FileCreate(filename, true)> <!--- will truncate your autoexec.bat --->
 --->

args:
 - name: filename
   desc: Filename to create.
   req: true
 - name: force
   desc: Force creation (will nuke existing file). Defaults to false.
   req: false


javaDoc: |
 /**
  * Create a new file.
  * 
  * @param filename      Filename to create. (Required)
  * @param force      Force creation (will nuke existing file). Defaults to false. (Optional)
  * @return Returns nothing. 
  * @author Jesse Houwing (j.houwing@student.utwente.nl) 
  * @version 1, February 20, 2003 
  */

code: |
 function FileCreate(filename){
     var force = false;
     var daFile = createObject('java', 'java.io.File');
     
     if(arraylen(arguments) gte 2) force = arguments[2];
     daFile.init(JavaCast('string', filename));
     if(force) daFile.delete();
     daFile.createNewFile();
 }

oldId: 795
---

