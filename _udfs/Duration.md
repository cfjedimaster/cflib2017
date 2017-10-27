---
layout: udf
title:  Duration
date:   2011-09-29T20:12:52.000Z
library: DateLib
argString: "dateObj1 , dateObj2 "
author: Chris Wigginton
authorEmail: cwigginton@macromedia.com
version: 2
cfVersion: CF5
shortDescription: Duration(dateObj1, dateObj2) Takes two date objects and returns a structure containing the duration of days, hours, and minutes.
tagBased: false
description: |
 Adapted from original concept of Craig Girard's CF_SubtractDates located in the Developer Exchange.
 
 This function takes two dates and produces a structure containing the difference in Days, hours, and minutes

returnValue: Returns a structure containing the keys Days, Hours, and Minutes with their associated values.

example: |
 <cfset today = "{ts '2001-11-15 08:55:56'}">
 <cfset endDate = "{ts '2001-12-01 05:00:56'}">
 <cfset timeDiff = Duration(today, endDate)>
 <cfoutput>
 #today#<br>
 #endDate#<br>
 #timeDiff.days# Day(s) #timeDiff.hours# Hour(s) #timediff.minutes# Minute(s)<p></p>
 </cfoutput>

args:
 - name: dateObj1 
   desc: CF Date Object to compare
   req: true
 - name: dateObj2 
   desc: CF Date Object to compare
   req: true


javaDoc: |
 /**
  * Duration(dateObj1, dateObj2)
 Takes two date objects and returns a structure containing the duration of days, hours, and minutes.
  * v2 mod by James Moberg to support seconds.
  * 
  * @param dateObj1       CF Date Object to compare (Required)
  * @param dateObj2       CF Date Object to compare (Required)
  * @return Returns a structure containing the keys Days, Hours, and Minutes with their associated values. 
  * @author Chris Wigginton (cwigginton@macromedia.com) 
  * @version 2, September 29, 2011 
  */

code: |
 function Duration(dateObj1, dateObj2){
        var dateStorage = dateObj2;
        var DayHours = 0;
        var DayMinutes = 0;
        var HourMinutes = 0;
        var timeStruct = structNew();
 
        if (DateCompare(dateObj1, dateObj2) IS 1)       {
                        dateObj2 = dateObj1;
                        dateObj1 = dateStorage;
        }
 
        timeStruct.days = DateDiff("d",dateObj1,dateObj2);
        DayHours = timeStruct.days * 24;
        timeStruct.hours = DateDiff("h",dateObj1,dateObj2);
        timeStruct.hours = timeStruct.hours - DayHours;
 
        DayMinutes = timeStruct.days * 1440;
        HourMinutes = timeStruct.hours * 60;
        timeStruct.minutes = DateDiff("n",dateObj1,dateObj2);
        timeStruct.minutes = timeStruct.minutes - (DayMinutes + HourMinutes);
 
        DayMinutes = timeStruct.days * 86400;
        HourMinutes = (timeStruct.hours * 3600) + (timeStruct.minutes * 60);
        timeStruct.seconds = DateDiff("s",dateObj1,dateObj2);
        timeStruct.seconds = timeStruct.seconds - (DayMinutes + HourMinutes);
        return timeStruct;
 }

oldId: 377
---

