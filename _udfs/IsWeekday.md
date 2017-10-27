---
layout: udf
title:  IsWeekday
date:   2001-08-17T13:29:45.000Z
library: DateLib
argString: "[Date]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns true if a date is during the week.
tagBased: false
description: |
 Returns true if a date is during the week. This is defined as any day between Monday and Friday. The function defaults to today.

returnValue: Returns a boolean.

example: |
 <CFOUTPUT>
 Is it a week day? #IsWeekday()#
 </CFOUTPUT>

args:
 - name: Date
   desc: Defaults to today.
   req: false


javaDoc: |
 /**
  * Returns true if a date is during the week.
  * 
  * @param Date      Defaults to today. 
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, August 17, 2001 
  */

code: |
 function IsWeekDay() {
     var today = Now();
     if(ArrayLen(Arguments)) today = Arguments[1];
     return (DayOfWeek(today) GTE 2 AND DayOfWeek(today) LTE 6);
 }

oldId: 163
---

