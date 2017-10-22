---
layout: udf
title:  TotalSize
date:   2001-08-20T10:09:33.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the total size (in bytes) of a specified drive or network share. (Windows only)
tagBased: false
description: |
 Returns the total size (in bytes) of a specified drive or network share.  Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a simple value.

example: |
 <CFSET TheDrive ="c:\">
 <CFOUTPUT>
 The total size for the #TheDrive# drive is #TotalSize(TheDrive)# bytes.
 </CFOUTPUT>

args:
 - name: drvPath
   desc: Drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns the total size (in bytes) of a specified drive or network share. (Windows only)
  * 
  * @param drvPath      Drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, August 20, 2001 
  */

code: |
 function TotalSize(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   Return drive.TotalSize;
 }

---

