---
layout: udf
title:  FileDateLastModified
date:   2001-07-24T13:49:10.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the date/time a file was last modified. (Windows only)
tagBased: false
description: |
 Returns the date/time a file was last modified. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a date/time object.

example: |
 <CFSET TheFile = "c:\winnt\notepad.exe">
 <CFOUTPUT>
 The #TheFile# file was last modified on #DateFormat(FileDateLastModified(TheFile), 'mm/dd/yyyy')# at #TimeFormat(FileDateLastModified(TheFile), 'HH:MM:SS')#.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified folder.
   req: true


javaDoc: |
 /**
  * Returns the date/time a file was last modified. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified folder. 
  * @return Returns a date/time object. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 24, 2001 
  */

code: |
 function FileDateLastModified(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var theFile = fso.GetFile(path);
   Return theFile.DateLastModified;
 }

oldId: 126
---

