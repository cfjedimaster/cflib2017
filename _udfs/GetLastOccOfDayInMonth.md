---
layout: udf
title:  GetLastOccOfDayInMonth
date:   2001-08-22T16:57:10.000Z
library: DateLib
argString: "TheDayOfWeek, TheMonth, TheYear"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the day of the month(1-31) of Last Occurrence of a day (1-sunday,2-monday etc.) in a given month.
tagBased: false
description: |
 Returns the day of the month(1-31) of Last Occurrence of a day (1-sunday,2-monday etc.)
 in a given month.  Can be used to determine holidays or special events that occur on the last occurrence of a day in a month.

returnValue: Returns a numeric value.

example: |
 <CFOUTPUT>
 The last Monday in May of 2001 is on May #GetLastOccOfDayInMonth(2,5,2001)#.
 </CFOUTPUT>

args:
 - name: TheDayOfWeek
   desc: Ordinal value representing the desired day of the week (1-sunday,2-monday etc.)
   req: true
 - name: TheMonth
   desc: Ordinal value representing the month (1-January, 2-February, etc.)
   req: true
 - name: TheYear
   desc: The year.
   req: true


javaDoc: |
 /**
  * Returns the day of the month(1-31) of Last Occurrence of a day (1-sunday,2-monday etc.)
 in a given month.
  * 
  * @param TheDayOfWeek      Ordinal value representing the desired day of the week (1-sunday,2-monday etc.) 
  * @param TheMonth      Ordinal value representing the month (1-January, 2-February, etc.) 
  * @param TheYear      The year. 
  * @return Returns a numeric value. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 22, 2001 
  */

code: |
 function GetLastOccOfDayInMonth(TheDayOfWeek,TheMonth,TheYear) 
 {
   //Find The Number of Days in Month
   Var TheDaysInMonth=DaysInMonth(CreateDate(TheYear,TheMonth,1));
   //find the day of week of Last Day
   Var DayOfWeekOfLastDay=DayOfWeek(CreateDate(TheYear,TheMonth,TheDaysInMonth));
   //subtract DayOfWeek
   Var DaysDifference=DayOfWeekOfLastDay - TheDayOfWeek;
   //Add a week if it is negative
   if(DaysDifference lt 0){
     DaysDifference=DaysDifference + 7;
   }
   return TheDaysInMonth-DaysDifference;
 }

oldId: 180
---

