---
layout: udf
title:  JulianDayofWeek
date:   2001-09-05T14:05:37.000Z
library: DateLib
argString: "[fullDate]"
author: Beau A.C. Harbin
authorEmail: bharbin@activematter.com
version: 1
cfVersion: CF5
shortDescription: Returns the day of the week for a date in the Julian calendar.
description: |
 Returns the day of the week for a date in the Julian.  If no date is provided, defaults to the current day.  Verified to be accurate between 400 and 9999 AD.

returnValue: Returns an integer between 1 and 7 representing the day of the week (1=Sunday).

example: |
 <CFOUTPUT>
 #DayofWeekAsString(JulianDayofWeek("2/1/445"))#
 </CFOUTPUT>

args:
 - name: fullDate
   desc: Date you want to return the Julian day of the week for.
   req: false


javaDoc: |
 /**
  * Returns the day of the week for a date in the Julian calendar.
  * The original alogrithim for the calculation was found at: http://www.faqs.org/faqs/calendars/faq/part1/
  * 
  * @param fullDate      Date you want to return the Julian day of the week for. 
  * @return Returns an integer between 1 and 7 representing the day of the week (1=Sunday). 
  * @author Beau A.C. Harbin (bharbin@figleaf.com) 
  * @version 1.0, September 5, 2001 
  */

code: |
 function JulianDayofWeek(){
         var date=iif(arraylen(arguments) gt 0,"arguments[1]", "Now()");
     var month = DatePart("m", date);
     var day = DatePart("d", date);
     var year = DatePart("yyyy", date);
     var a = 0;
     var y = 0;
     var m = 0;
     var dayOfWeek = 0;
     a = (14 - month) \ 12;
     y = year - a;
     m = month + 12*a - 2;
     // for Julian calendar:
     dayOfWeek = ((5 + day + y + y\4 + (31*m)\12) mod 7)+1;
 
     // for Gregorian calendar:
     if(arraylen(arguments) EQ 0){
         dayOfWeek = DayofWeek(date);
     }
 
     return dayOfWeek;
 }

---

