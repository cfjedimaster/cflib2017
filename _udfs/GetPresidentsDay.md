---
layout: udf
title:  GetPresidentsDay
date:   2001-09-05T14:33:06.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for President's Day in a given year.
tagBased: false
description: |
 Returns the date for President's Day in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, President's Day is on #DateFormat(GetPresidentsDay(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return President's Day for.
   req: false


javaDoc: |
 /**
  * Returns the date for President's Day in a given year.
  * This function requires the GetNthOccOfDayInMonth() function available from the DateLib library.
  * 
  * @param TheYear      Year you want to return President's Day for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1.0, September 5, 2001 
  */

code: |
 //Presidents Day:third monday in february
 function GetPresidentsDay() {
     Var TheYear=Year(Now());
       if(ArrayLen(Arguments)) 
         TheYear = Arguments[1];
     return CreateDate(TheYear,2,GetNthOccOfDayInMonth(3,2,2,TheYear));
 }

oldId: 227
---

