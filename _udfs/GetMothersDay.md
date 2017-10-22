---
layout: udf
title:  GetMothersDay
date:   2001-08-22T18:50:21.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for Mother's day in a given year.  If no year is specified, defaults to the current year.
tagBased: false
description: |
 Returns a date for Mother's day in a given year.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Mother's Day is on #DateFormat(GetMothersDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year you want to return Mother's Day for.
   req: false


javaDoc: |
 /**
  * Returns a date for Mother's day in a given year.  If no year is specified, defaults to the current year.
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library. Minor modifications by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param TheYear      The year you want to return Mother's Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 22, 2001 
  */

code: |
 //Mother's:second sunday in may
 function GetMothersDay()
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,5,GetNthOccOfDayInMonth(2,1,5,TheYear));
 }

---

