---
layout: udf
title:  parseINI
date:   2011-04-15T04:12:09.000Z
library: CFMLLib
argString: "codefile"
author: Dave Long
authorEmail: dave@davejlong.com
version: 1
cfVersion: CF8
shortDescription: Parses an INI file into a structure.
tagBased: false
description: |
 parseINI parses an INI file into a structure that contains sections and keys as structures.

returnValue: Returns a struct.

example: |
 <cfscript>
      inifile = 'C:/myboot.ini';
      inistruct = parseINI(inifile);
      writeDump(inistruct);
 </cfscript>

args:
 - name: codefile
   desc: FIle to read.
   req: true


javaDoc: |
 /**
  * Parses an INI file into a structure.
  * 
  * @param codefile      FIle to read. (Required)
  * @return Returns a struct. 
  * @author Dave Long (dave@davejlong.com) 
  * @version 1, April 14, 2011 
  */

code: |
 function parseINI(string codefile) {
     var i = '';
     var codes = structNew();
     local.sections = getProfileSections(arguments.codefile);
     for(local.section IN local.sections){
         codes[local.section] = structNew();
         local.keys = local.sections[local.section];
         for(i=1;i LTE listLen(local.keys);i++){
             codes[local.section][listGetAt(local.keys,i)] = getProfileString(arguments.codefile,local.section,listGetAt(local.keys,i));
         }            
     }
     
     return codes;
 }

---

