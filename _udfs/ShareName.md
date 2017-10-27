---
layout: udf
title:  ShareName
date:   2001-07-19T18:07:18.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the network share name for the specified drive. (Windows only)
tagBased: false
description: |
 Returns the network share name for the specified drive. If the specified drive is not a network share, returns a blank string.  Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a string.

example: |
 <CFSET TheDrive = "c">
 
 <CFOUTPUT>
 <CFIF ShareName(TheDrive) IS "">
 The #TheDrive# drive is not a network share.
 <CFELSE>
 The share name for the #TheDrive# drive is #ShareName(TheDrive)#
 </CFIF>
 </CFOUTPUT>

args:
 - name: drvPath
   desc: Drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns the network share name for the specified drive. (Windows only)
  * 
  * @param drvPath      Drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 19, 2001 
  */

code: |
 function ShareName(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   Return drive.ShareName;
 }

oldId: 109
---

