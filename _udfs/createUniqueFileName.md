---
layout: udf
title:  createUniqueFileName
date:   2008-07-02T01:57:23.000Z
library: FileSysLib
argString: "fullpath"
author: Marc Esher
authorEmail: marc.esher@cablespeed.com
version: 3
cfVersion: CF5
shortDescription: Creates a unique file name; used to prevent overwriting when moving or copying files from one location to another.
tagBased: false
description: |
 Pass a full file path to this function; if the file exists, the function will return a new, unique file name.

returnValue: Returns a string.

example: |
 <cfset newFile = CreateUniqueFileName(GetCurrentTemplatePath())>
 <cfoutput>Your New File Name: #newFile#</cfoutput>

args:
 - name: fullpath
   desc: Full path to file.
   req: true


javaDoc: |
 /**
  * Creates a unique file name; used to prevent overwriting when moving or copying files from one location to another.
  * v2, bug found with dots in path, bug found by joseph
  * v3 - missing dot in extension, bug found by cheesecow
  * 
  * @param fullpath      Full path to file. (Required)
  * @return Returns a string. 
  * @author Marc Esher (marc.esher@cablespeed.com) 
  * @version 3, July 1, 2008 
  */

code: |
 function createUniqueFileName(fullPath){
     var extension = "";
     var thePath = "";
     var newPath = arguments.fullPath;
     var counter = 0;
     
     if(listLen(arguments.fullPath,".") gte 2) extension = listLast(arguments.fullPath,".");
     thePath = listDeleteAt(arguments.fullPath,listLen(arguments.fullPath,"."),".");
 
     while(fileExists(newPath)){
         counter = counter+1;        
         newPath = thePath & "_" & counter & "." & extension;            
     }
     return newPath;    
 }

---

