---
layout: udf
title:  FileDateCreated
date:   2001-07-24T13:36:16.000Z
library: FileSysLib
argString: "file"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the date/time a file was created. (Windows only)
description: |
 Returns the date/time a file was created. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a date/time object.

example: |
 <CFSET TheFile = "c:\winnt\notepad.exe">
 <CFOUTPUT>
 The #TheFile# file was created on #DateFormat(FileDateCreated(TheFile), 'mm/dd/yyyy')# at #TimeFormat(FileDateCreated(TheFile), 'HH:MM:SS')#.
 </CFOUTPUT>

args:
 - name: file
   desc: Absolute or relative path to the specified file.
   req: true


javaDoc: |
 /**
  * Returns the date/time a file was created. (Windows only)
  * 
  * @param file      Absolute or relative path to the specified file. 
  * @return Returns a date/time object. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 24, 2001 
  */

code: |
 function FileDateCreated(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var theFile = fso.Getfile(path);
   Return theFile.DateCreated;
 }

---

