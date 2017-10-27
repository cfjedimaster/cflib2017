---
layout: udf
title:  GetFathersDay
date:   2001-08-22T18:44:15.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Return a date for Father's Day in a given year.  If no year is specified, defaults to the current year.
tagBased: false
description: |
 Return a date for Father's Day in a given year.  If no year is specified, defaults to the current year.

returnValue: Returns a date object

example: |
 <CFOUTPUT>
 This year, Father's Day is on #DateFormat(GetFathersDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year you want to return Father's Day for.
   req: false


javaDoc: |
 /**
  * Return a date for Father's Day in a given year.  If no year is specified, defaults to the current year.
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library. Minor modifications by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param TheYear      The year you want to return Father's Day for. 
  * @return Returns a date object 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 22, 2001 
  */

code: |
 //Father's:third sunday in june
 function GetFathersDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,6,GetNthOccOfDayInMonth(3,1,6,TheYear));
 }

oldId: 188
---

