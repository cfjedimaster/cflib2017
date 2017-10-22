---
layout: udf
title:  customWeekNumber
date:   2010-03-05T05:40:39.000Z
library: DateLib
argString: "date[, weekStart][, returnFormat]"
author: Azadi Saryev
authorEmail: azadi.saryev@gmail.com
version: 0
cfVersion: CF5
shortDescription: Returns week number based on [optional] custom start of week day
tagBased: false
description: |
 Returns week number of given date based on optional start-of-week day (numeric; in the range of 1 [Sunday] to 7 [Saturday]; defaults to 1).
 Returns either week number or, if optional third argument was passed (boolean; defaults to false), as week number and year as WW.YYYY

returnValue: Returns a string (depends on optional argument).

example: |
 <cfoutput>
 Week number of today's date based on Saturday as first day of week: #customWeekNumber(now(), 7)#<br>
 Week number, including year, of today's date based on Monday as first day of week: #customWeekNumber(now(), 2, true)#
 </cfoutput>

args:
 - name: date
   desc: date to determine week number 
   req: true
 - name: weekStart
   desc: day of week start (1-7)
   req: false
 - name: returnFormat
   desc: boolean to return week number and year instead of just week number
   req: false


javaDoc: |
 /**
  * Returns week number based on [optional] custom start of week day
  * 
  * @param date      date to determine week number  (Required)
  * @param weekStart      day of week start (1-7) (Optional)
  * @param returnFormat      boolean to return week number and year instead of just week number (Optional)
  * @return Returns a string (depends on optional argument). 
  * @author Azadi Saryev (azadi.saryev@gmail.com) 
  * @version 0, March 4, 2010 
  */

code: |
 function customWeekNumber(date) {
     var firstDayOfWeek = 1;
     var theDate = createdate(year(arguments.date), month(arguments.date), day(arguments.date));
     var firstDayOfYear = createdate(year(theDate), 1, 1);
     var firstCustWeekdayOfYear = "";
     var custWeekNum = 0;
     if (arraylen(arguments) gte 2) firstDayOfWeek = arguments[2];
     if (val(firstDayOfWeek) lt 1 OR val(firstDayOfWeek) gt 7) firstDayOfWeek = 1;
     firstCustWeekdayOfYear = dateadd('d', firstDayOfWeek-dayofweek(firstDayOfYear), firstDayOfYear);
     if (datecompare(theDate, firstCustWeekdayOfYear) lt 0) {
         firstDayOfYear = createdate(year(theDate)-1, 1, 1);
         firstCustWeekdayOfYear = dateadd('d', firstDayOfWeek-dayofweek(firstDayOfYear), firstDayOfYear);
     }
     custWeekNum = ceiling(datediff('d', firstCustWeekdayOfYear, theDate)/7);
     if (NOT custWeekNum) custWeekNum = 1;
     if (arraylen(arguments) gte 3 AND arguments[3]) {
         return numberformat(custWeekNum + year(firstCustWeekdayOfYear)/(1 & repeatstring(0, len(year(firstCustWeekdayOfYear)))), '^.' & repeatstring(0, len(year(firstCustWeekdayOfYear)))); //return weeknumber and year as WW.YYYY 
     } else {
         return custWeekNum; //return weeknumber only
     }
 }

---

