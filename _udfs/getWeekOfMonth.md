---
layout: udf
title:  getWeekOfMonth
date:   2014-11-13T15:55:14.000Z
library: DateLib
argString: "d"
author: Stephen Withington
authorEmail: stephenwithington@gmail.com
version: 0
cfVersion: CF10
shortDescription: Returns the week number in a month for any given date (1-5).
tagBased: false
description: |
 Returns the week number in a month for any given date (1-5).

returnValue: Returns a number.

example: |
 <cfscript>
 myDate = CreateDate(2014, 6, 27);
 weekOfMonth = getWeekOfMonth(myDate);
 // returns 4
 </cfscript>

args:
 - name: d
   desc: Date to parse.
   req: true


javaDoc: |
 /**
  * Returns the week number in a month for any given date (1-5).
  * 
  * @param d      Date to parse. (Required)
  * @return Returns a number. 
  * @author Stephen Withington (stephenwithington@gmail.com) 
  * @version 0, November 13, 2014 
  */

code: |
 numeric function getWeekOfMonth(date d=Now()) {
     var cal = CreateObject('java', 'java.util.GregorianCalendar').init(
         JavaCast('int', Year(arguments.d))
         , JavaCast('int', Month(arguments.d)-1)
         , JavaCast('int', Day(arguments.d))
         , JavaCast('int', Hour(arguments.d))
         , JavaCast('int', Minute(arguments.d))
         , JavaCast('int', Second(arguments.d))
     );
     cal.setMinimalDaysInFirstWeek(1);
     return cal.get(cal.WEEK_OF_MONTH);
 }

oldId: 2324
---

