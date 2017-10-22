---
layout: udf
title:  FileDateLastAccessed
date:   2001-07-24T13:43:23.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the date/time a file was last accessed. (Windows only)
tagBased: false
description: |
 Returns the date/time a file was last accessed. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a date/time object.

example: |
 <CFSET TheFile = "c:\winnt\notepad.exe">
 <CFOUTPUT>
 The #TheFile# file was last accessed on #DateFormat(FileDateLastAccessed(TheFile), 'mm/dd/yyyy')# at #TimeFormat(FileDateLastAccessed(TheFile), 'HH:MM:SS')#.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified file.
   req: true


javaDoc: |
 /**
  * Returns the date/time a file was last accessed. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified file. 
  * @return Returns a date/time object. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 24, 2001 
  */

code: |
 function FileDateLastAccessed(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var theFile = fso.GetFile(path);
   Return theFile.DateLastAccessed;
 }

---

