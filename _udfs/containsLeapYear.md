---
layout: udf
title:  containsLeapYear
date:   2003-05-26T09:21:45.000Z
library: DateLib
argString: "startDate, endDate"
author: Mosh Teitelbaum
authorEmail: mosh.teitelbaum@evoch.com
version: 1
cfVersion: CF5
shortDescription: Function that determines if a given date range contains a leap year.
tagBased: false
description: |
 Function that determines if a given date range contains a leap year.  Returns true if it contains a leap year, false if not.

returnValue: Returns a boolean.

example: |
 <CFOUTPUT>
     containsLeapYear("1/1/2002", "6/1/2002") = #containsLeapYear("1/1/2002", "6/1/2002")#<br>
     containsLeapYear("1/1/2003", "6/1/2003") = #containsLeapYear("1/1/2003", "6/1/2003")#<br>
     containsLeapYear("1/1/2004", "2/1/2004") = #containsLeapYear("1/1/2004", "2/1/2004")#<br>
     containsLeapYear("1/1/2004", "6/1/2004") = #containsLeapYear("1/1/2004", "6/1/2004")#<br>
 </CFOUTPUT>

args:
 - name: startDate
   desc: Initial date.
   req: true
 - name: endDate
   desc: Ending date.
   req: true


javaDoc: |
 /**
  * Function that determines if a given date range contains a leap year.
  * 
  * @param startDate      Initial date. (Required)
  * @param endDate      Ending date. (Required)
  * @return Returns a boolean. 
  * @author Mosh Teitelbaum (mosh.teitelbaum@evoch.com) 
  * @version 1, May 26, 2003 
  */

code: |
 function containsLeapYear(startDate, endDate) {
     // Build offsets
     var StartDateYearOffset = DateAdd("yyyy", 1, startDate);
     var StartDateYearOffsetInDays = DateDiff("d", startDate, StartDateYearOffset);
     var EndDateYearOffset = DateAdd("yyyy", 1, Trim(endDate));
     var EndDateYearOffsetInDays = DateDiff("d", endDate, EndDateYearOffset);
 
     // Return result
     return IIf(StartDateYearOffsetInDays - EndDateYearOffsetInDays GT 0, DE("true"), DE("false"));
 }

---

