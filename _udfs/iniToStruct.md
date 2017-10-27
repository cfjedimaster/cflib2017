---
layout: udf
title:  iniToStruct
date:   2012-04-26T23:32:37.000Z
library: CFMLLib
argString: "iniFiles"
author: Dave Anderson
authorEmail: the.one.true.dave.anderson@gmail.com
version: 0
cfVersion: CF9
shortDescription: Converts ini file(s) to a struct.
tagBased: false
description: |
 This differs from another UDF on this site in two ways:
 1) will parse multiple .ini files
 2) will not replace an existing struct.  In other words, if app.ini has a [global] section and dev.ini does too, the result.global structure will not be wiped out, but rather will instead be augmented or have individual values overwritten

returnValue: Returns a struct.

example: |
 sample ini files:
 
 app.ini 
 --------
 [global]
 datasource=myDSN
 appName=Monkey
 
 dev.ini
 --------
 [global]
 datasource=myDSN
 appName=Chimp
 
 
 application.config = iniToStruct(["/app.ini","/dev.ini"]);
 
 result:
 application.config.global.datasource --> "myDSN"
 application.config.global.appName --> "Chimp"

args:
 - name: iniFiles
   desc: Array of ini files.
   req: true


javaDoc: |
 /**
  * Converts ini file(s) to a struct.
  * 
  * @param iniFiles      Array of ini files. (Required)
  * @return Returns a struct. 
  * @author Dave Anderson (the.one.true.dave.anderson@gmail.com) 
  * @version 0, April 26, 2012 
  */

code: |
 public struct function iniToStruct(array iniFiles) {
     var config = {};
     for (local.f IN iniFiles) {
         local.inifile = fileExists(f) ? f : expandPath(f);
         local.sections = getProfileSections(local.iniFile); 
         for (local.k IN sections) {
             for (local.v IN listToArray(sections[k])) {
                 config[k][v] = getProfileString(local.iniFile,k,v);
             }
         }
     }
     return config;
 }

oldId: 2200
---

