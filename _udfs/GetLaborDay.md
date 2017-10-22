---
layout: udf
title:  GetLaborDay
date:   2001-08-22T18:04:20.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date for Labor Day in a given year.  If no year is specified, defaults to the current year.
tagBased: false
description: |
 Returns a date for Labor Day in a given year.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Labor Day is on #DateFormat(GetLaborDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: The year you want to return Labor Day for.
   req: false


javaDoc: |
 /**
  * Returns a date for Labor Day in a given year.  If no year is specified, defaults to the current year.
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library. Minor modifications by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param TheYear      The year you want to return Labor Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, August 22, 2001 
  */

code: |
 //Labor Day:first monday in september
 function GetLaborDay() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return CreateDate(TheYear,9,GetNthOccOfDayInMonth(1,2,9,TheYear));
 }

---

