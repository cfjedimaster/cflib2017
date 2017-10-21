---
layout: udf
title:  QuarterHour
date:   2004-09-23T13:43:56.000Z
library: DateLib
argString: "minutes"
author: Dave Babbitt
authorEmail: dave@babbitt.org
version: 1
cfVersion: CF5
shortDescription: Returns a string with a mixed fraction of quarters.
description: |
 Given the number of minutes to be converted,it returns a string with a mixed fraction of fourths of an hour.

returnValue: Returns a string.

example: |
 I've been working for #QuarterHour(132)# hours already today!

args:
 - name: minutes
   desc: The number of minutes.
   req: true


javaDoc: |
 /**
  * Returns a string with a mixed fraction of quarters.
  * 
  * @param minutes      The number of minutes. (Required)
  * @return Returns a string. 
  * @author Dave Babbitt (dave@babbitt.org) 
  * @version 1, September 23, 2004 
  */

code: |
 function QuarterHour(minutes) {
     var mixedFraction = "";
     var hours = 0;
     var quarterHours = 0;
     
     /* Get hours and let minutes be the remainder */
     hours = Int(minutes/60);
     minutes = minutes - hours*60;
 
     /* 15 minutes is a "quarter hour" - round up to the nearest one */
     quarterHours = Round(minutes/15);
     if(quarterHours GTE 4) {
         quarterHours = 0;
         hours = IncrementValue(hours);
     }
 
     /* Build the mixed fraction */
     if(quarterHours GT 0) {
         if(quarterHours EQ 2) mixedFraction = ' 1/2';
         else mixedFraction = ' ' & quarterHours & '/4';
     } else mixedFraction = '';
 
     mixedFraction = hours & mixedFraction;
     return mixedFraction;
 }

---

