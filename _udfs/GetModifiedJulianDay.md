---
layout: udf
title:  GetModifiedJulianDay
date:   2001-09-04T16:10:31.000Z
library: DateLib
argString: "[TheDate]"
author: Beau A.C. Harbin
authorEmail: bharbin@activematter.com
version: 1
cfVersion: CF5
shortDescription: Calculates the modified Julian Day for any date in the Gregorian calendar.
description: |
 Calculates the modified Julian Day for any date in the Gregorian calendar.  Sometimes a modified Julian day number (MJD) is used which is 2,400,000.5 less than the Julian day number. This brings the numbers into a more manageable numeric range and makes the day numbers change at midnight UTC rather than noon.
 MJD 0 thus started on 17 Nov 1858 (Gregorian) at 00:00:00 UTC.

returnValue: Returns a numeric value.

example: |
 <CFOUTPUT>Today's modified Julian Day is: #GetModifiedJulianDay()#</CFOUTPUT>

args:
 - name: TheDate
   desc: Date you want to return the modified Julian day for.
   req: false


javaDoc: |
 /**
  * Calculates the modified Julian Day for any date in the Gregorian calendar.
  * This function requires the GetJulianDay() function available from the DateLib library.  Minor edits by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param TheDate      Date you want to return the modified Julian day for. 
  * @return Returns a numeric value. 
  * @author Beau A.C. Harbin (bharbin@figleaf.com) 
  * @version 1.0, September 4, 2001 
  */

code: |
 function GetModifiedJulianDay()
 {
   var date = Now();
   var ModifiedJulianDay = 0;
   if(ArrayLen(Arguments)) 
     date = Arguments[1];    
   ModDate = GetJulianDay(date);
   ModifiedJulianDay = ModDate - 2400000.5;
   return ModifiedJulianDay;
 }

---

