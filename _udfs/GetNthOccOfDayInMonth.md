---
layout: udf
title:  GetNthOccOfDayInMonth
date:   2001-08-28T14:04:42.000Z
library: DateLib
argString: "NthOccurrence, TheDayOfWeek, TheMonth, TheYear"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the day of the month(1-31) of an Nth Occurrence of a day (1-sunday,2-monday etc.)in a given month.
tagBased: false
description: |
 Returns the day of the month(1-31) of an Nth Occurrence of a day (1-sunday,2-monday etc.)in a given month.  Used to determine holidays and special events that occur on the nth occurrence of a day in a month.

returnValue: Returns a numeric value.

example: |
 <CFOUTPUT>
 The third Sunday in August of 2001 is on August
 #GetNthOccOfDayInMonth(3,1,8,2001)#.
 </CFOUTPUT>

args:
 - name: NthOccurrence
   desc: A number representing the nth occurrence.1-5.
   req: true
 - name: TheDayOfWeek
   desc: A number representing the day of the week (1=Sunday, 2=Monday, etc.).
   req: true
 - name: TheMonth
   desc: A number representing the Month (1=January, 2=February, etc.).
   req: true
 - name: TheYear
   desc: The year.
   req: true


javaDoc: |
 /**
  * Returns the day of the month(1-31) of an Nth Occurrence of a day (1-sunday,2-monday etc.)in a given month.
  * 
  * @param NthOccurrence      A number representing the nth occurrence.1-5. 
  * @param TheDayOfWeek      A number representing the day of the week (1=Sunday, 2=Monday, etc.). 
  * @param TheMonth      A number representing the Month (1=January, 2=February, etc.). 
  * @param TheYear      The year. 
  * @return Returns a numeric value. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, August 28, 2001 
  */

code: |
 function GetNthOccOfDayInMonth(NthOccurrence,TheDayOfWeek,TheMonth,TheYear)
 {
   Var TheDayInMonth=0;
   if(TheDayOfWeek lt DayOfWeek(CreateDate(TheYear,TheMonth,1))){
     TheDayInMonth= 1 + NthOccurrence*7  + (TheDayOfWeek - DayOfWeek(CreateDate(TheYear,TheMonth,1))) MOD 7;
   }
   else{
     TheDayInMonth= 1 + (NthOccurrence-1)*7  + (TheDayOfWeek - DayOfWeek(CreateDate(TheYear,TheMonth,1))) MOD 7;
   }
   //If the result is greater than days in month or less than 1, return -1
   if(TheDayInMonth gt DaysInMonth(CreateDate(TheYear,TheMonth,1)) OR   TheDayInMonth lt 1){
     return -1;
   }
   else{
     return TheDayInMonth;
   }
 }

oldId: 179
---

