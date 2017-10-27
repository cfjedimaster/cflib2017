---
layout: udf
title:  FreeSpace
date:   2001-07-19T18:15:18.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the amount of free space (in bytes) available to the ColdFusion server for a specified drive or network share. (Windows only)
tagBased: false
description: |
 Returns the amount of free space (in bytes) available to the ColdFusion server for a specified drive or network share. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a simple value.

example: |
 <CFOUTPUT>
 Free space available on C: #FreeSpace("c:")# bytes
 </CFOUTPUT>

args:
 - name: drvPath
   desc: Drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns the amount of free space (in bytes) available to the ColdFusion server for a specified drive or network share. (Windows only)
  * 
  * @param drvPath      Drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 19, 2001 
  */

code: |
 function FreeSpace(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   Return drive.FreeSpace;
 }

oldId: 105
---

