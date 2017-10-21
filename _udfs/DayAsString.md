---
layout: udf
title:  DayAsString
date:   2002-11-01T19:54:01.000Z
library: DateLib
argString: "daynum"
author: Larry Juncker
authorEmail: ljuncker@aljcompserv.com
version: 1
cfVersion: CF5
shortDescription: Returns a string for a day value.
description: |
 Returns a string representation of the numeric day value passed into it.

returnValue: Returns a string.

example: |
 <cfoutput>
 Today is the #DayAsString(Day(Now()))#<br>
 Today is the #DayAsString(1)#<br>
 Today is the #DayAsString(11)#<br>
 Today is the #DayAsString(21)#<br>
 Today is the #DayAsString(31)#<br>
 </cfoutput>

args:
 - name: daynum
   desc: Day number to convert.
   req: true


javaDoc: |
 /**
  * Returns a string for a day value.
  * 
  * @param daynum      Day number to convert. (Required)
  * @return Returns a string. 
  * @author Larry Juncker (ljuncker@aljcompserv.com) 
  * @version 1, November 1, 2002 
  */

code: |
 function dayAsString(daynum) {
     var dayList="First,Second,Third,Fourth,Fifth,Sixth,Seventh,Eighth,Ninth,Tenth,Eleventh,Twelveth,Thirteenth,Fourteenth,Fifteenth,Sixteenth,Seventeenth,Eighteenth,Nineteenth,Twentieth,Twenty First,Twenty Second,Twenty Third,Twenty Fourth,Twenty Fifth,Twenty Sixth,Twenty Seventh,Twenty Eighth,Twenty Ninth,Thirtieth,Thirty First";
     return ListGetAt(dayList,daynum);
 }

---

