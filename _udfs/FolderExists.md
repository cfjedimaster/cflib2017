---
layout: udf
title:  FolderExists
date:   2001-07-19T18:14:24.000Z
library: FileSysLib
argString: "folder"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the specified folder (directory) exists on the ColdFusion server. (Windows only)
description: |
 Returns True if the specified folder (directory) exists.  This is similar to the native CF function DirectoryExists() except that it can accept an absolute or relative path to the directory you want to test.
 
 Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a Boolean value.

example: |
 <CFOUTPUT>
 Does \temp exist? #YesNoFormat(FolderExists("\temp"))#
 </CFOUTPUT>

args:
 - name: folder
   desc: Complete path (absolute or relative) to the folder whose existence you want to test. 
   req: true


javaDoc: |
 /**
  * Returns True if the specified folder (directory) exists on the ColdFusion server. (Windows only)
  * 
  * @param folder      Complete path (absolute or relative) to the folder whose existence you want to test.  
  * @return Returns a Boolean value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 19, 2001 
  */

code: |
 function FolderExists(folder)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   if (fso.FolderExists(folder)){
     Return True;
   }
   else {
     Return False;
   }
 }

---

