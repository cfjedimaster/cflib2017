---
layout: udf
title:  GetNewYearsEve
date:   2001-08-28T15:13:00.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for New Year's Eve for a given year.
tagBased: false
description: |
 Returns a date for New Year's Eve for a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, New Year's Eve is on #DateFormat(GetNewYearsEve(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return New Years Eve for.
   req: false


javaDoc: |
 /**
  * Returns a date for New Year's Eve for a given year.
  * 
  * @param TheYear      Year you want to return New Years Eve for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 28, 2001 
  */

code: |
 function GetNewYearsEve() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,12,31);
 }

---

