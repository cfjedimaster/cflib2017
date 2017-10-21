---
layout: udf
title:  GetNearestHalfHour
date:   2003-03-10T20:14:40.000Z
library: DateLib
argString: "minutes"
author: Jason Smith
authorEmail: jason@inwebsys.net
version: 1
cfVersion: CF5
shortDescription: Returns the nearest half hour based on minutes of the hour supplied to the function.
description: |
 We needed a short bit of code to give the nearest half-hour based on 15 minute intervals. This does the trick.

returnValue: Returns a numeric value.

example: |
 <cfset Minutes = Minute(Now())>
 
 <cfoutput>
 Current minutes past the hour: #Minutes#<br>
 Nearest Half Hour: #GetHalfHour(minutes)#
 </cfoutput>

args:
 - name: minutes
   desc: Number of minutes past the hou for which you want to calculate the nearest half hour.
   req: true


javaDoc: |
 /**
  * Returns the nearest half hour based on minutes of the hour supplied to the function.
  * 
  * @param minutes      Number of minutes past the hou for which you want to calculate the nearest half hour. (Required)
  * @return Returns a numeric value. 
  * @author Jason Smith (jason@inwebsys.net) 
  * @version 1, March 10, 2003 
  */

code: |
 function GetHalfHour(minutes) {
   var min_diff = abs(30 - minutes);
   var half_hour = 0;
   if (minutes lte 30) {
     if (min_diff gte 15) { half_hour = "00"; }
     else { half_hour = "30"; }
   } 
   else if (minutes gt 30) {
     if (min_diff gte 15) { half_hour = "00"; }
     else { half_hour = "30"; }
   }
   return half_hour;
 }

---

