---
layout: udf
title:  GetNewYearsDay
date:   2001-09-04T14:46:20.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for New Years Day of a given year.
tagBased: false
description: |
 Returns a date for New Years Day of a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 In 2002, New Year's Day is on #DateFormat(GetNewYearsday(2002), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return New Year's Day for.
   req: false


javaDoc: |
 /**
  * Returns a date for New Years Day of a given year.
  * 
  * @param TheYear      Year you want to return New Year's Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, September 4, 2001 
  */

code: |
 function GetNewYearsDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,1,1);
 }

---

