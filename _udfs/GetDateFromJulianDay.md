---
layout: udf
title:  GetDateFromJulianDay
date:   2001-09-05T13:08:23.000Z
library: DateLib
argString: "JulianDay"
author: Beau A.C. Harbin
authorEmail: bharbin@activematter.com
version: 1
cfVersion: CF5
shortDescription: Calculates the date and time from a provided Julian Day value.
tagBased: false
description: |
 Calculates the date and time from a provided Julian Day value.

returnValue: Returns a date/time object.

example: |
 <CFSET JD = getJulianDay()>
 <CFOUTPUT>Today's Julian Day is: #JD# which gives us back today's date: #GetDateFromJulianDay(JD)#</CFOUTPUT>

args:
 - name: JulianDay
   desc: Value representing the Julian day you want to retrieve the date/time for.
   req: true


javaDoc: |
 /**
  * Calculates the date and time from a provided Julian Day value.
  * 
  * @param JulianDay      Value representing the Julian day you want to retrieve the date/time for. 
  * @return Returns a date/time object. 
  * @author Beau A.C. Harbin (bharbin@figleaf.com) 
  * @version 1.0, September 5, 2001 
  */

code: |
 function GetDateFromJulianDay(JulianDay){
     var a = 0;
     var b = 0;
     var c = 0;
     var d = 0;
     var e = 0;
     var m = 0;
     var date = 0;
     var JD = JulianDay;
     var time = 0;
     
     a = JD + 32044;
     b = ((4 * a) + 3) \ 146097;
     c = a - (b * 146097) \ 4;
     d = (4 * c + 3) \ 1461;
     e = c - ((1461 * d) \ 4);
     m = (5 * e + 2) \ 153;
 
     time = TimeFormat(JulianDay, "HH:MM:SS");
     date = DateAdd("h", 12, CreateDateTime(((b * 100) + d - 4800 + (m \ 10)), (m + 3 - (12 * (m \ 10))), ((e - (153 * m + 2) \ 5) + 1), DatePart("h", time), DatePart("n", time), DatePart("s", time)));
     
     return date;
 }

---

