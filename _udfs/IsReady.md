---
layout: udf
title:  IsReady
date:   2001-07-19T18:16:10.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the specified drive is ready. (Windows only)
tagBased: false
description: |
 Returns True if the specified drive is ready. For removable media drives (CD-ROM, Zip, etc.), IsReady only returns True when media is present in the drive.  Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a Boolean value.

example: |
 <CFSET TheDrive = "c">
 <CFOUTPUT>
 Is the #TheDrive# drive ready? #YesNoFormat(IsReady(TheDrive))#
 </CFOUTPUT>

args:
 - name: drvPath
   desc: Drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns True if the specified drive is ready. (Windows only)
  * 
  * @param drvPath      Drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a Boolean value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 19, 2001 
  */

code: |
 function IsReady(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   Return drive.IsReady;
 }

---

