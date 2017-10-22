---
layout: udf
title:  IsWeekend
date:   2001-08-17T13:22:43.000Z
library: DateLib
argString: "[Date]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns true if a date is on the weekend.
tagBased: false
description: |
 This function returns true or false depending on if a date falls on the weekend. This is defined as either Saturday or Sunday. The function defaults to today.

returnValue: Returns a boolean.

example: |
 <CFOUTPUT>
 Is it the weekend? #IsWeekend()#<BR>
 </CFOUTPUT>

args:
 - name: Date
   desc: Defaults to today.
   req: false


javaDoc: |
 /**
  * Returns true if a date is on the weekend.
  * 
  * @param Date      Defaults to today. 
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, August 17, 2001 
  */

code: |
 function IsWeekend() {
     var today = Now();
     if(ArrayLen(Arguments)) today = Arguments[1];
     return (DayOfWeek(today) IS 1 OR DayOfWeek(today) IS 7);
 }

---

