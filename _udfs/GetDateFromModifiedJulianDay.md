---
layout: udf
title:  GetDateFromModifiedJulianDay
date:   2001-09-05T13:20:27.000Z
library: DateLib
argString: "JulianDay"
author: Beau A.C. Harbin
authorEmail: bharbin@activematter.com
version: 1
cfVersion: CF5
shortDescription: Calculates the date and time based on a modified Julian Day.
tagBased: false
description: |
 Calculates the date and time based on a modified Julian Day.

returnValue: Returns a date/time object.

example: |
 <CFSET MJD = GetModifiedJulianDay()>
 <CFOUTPUT>Today's modified Julian Day is: #MJD# which gives us back today's date: #GetDateFromModifiedJulianDay(MJD)#</CFOUTPUT>

args:
 - name: JulianDay
   desc: Value representing the modified Julian day you want to retrieve the date/time for.
   req: true


javaDoc: |
 /**
  * Calculates the date and time based on a modified Julian Day.
  * 
  * @param JulianDay      Value representing the modified Julian day you want to retrieve the date/time for. 
  * @return Returns a date/time object. 
  * @author Beau A.C. Harbin (bharbin@figleaf.com) 
  * @version 1.0, September 5, 2001 
  */

code: |
 function getDateFromModifiedJulianDay(JulianDay){
     var a = 0;
     var b = 0;
     var c = 0;
     var d = 0;
     var e = 0;
     var m = 0;
     var date = 0;
     var JD = JulianDay;
     var time = 0;
     
     a = (JD + 2400001) + 32044;
     b = ((4 * a) + 3) \ 146097;
     c = a - (b * 146097) \ 4;
     d = (4 * c + 3) \ 1461;
     e = c - ((1461 * d) \ 4);
     m = (5 * e + 2) \ 153;
 
     time = TimeFormat(JulianDay, "HH:MM:SS");
     date = CreateDateTime(((b * 100) + d - 4800 + (m \ 10)), (m + 3 - (12 * (m \ 10))), ((e - (153 * m + 2) \ 5) + 1), DatePart("h", time), DatePart("n", time), DatePart("s", time));
     
     return date;
 }

---

