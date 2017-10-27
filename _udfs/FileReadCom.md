---
layout: udf
title:  FileReadCom
date:   2002-10-10T11:52:19.000Z
library: FileSysLib
argString: "sPath"
author: Jeff Mathiot
authorEmail: brucewillisisnotdead@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Reads a text file, and returns content as a string.
tagBased: false
description: |
 Reads a text file, and returns content as a string. This UDF use VBScript File System Object (IIS Only).

returnValue: Returns a string.

example: |
 <!--- non live example --->
 #ReadFileCom("c:\hello.htm")#

args:
 - name: sPath
   desc: Path to file.
   req: true


javaDoc: |
 /**
  * Reads a text file, and returns content as a string.
  * 
  * @param sPath      Path to file. (Required)
  * @return Returns a string. 
  * @author Jeff Mathiot (brucewillisisnotdead@hotmail.com) 
  * @version 1, October 10, 2002 
  */

code: |
 function ReadFileCom(sPath){
     var fileContent="";
     var oFSO=CreateObject("COM", "Scripting.FileSystemObject");
     var oFile=oFSO.OpenTextFile(sPath, 1, 0, 0);
 
     fileContent=oFile.ReadAll();
     oFile.Close();
 
     return fileContent;
 }

oldId: 755
---

