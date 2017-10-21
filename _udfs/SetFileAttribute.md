---
layout: udf
title:  SetFileAttribute
date:   2001-09-27T15:56:46.000Z
library: FileSysLib
argString: "sFilePath, sAttribute, bOnOff"
author: Nate Weiss
authorEmail: nate@nateweiss.com
version: 1
cfVersion: CF5
shortDescription: Function to set or clear a Windows file attribute (ReadOnly, Hidden, etc) for the specified file.
description: |
 Function to set or clear a Windows file attribute (ReadOnly, Hidden, etc) for the specified file.  This is essentially just a wrapper around the Scripting.FileSystemObject's File.Attribute property.  It will work only on Windows systems.

returnValue: Returns a Boolean value indicating whether the attribute was set.

example: |
 <CFSET x = SetFileAttribute("c:\winnt\notepad.exe", "Archive", "No")>
 
 <CFOUTPUT>
 Was the attribute set? #YesNoFormat(x)#
 </CFOUTPUT>

args:
 - name: sFilePath
   desc: Absolute or relative path to the specified file.
   req: true
 - name: sAttribute
   desc: Attribute you wish to set.  Options are&#58; ReadOnly, Hidden, System, Archive.
   req: true
 - name: bOnOff
   desc: Boolean value indicating whether the attribute should be on (Yes) or off (No).
   req: true


javaDoc: |
 /**
  * Function to set or clear a Windows file attribute (ReadOnly, Hidden, etc) for the specified file.
  * Uses COM. This is a Windows only funciton. Requires CFOBJECT be enabled in the CF Administrator.
  * 
  * @param sFilePath      Absolute or relative path to the specified file. 
  * @param sAttribute      Attribute you wish to set.  Options are: ReadOnly, Hidden, System, Archive. 
  * @param bOnOff      Boolean value indicating whether the attribute should be on (Yes) or off (No). 
  * @return Returns a Boolean value indicating whether the attribute was set. 
  * @author Nate Weiss (nate@nateweiss.com) 
  * @version 1, September 27, 2001 
  */

code: |
 function SetFileAttribute(sFilePath, sAttribute, bOnOff) {
    var result = False;
    var fso = 0;
    var f = 0;
    var iListPosition = 0;
    var iFlagPosition = 0;
    
    if ( FileExists(sFilePath) ) {
      fso = CreateObject("COM", "Scripting.FileSystemObject");
      f = fso.GetFile(sFilePath);
      iListPosition = ListFindNoCase("ReadOnly,Hidden,System,Archive", sAttribute);
      
      if (iListPosition GT 0) {
        iFlagPosition = ListGetAt("0,1,2,5", iListPosition);
        f.attributes = BitMaskSet(f.attributes, IIF(bOnOff, 1, 0), iFlagPosition, 1);
        result = True;
      }
    }
   
    return result;
  }

---

