---
layout: udf
title:  WeekInMonth
date:   2004-09-21T19:23:52.000Z
library: DateLib
argString: "[theDate]"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Returns the week number in a month.
tagBased: false
description: |
 Returns the week number in a month. I.E: The week number of March 27, 2004 would be 4

returnValue: Returns a number.

example: |
 <cfset weekNum = weekInMonth(Now())>

args:
 - name: theDate
   desc: Date to use. Defaults to now().
   req: false


javaDoc: |
 /**
  * Returns the week number in a month.
  * 
  * @param theDate      Date to use. Defaults to now(). (Optional)
  * @return Returns a number. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, September 21, 2004 
  */

code: |
 function weekInMonth() {
   var theDate = Now();
   
   if(arrayLen(arguments)) theDate = arguments[1];
   return  week(theDate) - week(createDate(year(theDate),month(theDate),1)) + 1;
 }

oldId: 1122
---

