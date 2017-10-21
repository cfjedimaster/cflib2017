---
layout: udf
title:  GetMLKDay
date:   2001-08-28T13:35:25.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date that Martin Luther King Day occurs on in a given year.
description: |
 Returns a date that Martin Luther King Day occurs on in a given year.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Martin Luther King Day is on #DateFormat(GetMLKDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year you want to return Martin Luther King Day for.
   req: false


javaDoc: |
 /**
  * Returns a date that Martin Luther King Day occurs on in a given year.
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library. Minor modifications by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param TheYear      The year you want to return Martin Luther King Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 28, 2001 
  */

code: |
 function GetMLKDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,1,GetNthOccOfDayInMonth(3,2,1,TheYear));
 }

---

