---
layout: udf
title:  GetTrinitySunday
date:   2001-10-05T13:13:58.000Z
library: DateLib
argString: "[TheYear]"
author: Beau A.C. Harbin
authorEmail: bharbin@activematter.com
version: 1
cfVersion: CF5
shortDescription: Returns the date for Trinity Sunday in a given year.
tagBased: false
description: |
 Returns the date for Trinity Sunday in a given year.  If no year is specified, defaults to the current year.

returnValue: Returns a date object.

example: |
 <CFOUTPUT>
 Trinity Sunday falls/fell on #DateFormat(GetTrinitySunday(), 'dddd mmmm dd, yyyy')# this year.
 </CFOUTPUT>

args:
 - name: TheYear
   desc: Year you want to get Trinity Sunday for.
   req: false


javaDoc: |
 /**
  * Returns the date for Trinity Sunday in a given year.
  * This function requires the GetEaster() function available from the DateLib library.
  * 
  * @param TheYear      Year you want to get Trinity Sunday for. 
  * @return Returns a date object. 
  * @author Beau A.C. Harbin (bharbin@figleaf.com) 
  * @version 1.0, October 5, 2001 
  */

code: |
 function GetTrinitySunday() {
   Var TheYear=Year(Now());
   if(ArrayLen(Arguments)) 
     TheYear = Arguments[1];
   Return DateAdd("d", 56, GetEaster(TheYear));
 }

---

