---
layout: udf
title:  GetValentinesDay
date:   2001-09-04T15:11:00.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Valentines Day in a given year.
description: |
 Returns the date for Valentines Day in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Valentine's Day is on #DateFormat(GetValentinesDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return Valentine's day for.
   req: false


javaDoc: |
 /**
  * Returns the date for Valentines Day in a given year.
  * 
  * @param TheYear      Year you want to return Valentine's day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, September 4, 2001 
  */

code: |
 // Valentines Day: February 14
 function GetValentinesDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,2,14);
 }

---

