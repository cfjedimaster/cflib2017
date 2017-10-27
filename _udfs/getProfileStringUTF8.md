---
layout: udf
title:  getProfileStringUTF8
date:   2012-07-24T23:18:14.000Z
library: CFMLLib
argString: "iniPath[, section][, entry]"
author: Pyae Phyoe Shein
authorEmail: pyaephyoeshein@gmail.com
version: 1
cfVersion: CF9
shortDescription: Unicode language translator ((UTF-8))
tagBased: false
description: |
 It supports to translate any unicode-based language instead of using GetProfileString which doesn't support Unicode (UTF-8).
 
 See http://help.adobe.com/en_US/ColdFusion/10.0/CFMLRef/WSc3ff6d0ea77859461172e0811cbec22c24-7c62.html

returnValue: Returns the value of the entry if found, otherwise an empty string

example: |
 <cfoutput>#getProfileStringUTF8("/path/to/my.ini", "section", "key")#</cfoutput>

args:
 - name: iniPath
   desc: Full path to ini file to parse.
   req: true
 - name: section
   desc: Section of the ini file to parse.
   req: false
 - name: entry
   desc: Entry within that section to return value of.
   req: false


javaDoc: |
 /**
  * Unicode language translator ((UTF-8))
  * version 0.1 by Pyae Phyoe Shein
  * version 1.0 by Adam Cameron - code tidy &amp; return a value rather than output it.  Added support for sections, as per getProfileString(). Make function usage analogous to getProfileString()
  * 
  * @param iniPath      Full path to ini file to parse. (Required)
  * @param section      Section of the ini file to parse. (Optional)
  * @param entry      Entry within that section to return value of. (Optional)
  * @return Returns the value of the entry if found, otherwise an empty string 
  * @author Pyae Phyoe Shein (pyaephyoeshein@gmail.com) 
  * @version 1.0, July 24, 2012 
  */

code: |
 function getProfileStringUTF8(iniPath, section, entry) {
     var iniFile        = "";
     var line        = "";
     var inSection    = false;
 
     section        = "[#section#]";
     
     try {
         iniFile = fileOpen(iniPath, "read", "UTF-8");
         line    = "";
         
         // scan the file for the section
         while (!fileIsEOF(iniFile)) {
             line = FileReadLine(iniFile);
 
             // keep track if we've found the correct section
             if (line == section){
                 inSection = true;
                 continue;
             }
             
             // if we're in the correct section and we find a match, we're done: return its value
             if (inSection && listFirst(line, "=") == entry){
                 return listRest(line, "=");
             }
             
             // if we get to another section, then we didn't find the match: exit
             if (inSection && reFind("^\s*\[[^\]]+\]", line)){
                 return "";
             }
         }
     }
     catch (any e){
         rethrow;
     }
     finally {
         fileClose(iniFile);
     }
     // we got to the end of the file and didn't find it
     return "";
 }

oldId: 2072
---

