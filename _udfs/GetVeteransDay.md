---
layout: udf
title:  GetVeteransDay
date:   2001-08-28T15:07:00.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for Veterans Day in a given year.
tagBased: false
description: |
 Returns a date for Veterans Day in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Veterans Day is on #DateFormat(GetVeteransDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return Veterans Day for.
   req: false


javaDoc: |
 /**
  * Returns a date for Veterans Day in a given year.
  * 
  * @param TheYear      Year you want to return Veterans Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 28, 2001 
  */

code: |
 // Veterans Day: November 11
 function GetVeteransDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,11,11);
 }

---

