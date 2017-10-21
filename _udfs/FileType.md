---
layout: udf
title:  FileType
date:   2001-07-24T15:43:54.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns a string corresponding to the type of file specified. (Windows only)
description: |
 Returns a string corresponding to the type of file specified.  Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a string.

example: |
 <CFSET TheFile = "c:\winnt\notepad.exe">
 <CFOUTPUT>
 The file #TheFile# is a(n) <I>#FileType(TheFile)#</I>.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified file.
   req: true


javaDoc: |
 /**
  * Returns a string corresponding to the type of file specified. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified file. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 24, 2001 
  */

code: |
 function FileType(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var theFile = fso.GetFile(path);
   Return theFile.Type;
 }

---

