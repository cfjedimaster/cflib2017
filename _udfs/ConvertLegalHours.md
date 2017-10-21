---
layout: udf
title:  ConvertLegalHours
date:   2002-07-03T16:52:11.000Z
library: DateLib
argString: "hourString"
author: Joe
authorEmail: jcraven@akingump.com
version: 1
cfVersion: CF5
shortDescription: Function that returns legal billing time from standard time format.
description: |
 Converts h:mm:ss or h:mm strings to hours rounded to tenths, used in my case for legal time billing.

returnValue: Returns a string.

example: |
 <cfset HoursInTenths = ConvertHours("6:33:06")>
 <cfoutput>#Variables.HoursInTenths#</cfoutput>

args:
 - name: hourString
   desc: A string containing the number of hours, minutes, and seconds in the format&#58; H&#58;MM&#58;SS.
   req: true


javaDoc: |
 /**
  * Function that returns legal billing time from standard time format.
  * 
  * @param hourString      A string containing the number of hours, minutes, and seconds in the format: H:MM:SS. (Required)
  * @return Returns a string. 
  * @author Joe (jcraven@akingump.com) 
  * @version 1, July 3, 2002 
  */

code: |
 function ConvertHours(HourString) {
     var HourWords = "";
     var MinuteVal = Round(val(listGetAt(HourString,2,":"))/6);
     var HourVal = listFirst(hourString,":");
     
     if(len(HourVal) is 1) {
         if(HourVal is "0") HourWords = '0.';
         else HourWords = HourVal & '.';
     } else HourWords = HourVal & '.';
     
     HourWords = HourWords & MinuteVal;
     return HourWords;
 }

---

