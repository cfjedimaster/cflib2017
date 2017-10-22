---
layout: udf
title:  SetVolumeName
date:   2001-08-02T14:41:58.000Z
library: FileSysLib
argString: "drvPath, newName"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Sets the volume name for the specified drive. (Windows only)
tagBased: false
description: |
 Sets the volume name for the specified drive. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns True.

example: |
 Because this function modifies the volume name of an actual drive on the server, no live example is provided.  For example code, see the header comments in the library.

args:
 - name: drvPath
   desc: Drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true
 - name: newName
   desc: New volume name for the drive.
   req: true


javaDoc: |
 /**
  * Sets the volume name for the specified drive. (Windows only)
  * Sample code: 
  * <CFSET SetVolumeName("c", "System")>
  * 
  * @param drvPath      Drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @param newName      New volume name for the drive. 
  * @return Returns True. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, August 2, 2001 
  */

code: |
 function SetVolumeName(drvPath, newName)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   drive.VolumeName = newName;
   Return True;
 }

---

