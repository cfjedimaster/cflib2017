---
layout: udf
title:  DriveLetter
date:   2001-07-19T18:12:01.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the drive letter of a physical drive or a network share. (Windows only)
description: |
 Returns the drive letter of a physical drive or a network share. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 Drive letter of C: #DriveLetter("c")#
 </CFOUTPUT>

args:
 - name: drvPath
   desc: drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns the drive letter of a physical drive or a network share. (Windows only)
  * 
  * @param drvPath      drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 19, 2001 
  */

code: |
 function DriveLetter(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   Return drive.DriveLetter;
 }

---

