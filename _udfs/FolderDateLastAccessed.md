---
layout: udf
title:  FolderDateLastAccessed
date:   2001-07-20T16:18:51.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the date/time a folder (directory) was last accessed. (Windows only)
tagBased: false
description: |
 Returns the date/time a folder (directory) was last accessed. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a date/time object.

example: |
 <CFSET TheFolder = "c:\winnt">
 <CFOUTPUT>
 The #TheFolder# folder was last accessed on #DateFormat(FolderDateLastAccessed(TheFolder), 'mm/dd/yyyy')# at #TimeFormat(FolderDateLastAccessed(TheFolder), 'HH:MM:SS')#.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified folder.
   req: true


javaDoc: |
 /**
  * Returns the date/time a folder (directory) was last accessed. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified folder. 
  * @return Returns a date/time object. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 20, 2001 
  */

code: |
 function FolderDateLastAccessed(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var folder = fso.GetFolder(path);
   Return folder.DateLastAccessed;
 }

---

