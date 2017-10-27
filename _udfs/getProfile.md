---
layout: udf
title:  getProfile
date:   2005-10-23T13:53:03.000Z
library: UtilityLib
argString: "iniFile"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF5
shortDescription: Gets all initialization file entries.
tagBased: false
description: |
 Returns a struct of structs. Each initialization file section name is the key of the first struct. Each entry is a name-value pair struct in its own section.

returnValue: Returns a structure.

example: |
 <cfdump var="#getProfile('C:\WINDOWS\win.ini')#">

args:
 - name: iniFile
   desc: Full path to ini file to read.
   req: true


javaDoc: |
 /**
  * Gets all initialization file entries.
  * 
  * @param iniFile      Full path to ini file to read. (Required)
  * @return Returns a structure. 
  * @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  * @version 1, October 23, 2005 
  */

code: |
 function getProfile(iniFile) {
     var sections = getProfileSections(iniFile);
     var sectionName = "";
     var retProfile = structNew();
     var i = "";
     var entry = "";
     
     for (sectionName in sections) {
         retProfile[sectionName] = structNew();
         for (i=1;i LTE listLen(sections[sectionName]);i=i+1) {
             entry = listGetAt(sections[sectionName],i);
             retProfile[sectionName][entry]=getProfileString(iniFile,sectionName,entry);
         }
     }
     return retProfile;        
 }

oldId: 1330
---

