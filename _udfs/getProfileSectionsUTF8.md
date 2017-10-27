---
layout: udf
title:  getProfileSectionsUTF8
date:   2012-07-27T17:16:32.000Z
library: CFMLLib
argString: "iniPath"
author: Reinhard Jung
authorEmail: reinhard.jung@gmail.com
version: 1
cfVersion: CF9
shortDescription: UTF8-aware implementation of getProfileSections()
tagBased: false
description: |
 It supports to translate any unicode-based language instead of using GetProfileSections() which doesn't support Unicode (UTF-8). See http://help.adobe.com/en_US/ColdFusion/10.0/CFMLRef/WSc3ff6d0ea77859461172e0811cbec22c24-6cff.html

returnValue: Struct keyed by profile section, the values being comma-delimited lists of section entries

example: |
 <cfdump var="#getProfileSectionsUTF8("/path/to/my.ini")#">

args:
 - name: iniPath
   desc: Full path to ini file to parse.
   req: true


javaDoc: |
 /**
  * UTF8-aware implementation of getProfileSections()
  * * version 0.1 by Reinhard Jung
  * * version 1.0 by Adam Cameron - convert into single UDF &amp; mirror usage of getProfileSections()
  * * version 1.1 by Adam Cameron (with help from Simon Baynes).  Removing debug code; correcting fileClose() behaviour
  * 
  * @param iniPath      Full path to ini file to parse. (Required)
  * @return Struct keyed by profile section, the values being comma-delimited lists of section entries 
  * @author Reinhard Jung (reinhard.jung@gmail.com) 
  * @version 1, July 27, 2012 
  */

code: |
 function getProfileSectionsUTF8(iniPath) {
     var iniFile            = "";
     var line            = "";
     var profileSections = structNew();
     var thisSection        = "";
 
     try {
         iniFile = fileOpen(iniPath, "read", "UTF-8");
         line    = "";
         
         while (!fileIsEOF(iniFile)) {
             line = FileReadLine(iniFile);
 
             findSection = reFind("^\s*\[([^\]]+)\]", line, 1, true);    // eg: [sectionName]
             if (arrayLen(findSection.pos) gt 1){    // we're in a section
                 thisSection = mid(line, findSection.pos[2], findSection.len[2]);
                 profileSections[thisSection] = "";
                 continue;
             }
 
             if (listLen(line, "=")){    // ie: not empty
                 profileSections[thisSection] = listAppend(profileSections[thisSection], listFirst(line, "="));
             }            
         }
     }
     finally {
         if (iniFile != ""){    // assuming it's not its default value, it's safe to assume it's a file handle
             fileClose(iniFile);
         }
     }
     return profileSections;
 }

oldId: 2087
---

