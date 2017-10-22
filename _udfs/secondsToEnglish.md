---
layout: udf
title:  secondsToEnglish
date:   2005-01-21T14:01:47.000Z
library: DateLib
argString: "iSeconds"
author: Peter Crowley
authorEmail: pcrowley@webzone.ie
version: 1
cfVersion: CF5
shortDescription: Converts seconds to nearest time unit in english.
tagBased: false
description: |
 Converts seconds to nearest time unit in english rounding down.

returnValue: Returns a string.

example: |
 <cfoutput>
 SecondsToEnglish(1) returns #SecondsToEnglish(1)#<br>
 SecondsToEnglish(59) returns #SecondsToEnglish(59)#<br>
 SecondsToEnglish(119) returns #SecondsToEnglish(119)#<br>
 SecondsToEnglish(600) returns #SecondsToEnglish(600)#<br>
 SecondsToEnglish(3600) returns #SecondsToEnglish(3600)#<br>
 SecondsToEnglish(86400) returns #SecondsToEnglish(86400)#<br>
 </cfoutput>

args:
 - name: iSeconds
   desc: Number of seconds.
   req: true


javaDoc: |
 /**
  * Converts seconds to nearest time unit in english.
  * 
  * @param iSeconds      Number of seconds. (Required)
  * @return Returns a string. 
  * @author Peter Crowley (pcrowley@webzone.ie) 
  * @version 1, January 21, 2005 
  */

code: |
 function secondsToEnglish(iSeconds) {
     var szPlural = "";
     var iTime = "";
     var szUpdate = "";
     
     if (iSeconds LTE 0) iSeconds=1;
     iTime=iSeconds \ 86400;
     if (iTime GT 0) {
         if (iTime GT 1) szPlural = 's';
         szUpdate = "#iTime# day#szPlural#";  // Days
     } else {
         iTime=iSeconds \ 3600;
         if (iTime GT 0) {
             if (iTime GT 1) szPlural = 's';
             szUpdate = "#iTime# hour#szPlural#"; // Hours
         } else {
             iTime=iSeconds \ 60;
             if (iTime GT 0) {
                 if (iTime GT 1) szPlural = 's';
                 szUpdate = "#iTime# minute#szPlural#"; // Minutes
             } else {
                 iTime=iSeconds;
                 if (iTime NEQ 1) szPlural = 's';
                 szUpdate = "#iTime# second#szPlural#"; // Seconds
             }
         }
     }
     return szUpdate;
 }

---

