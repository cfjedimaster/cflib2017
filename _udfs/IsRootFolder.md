---
layout: udf
title:  IsRootFolder
date:   2001-07-23T12:37:00.000Z
library: FileSysLib
argString: "path"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the specified folder is the root folder. (Windows only)
description: |
 Returns True if the specified folder is the root folder.  Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a Boolean value.

example: |
 <CFSET TheFolder = "c:\">
 <CFOUTPUT>
 Is the #TheFolder# folder the root folder? #YesNoFormat(IsRootFolder(TheFolder))#
 </CFOUTPUT>

args:
 - name: path
   desc: Absolute or relative path to the specified folder.
   req: true


javaDoc: |
 /**
  * Returns True if the specified folder is the root folder. (Windows only)
  * 
  * @param path      Absolute or relative path to the specified folder. 
  * @return Returns a Boolean value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 23, 2001 
  */

code: |
 function IsRootFolder(path)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var folder = fso.Getfolder(path);
   Return folder.IsRootFolder;
 }

---

