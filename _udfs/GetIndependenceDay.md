---
layout: udf
title:  GetIndependenceDay
date:   2001-09-10T13:00:27.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for U.S. Independence Day  in a given year.
tagBased: false
description: |
 Returns the date for U.S. Independence Day  in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, U.S. Independence Day is on #DateFormat(GetIndependenceDay(), 'dddd, mmm dd, yyyy')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return U.S. Independence Day for.
   req: false


javaDoc: |
 /**
  * Returns the date for U.S. Independence Day  in a given year.
  * 
  * @param TheYear      Year you want to return U.S. Independence Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, September 10, 2001 
  */

code: |
 // Independence Day: July 4
 function GetIndependenceDay() {
     Var TheYear=Year(Now());
       if(ArrayLen(Arguments)) 
         TheYear = Arguments[1];
     return CreateDate(TheYear,7,4);
 }

---

