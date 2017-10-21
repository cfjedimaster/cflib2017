---
layout: udf
title:  SetReadOnly
date:   2001-09-27T15:56:51.000Z
library: FileSysLib
argString: "sFilePath, bReadOnly"
author: Nate Weiss
authorEmail: nate@nateweiss.com
version: 1
cfVersion: CF5
shortDescription: Convenience function to set/clear the ReadOnly attribute for the specified file.
description: |
 Convenience function to set/clear the ReadOnly attribute for the specified file.

returnValue: Returns a Boolean value indicating whether the attribute was set.

example: |
 <CFSET x = SetReadOnly("c:\myfile.txt", "Yes")>
 
 <CFOUTPUT>
 Was the attribute set? #YesNoFormat(x)#
 </CFOUTPUT>

args:
 - name: sFilePath
   desc: Absolute or relative path to the specified file.
   req: true
 - name: bReadOnly
   desc: Boolean value indicating whether the attribute should be read only (Yes) or  (No).
   req: true


javaDoc: |
 /**
  * Convenience function to set/clear the ReadOnly attribute for the specified file.
  * Uses COM. This is a Windows only funciton. Requires CFOBJECT be enabled in the CF Administrator. This function depends on the SetFileAttribute() function in this library. See the SetFileAttribute() function for details.
  * 
  * @param sFilePath      Absolute or relative path to the specified file. 
  * @param bReadOnly      Boolean value indicating whether the attribute should be read only (Yes) or  (No). 
  * @return Returns a Boolean value indicating whether the attribute was set. 
  * @author Nate Weiss (nate@nateweiss.com) 
  * @version 1, September 27, 2001 
  */

code: |
 function SetReadOnly(sFilePath, bReadOnly) {
    return setFileAttribute(sFilePath, "ReadOnly", bReadOnly);
  };

---

