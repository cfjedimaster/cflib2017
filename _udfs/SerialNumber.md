---
layout: udf
title:  SerialNumber
date:   2001-07-19T18:00:03.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the serial number for the specified drive. (Windows only)
tagBased: false
description: |
 Returns the serial number for the specified drive. Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a simple value.

example: |
 <CFSET TheDrive = "c">
 <CFOUTPUT>
 The serial number for the #TheDrive# drive is #SerialNumber(TheDrive)#
 </CFOUTPUT>

args:
 - name: drvPath
   desc: Drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns the serial number for the specified drive. (Windows only)
  * 
  * @param drvPath      Drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 19, 2001 
  */

code: |
 function SerialNumber(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   Return drive.SerialNumber;
 }

---

