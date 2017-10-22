---
layout: udf
title:  lastDayofWeek
date:   2010-08-30T15:42:31.000Z
library: DateLib
argString: "[date]"
author: Randy Johnson
authorEmail: randy@cfconcepts.com
version: 1
cfVersion: CF5
shortDescription: Returns last day of the week, assumes Saturday is the last day.
tagBased: false
description: |
 This function will return the next Saturday after the date you pass in.

returnValue: Returns a date.

example: |
 <cfoutput>
 #lastDayOfWeek()#<br/>
 #lastDayOfWeek(now())#<br/>
 #lastDayOfWeek(dateAdd("ww", 1, now()))#
 </cfoutput>

args:
 - name: date
   desc: Date to base 'next Saturday' on. Defaults to now().
   req: false


javaDoc: |
 /**
  * Returns last day of the week, assumes Saturday is the last day.
  * Modded by RCamden to support default date
  * 
  * @param date      Date to base 'next Saturday' on. Defaults to now(). (Optional)
  * @return Returns a date. 
  * @author Randy Johnson (randy@cfconcepts.com) 
  * @version 1, August 30, 2010 
  */

code: |
 function lastDayOfWeek() {
      var NumberOfDays="";
      var LastDayOfWeek = "";
      if(arrayLen(arguments) is 0) arguments.date = now();
      else arguments.date = arguments[1];
      date = trim(arguments.date);
     
      NumberOfDays = 7 - dayOfWeek(date);
 
      LastDayOfWeek = dateAdd("d", NumberOfDays, date);
     
      return LastDayOfWeek;
 }

---

