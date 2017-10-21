---
layout: udf
title:  GetGoodFriday
date:   2001-09-04T16:43:31.000Z
library: DateLib
argString: "[TheYear]"
author: Ken McCafferty
authorEmail: mccjdk@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Good Friday in a given year.
description: |
 Returns the date for Good Friday in a given year. If no year is specified, defaults to current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 This year, Good Friday is on #DateFormat(GetGoodFriday(), 'dddd, mmm dd')#.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to return Good Friday for.
   req: false


javaDoc: |
 /**
  * Returns the date for Good Friday in a given year.
  * This function requires the GetEaster() function available from the DateLib library.
  * 
  * @param TheYear      Year you want to return Good Friday for. 
  * @return Returns a date object. 
  * @author Ken McCafferty (mccjdk@yahoo.com) 
  * @version 1, September 4, 2001 
  */

code: |
 // Good Friday: Friday before Easter
 function GetGoodFriday() 
 {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   return DateAdd("D",-2,GetEaster(TheYear));
 }

---

