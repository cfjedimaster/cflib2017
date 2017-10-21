---
layout: udf
title:  GetChristmasDay
date:   2001-09-04T15:20:09.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Christmas day in a given year.
description: |
 Returns the date for Christmas day in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Christmas day is on #DateFormat(GetChristmasDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year you want to return Christmas day for.
   req: false


javaDoc: |
 /**
  * Returns the date for Christmas day in a given year.
  * 
  * @param TheYear      The year you want to return Christmas day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, September 4, 2001 
  */

code: |
 function GetChristmasDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,12,25);
 }

---

