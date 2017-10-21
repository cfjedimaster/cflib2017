---
layout: udf
title:  dayOfWeekAsInteger
date:   2013-12-09T13:38:38.000Z
library: DateLib
argString: "day"
author: Simon Bingham
authorEmail: me@simonbingham.me.uk
version: 1
cfVersion: CF9
shortDescription: Converts a day string to a number.
description: |
 Converts a day string to a number (e.g. Sunday to 1, Monday to 2, etc.).

returnValue: A numeric index corresponding to the day of the week (Sunday=1)

example: |
 <cfoutput>#dayOfWeekAsInteger("Wednesday")#</cfoutput>

args:
 - name: day
   desc: A day of the week in English, eg Wednesday
   req: true


javaDoc: |
 /**
  * Converts a day string to a number.
  * v0.9 by Simon Bingham
  * v1.0 by Adam Cameron. Rename &amp; raise exception when input is invalid
  * 
  * @param day      A day of the week in English, eg Wednesday (Required)
  * @return A numeric index corresponding to the day of the week (Sunday=1) 
  * @author Simon Bingham (me@simonbingham.me.uk) 
  * @version 1, December 9, 2013 
  */

code: |
 numeric function dayOfWeekAsInteger(required string day){
     var days = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday";
     var index = listFindNoCase(days, day);
     if (index){
         return index;
     }else{
         throw(type="ArgumentOutOfRangeException", message="Invalid day value", detail="day argument value must be one of #days#");
     }
 }

---

