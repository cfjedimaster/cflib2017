---
layout: udf
title:  DrivePath
date:   2001-07-19T17:49:44.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the path for the specified drive. (Windows only)
description: |
 Returns the path for the specified drive. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a string.

example: |
 <CFSET TheDrive = "c">
 <CFOUTPUT>
 The path for the #TheDrive# drive is #DrivePath(TheDrive)#
 </CFOUTPUT>

args:
 - name: drvPath
   desc: Drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns the path for the specified drive. (Windows only)
  * 
  * @param drvPath      Drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 19, 2001 
  */

code: |
 function DrivePath(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   Return drive.Path;
 }

---

