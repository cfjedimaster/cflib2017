---
layout: udf
title:  DriveExists
date:   2001-07-19T16:29:00.000Z
library: FileSysLib
argString: "drive"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the specified drive exists on the ColdFusion server. (Windows only)
tagBased: false
description: |
 Returns True if the specified drive exists on the ColdFusion server.  Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a Boolean value.

example: |
 <CFOUTPUT>
 Is there a "C" drive on this server? #YesNoFormat(DriveExists("C"))#
 </CFOUTPUT>

args:
 - name: drive
   desc: A drive letter or a complete path.
   req: true


javaDoc: |
 /**
  * Returns True if the specified drive exists on the ColdFusion server. (Windows only)
  * 
  * @param drive      A drive letter or a complete path. 
  * @return Returns a Boolean value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 19, 2001 
  */

code: |
 function DriveExists(drive)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   if (fso.DriveExists(drive)){
     Return True;
   }
   else {
     Return False;
   }
 }

---

