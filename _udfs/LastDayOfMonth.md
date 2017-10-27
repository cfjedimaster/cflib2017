---
layout: udf
title:  LastDayOfMonth
date:   2002-05-07T11:46:59.000Z
library: DateLib
argString: "strMonth[, strYear]"
author: Ryan Kime
authorEmail: ryan.kime@somnio.com
version: 1
cfVersion: CF5
shortDescription: Returns a date object representing the last day of the given month.
tagBased: false
description: |
 LastDayOfMonth() takes your selected month as a number (1-12) and an optional given year (which is good for instances of a Leap Year). It returns a date object that you can then use DateFormat to get the appropriate format for the month, day, and year.

returnValue: Returns a date object.

example: |
 <cfset month = 2>
 <cfset year = 2004>
 
 last day of the month is: 
 <cfoutput>#LastDayOfMonth(month, year)#</cfoutput>
 <br>- or -<br>
 last day of the month is: 
 <cfoutput>#DateFormat(LastDayOfMonth(month, year), "dddd mmm dd, yyyy")#</cfoutput>

args:
 - name: strMonth
   desc: Month you want to get the last day for,
   req: true
 - name: strYear
   desc: Year for the specified month.  Useful for leap years.  The default is the current year.
   req: false


javaDoc: |
 /**
  * Returns a date object representing the last day of the given month.
  * 
  * @param strMonth      Month you want to get the last day for, (Required)
  * @param strYear      Year for the specified month.  Useful for leap years.  The default is the current year. (Optional)
  * @return Returns a date object. 
  * @author Ryan Kime (ryan.kime@somnio.com) 
  * @version 1, May 7, 2002 
  */

code: |
 function LastDayOfMonth(strMonth) {
   var strYear=Year(Now());
   if (ArrayLen(Arguments) gt 1)
     strYear=Arguments[2];
   return DateAdd("d", -1, DateAdd("m", 1, CreateDate(strYear, strMonth, 1)));
 }

oldId: 639
---

