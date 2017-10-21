---
layout: udf
title:  GetMemorialDay
date:   2001-08-28T15:06:06.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for Memorial Day in a given year.
description: |
 Returns a date for Memorial Day in a given year.  If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Memorial Day is on #DateFormat(GetMemorialDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year you want to return Columbus Day for.
   req: false


javaDoc: |
 /**
  * Returns a date for Memorial Day in a given year.
  * This function requires the GetLastOccOfDayInMonth() function available from the DateLib library. Minor modifications by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param TheYear      The year you want to return Columbus Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, August 28, 2001 
  */

code: |
 //Memorial Day:last monday in may
 function GetMemorialDay()
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,5,GetLastOccOfDayInMonth(2,5,TheYear));
 }

---

