---
layout: udf
title:  DriveType
date:   2001-07-19T17:14:10.000Z
library: FileSysLib
argString: "drvPath"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the drive type for a specified drive. (Windows only)
tagBased: false
description: |
 Returns the drive type for a specified drive. Possible types are Unknown, Removable, Fixed, Network, CD-ROM, and RAM Disk
 <P>
 Because this function uses COM, it is only supported in the Windows version of ColdFusion.

returnValue: Returns a simple value.

example: |
 <CFSET TheDrive = "c">
 <CFOUTPUT>
 Drive #TheDrive# - #DriveType(TheDrive)#
 </CFOUTPUT>

args:
 - name: drvPath
   desc: drive letter (c, c&#58;, c&#58;\) or network share (\\computer\share).
   req: true


javaDoc: |
 /**
  * Returns the drive type for a specified drive. (Windows only)
  * 
  * @param drvPath      drive letter (c, c:, c:\) or network share (\\computer\share). 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 19, 2001 
  */

code: |
 function DriveType(drvPath)
 {
   Var fso  = CreateObject("COM", "Scripting.FileSystemObject");
   Var drive = fso.GetDrive(drvPath);
   //evaluate the drive type
   switch(drive.DriveType){
     case 0: 
     {
       Return "Unknown";
       break;
     }
     case 1: 
     {
       Return "Removable";
       break;
     }    
     case 2: 
     {
       Return "Fixed";
       break;
     }
     case 3: 
     {
       Return "Network";
       break;
     }
     case 4: 
     {
       Return "CD-ROM";
       break;
     }
     case 5: 
     {
       Return "RAM Disk";
       break;
     }
   }
 }

---

