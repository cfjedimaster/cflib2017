---
layout: udf
title:  firstXDayOfMonth
date:   2014-07-06T10:36:50.000Z
library: DateLib
argString: "dayOfWeek, month, year"
author: Troy Pullis
authorEmail: tpullis@yahoo.com
version: 1
cfVersion: CF9
shortDescription: Returns a date object of the first occurrence of a specified day in the given month and year.
tagBased: false
description: |
 Takes a day number, month number, and year. Returns a date object of the first occurrence of that day in the given month and year. For example, you want a date object for the first Wednesday in November, 2005. In this case, the function returns the date: 11/2/05.

returnValue: The date of the first [dayOfWeek] of the specified month/year

example: |
 Our Nov CFUG meeting is on #DateFormat(FirstXDayOfMonth(4,11,2005),"dddd, mmmm d")#

args:
 - name: dayOfWeek
   desc: An integer in the range 1 - 7. 1=Sun, 2=Mon, 3=Tue, 4=Wed, 5=Thu, 6=Fri, 7=Sat.
   req: true
 - name: month
   desc: Month value. 
   req: true
 - name: year
   desc: Year value.
   req: true


javaDoc: |
 /**
  * Returns a date object of the first occurrence of a specified day in the given month and year.
  * v1.0 by Troy Pullis   
  * v1.1 by Adam Cameron (improved/simplified logic, added error handling)
  * 
  * @param dayOfWeek      An integer in the range 1 - 7. 1=Sun, 2=Mon, 3=Tue, 4=Wed, 5=Thu, 6=Fri, 7=Sat. (Required)
  * @param month      Month value.  (Required)
  * @param year      Year value. (Required)
  * @return The date of the first [dayOfWeek] of the specified month/year 
  * @author Troy Pullis (tpullis@yahoo.com) 
  * @version 1.1, July 6, 2014 
  */

code: |
 date function firstXDayOfMonth(required numeric dayOfWeek, required numeric month, required numeric year){
     if (dayOfWeek < 1 || dayOfWeek > 7){
         throw(type="InvalidDayOfWeekException", message="Invalid day of week value", detail="the dayOfWeek argument must be between 1-7 (inclusive).");
     }
     var firstOfMonth    = createDate(year, month,1);
     var dowOfFirst        = dayOfWeek(firstOfMonth);
     var daysToAdd        = (7 - (dowOfFirst - dayOfWeek)) MOD 7;
     var dow = dateAdd("d", daysToAdd, firstOfMonth);
     return dow;
 }

---

