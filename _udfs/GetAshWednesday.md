---
layout: udf
title:  GetAshWednesday
date:   2001-09-04T16:45:56.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for Ash Wednesday in a given year.
description: |
 Returns a date for Ash Wednesday in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Ash Wednesday is on #DateFormat(GetAshWednesday(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return Ash Wednesday for.
   req: false


javaDoc: |
 /**
  * Returns a date for Ash Wednesday in a given year.
  * This function requires the GetEaster() function available from the DateLib library.
  * 
  * @param TheYear      Year you want to return Ash Wednesday for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, September 4, 2001 
  */

code: |
 // Ash Wednesday: Seventh Wednesday before Easter
 function GetAshWednesday() {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return DateAdd("D",-46,GetEaster(TheYear));
 }

---

