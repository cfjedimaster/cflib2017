---
layout: udf
title:  FolderDateLastModified
date:   2001-12-20T12:55:16.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the date/time a folder (directory) was last modified. (Windows only)
description: |
 Returns the date/time a folder (directory) was last modified. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a date/time object.

example: |
 <CFSET TheFolder = "c:\winnt">
 <CFOUTPUT>
 The #TheFolder# folder was last modified on #DateFormat(FolderDateLastModified(TheFolder), 'mm/dd/yyyy')# at #TimeFormat(FolderDateLastModified(TheFolder), 'HH:MM:SS')#.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified folder.
   req: true


javaDoc: |
 /**
  * Returns the date/time a folder (directory) was last modified. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified folder. 
  * @return Returns a date/time object. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, December 20, 2001 
  */

code: |
 function FolderDateLastModified(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var folder = fso.GetFolder(path);
   Return folder.DateLastModified;
 }

---

