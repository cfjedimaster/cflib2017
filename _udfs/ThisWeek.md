---
layout: udf
title:  ThisWeek
date:   2002-02-25T14:00:40.000Z
library: DateLib
argString: "[date]"
author: Rich Rein
authorEmail: richard.rein@medtronic.com
version: 2
cfVersion: CF5
shortDescription: Generates a structure of days for the week, including the beginning and end of the week.
tagBased: false
description: |
 Pass in a date, or use the default of today, and this function will generate a structure containing a set of keys relevant to the week. Keys include: weekBegin, weekEnd, weekNo (week number of the year), Sunday, Monday, etc.

returnValue: Returns a structure.

example: |
 <cfset weekData = thisWeek()>
 <cfdump var="#weekData#">
 <cfset nextWeek = dateAdd("d",7,now())>
 <cfset nweekData = thisWeek(nextWeek)>
 <cfdump var="#nweekData#">

args:
 - name: date
   desc: Date to use. Defaults to this week.
   req: false


javaDoc: |
 /**
  * Generates a structure of days for the week, including the beginning and end of the week.
  * Rewrite by Raymond Camden
  * 
  * @param date      Date to use. Defaults to this week. 
  * @return Returns a structure. 
  * @author Rich Rein (richard.rein@medtronic.com) 
  * @version 2, February 25, 2002 
  */

code: |
 function thisWeek() {
     var dayOrdinal = 0;
     var returnStruct = structNew();
     var current_date = now();
     
     if (arrayLen(arguments)) current_date = arguments[1];
     dayOrdinal = DayOfWeek(current_date);
     
     returnStruct.weekBegin = dateAdd("d",-1 * (dayOrdinal-1), current_date);
     returnStruct.weekEnd = dateAdd("d",7-dayOrdinal, current_date);
     returnStruct.weekNo = Week(returnStruct.weekBegin);
     
     for(i=1; i LTE 7; i=i+1) {
         StructInsert(returnStruct,DayOfWeekAsString(i),dateAdd("d",i-1,returnStruct.weekBegin));
     }
     
     return returnStruct;
 
 }

oldId: 330
---

