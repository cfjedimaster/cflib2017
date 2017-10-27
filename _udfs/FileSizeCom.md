---
layout: udf
title:  FileSizeCom
date:   2003-02-20T13:17:18.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the size (in bytes) of the specified file. (Windows only)
tagBased: false
description: |
 Returns the size (in bytes) of the specified file. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a simple value.

example: |
 <CFSET TheFile = "c:\winnt\notepad.exe">
 <CFOUTPUT>
 The size of #TheFile# is #FileSizeCom(TheFile)# bytes.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified file.
   req: true


javaDoc: |
 /**
  * Returns the size (in bytes) of the specified file. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified file. (Required)
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, February 20, 2003 
  */

code: |
 function FileSizeCom(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var theFile = fso.GetFile(path);
   Return theFile.Size;
 }

oldId: 127
---

