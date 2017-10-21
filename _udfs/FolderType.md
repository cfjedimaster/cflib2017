---
layout: udf
title:  FolderType
date:   2001-07-24T15:42:20.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns a string corresponding to the type of folder specified. (Windows only)
description: |
 Returns a string corresponding to the type of folder specified.  Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a string.

example: |
 <CFSET TheFolder = "c:\winnt">
 <CFOUTPUT>
 The folder #TheFolder# is a <I>#FolderType(TheFolder)#</I>.
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified folder.
   req: true


javaDoc: |
 /**
  * Returns a string corresponding to the type of folder specified. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified folder. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 24, 2001 
  */

code: |
 function FolderType(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var folder = fso.Getfolder(path);
   Return folder.Type;
 }

---

