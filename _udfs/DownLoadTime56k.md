---
layout: udf
title:  DownLoadTime56k
date:   2002-11-01T20:10:07.000Z
library: UtilityLib
argString: "fileSize"
author: William Steiner
authorEmail: williams@hkusa.com
version: 1
cfVersion: CF5
shortDescription: Returns estimated download time for a 56k modem given the file size.
tagBased: false
description: |
 Returns estimated download time for a 56k modem given the file size. Returns a string in the format of &quot;xx hours xx minutes xx seconds&quot;.  File size should be in bytes.

returnValue: Returns a string.

example: |
 <CFSET FileSizeExample = 260991> <!--- 255k --->
 
 <cfoutput>
 Estimated Download Time for 56k: #DownLoadTime56k(FileSizeExample)#
 </cfoutput>

args:
 - name: fileSize
   desc: File size in bytes.
   req: true


javaDoc: |
 /**
  * Returns estimated download time for a 56k modem given the file size.
  * 
  * @param fileSize      File size in bytes. (Required)
  * @return Returns a string. 
  * @author William Steiner (williams@hkusa.com) 
  * @version 1, November 1, 2002 
  */

code: |
 function DownLoadTime56k(fileSize) {
     var totalSeconds = (fileSize * 10) / 57600;
     var tempstring = "";
     var tempstring2 = "";
     var hours = totalSeconds / 3600;
     var minutes = totalSeconds / 60;
     var seconds = totalSeconds MOD 60;
     var hourText = "";
     var minuteText = "";
 
     // if over 60 minutes...get just minutes left from hours
     if (minutes gte 60) minutes = minutes MOD 60;
     
     if (hours gte 1) {
         if (hours gt 2) hourText = " hours ";
         else hourText = " hour ";
         tempstring = Fix(hours) & hourText;
     }
 
     if (minutes gte 1) {
         if (minutes gt 2) minuteText = " minutes ";
         else minuteText = " minute ";
         tempstring = tempstring & Fix(minutes) & minuteText;
     }
     
     if (seconds gt 0) tempstring = tempstring & seconds & " seconds";
 
     return tempstring ;
 }

oldId: 776
---

