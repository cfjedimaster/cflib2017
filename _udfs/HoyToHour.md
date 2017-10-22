---
layout: udf
title:  HoyToHour
date:   2002-05-14T16:45:50.000Z
library: DateLib
argString: "hoy"
author: Billy Cravens
authorEmail: billy@fuzweb.com
version: 1
cfVersion: CF5
shortDescription: Converts hour of the year to hour of the day.
tagBased: false
description: |
 Allows you to take an hour of the year and convert it to a numeric hour (like 23.5).  Similar to CF's hour(date).  Very useful in scheduling applications, where you would want records to have an absolute value within a specific year, but still need to look at them as the fit within a certain day.

returnValue: Returns a number.

example: |
 <cfoutput>
 You start at: #hoyToHour(3498)#
 </cfoutput>

args:
 - name: hoy
   desc: Hour of the year.
   req: true


javaDoc: |
 /**
  * Converts hour of the year to hour of the day.
  * 
  * @param hoy      Hour of the year. (Required)
  * @return Returns a number. 
  * @author Billy Cravens (billy@fuzweb.com) 
  * @version 1, May 14, 2002 
  */

code: |
 function hoyToHour(hoy) {
     return hoy - ((hoy \ 24)*24);
 }

---

