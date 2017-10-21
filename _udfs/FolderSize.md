---
layout: udf
title:  FolderSize
date:   2001-07-23T13:34:28.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the amount of space (in bytes) of all files and subfolders contained in the specified folder. (Windows only)
description: |
 Returns the amount of space (in bytes) of all files and subfolders contained in the specified folder. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a simple value.

example: |
 <CFSET TheFolder = "c:\winnt">
 <CFOUTPUT>
 The size of the #TheFolder# folder (including all files/subdirectories) is #FolderSize(TheFolder)# bytes.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified folder.
   req: true


javaDoc: |
 /**
  * Returns the amount of space (in bytes) of all files and subfolders contained in the specified folder. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified folder. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 23, 2001 
  */

code: |
 function FolderSize(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var folder = fso.Getfolder(path);
   Return folder.Size;
 }

---

