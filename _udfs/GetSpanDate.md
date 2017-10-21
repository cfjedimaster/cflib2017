---
layout: udf
title:  GetSpanDate
date:   2001-12-12T09:43:12.000Z
library: DateLib
argString: "dateObj , days, hours, minutes[, seconds]"
author: Chris Wigginton
authorEmail: cwigginton@macromedia.com
version: 1
cfVersion: CF5
shortDescription: Adds a timespan to a date.  GetSpanDate(dateObj, days, hours, minutes, seconds)  Pass in a date object, with the span difference of days, hours, minutes, and seconds and returns a timestamp of the end of the span.
description: |
 Returns a Date n days,hours,minutes, and seconds in the future or past by adding a timespan to the passed date.

returnValue: Returns a date/time object.

example: |
 <cfset Today = Now()>
 <cfset EndDate = GetSpanDate(Today, 1,5,0,0)>
 <cfoutput>
 Today is #DateFormat(Today, "mm/dd/yyyy")# #TimeFormat(Today,"HH:mm:ss")#<p>
 1 day and 5 hours later is: #DateFormat(EndDate, "mm/dd/yyyy")# #TimeFormat(EndDate,"HH:mm:ss")#<p>
 </cfoutput>

args:
 - name: dateObj 
   desc: ColdFusion date object to use as the starting date.
   req: true
 - name: days
   desc: Number of days in the timespan
   req: true
 - name: hours
   desc: Number of hours in the timespan
   req: true
 - name: minutes
   desc: Number of minutes in the timespan.
   req: true
 - name: seconds
   desc: Number of seconds in the timespan.
   req: false


javaDoc: |
 /**
  * Adds a timespan to a date.
 
 GetSpanDate(dateObj, days, hours, minutes, seconds)
 
 Pass in a date object, with the span difference of days, hours, minutes, and seconds and returns a timestamp of the end of the span.
  * 
  * @param dateObj       ColdFusion date object to use as the starting date. 
  * @param days      Number of days in the timespan 
  * @param hours      Number of hours in the timespan 
  * @param minutes      Number of minutes in the timespan. 
  * @param seconds      Number of seconds in the timespan. 
  * @return Returns a date/time object. 
  * @author Chris Wigginton (cwigginton@macromedia.com) 
  * @version 1, December 12, 2001 
  */

code: |
 function GetSpanDate(dateObj, days, hours, minutes, seconds){
   var timeDiff = CreateTimeSpan(days, hours, minutes, seconds);
   var spanDate = dateObj+timeDiff;
   return "{ts '" & DateFormat(spanDate, "yyyy-mm-dd ") & TimeFormat(spanDate, "HH:mm:ss") & "'}";
 }

---

