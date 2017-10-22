---
layout: udf
title:  GetThanksgivingDay
date:   2001-09-05T12:16:21.000Z
library: DateLib
argString: "[TheDate]"
author: Ken McCafferty
authorEmail: mccjdk@fyi.net
version: 1
cfVersion: CF5
shortDescription: Returns the date for Thanksgiving day in a given year.
tagBased: false
description: |
 Returns the date for Thanksgiving day in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Thanksgiving day is on #DateFormat(GetThanksgivingDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheDate
   desc: The year you want to return Thanksgiving day for.
   req: false


javaDoc: |
 /**
  * Returns the date for Thanksgiving day in a given year.
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library.
  * 
  * @param TheDate      The year you want to return Thanksgiving day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@fyi.net) 
  * @version 1.0, September 5, 2001 
  */

code: |
 // Thanksgiving Day 4th thursday in november
 function GetThanksgivingDay() {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
 
   return CreateDate(TheYear,11,GetNthOccOfDayInMonth(4,5,11,TheYear));
 }

---

