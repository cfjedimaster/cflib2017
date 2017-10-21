---
layout: udf
title:  getWeekEnding
date:   2004-01-13T21:14:45.000Z
library: DateLib
argString: "theMonth, theYear"
author: Brian Rinaldi
authorEmail: brinaldi@criticaldigital.com
version: 1
cfVersion: CF5
shortDescription: Returns an array of dates with the week ending date of each week in the month.
description: |
 Returns an array of dates with the week ending date of each week in the month. The code defaults to friday as the week ending as this would typically be useful when creating some sort of business report.

returnValue: Returns an array.

example: |
 dump of week ending dates for the current month/year:
 
 <cfdump var="#getWeekEnding(month(now()),year(now()))#">

args:
 - name: theMonth
   desc: Month to use.
   req: true
 - name: theYear
   desc: Year to use.
   req: true


javaDoc: |
 /**
  * Returns an array of dates with the week ending date of each week in the month.
  * 
  * @param theMonth      Month to use. (Required)
  * @param theYear      Year to use. (Required)
  * @return Returns an array. 
  * @author Brian Rinaldi (brinaldi@criticaldigital.com) 
  * @version 1, January 13, 2004 
  */

code: |
 function getWeekEnding(theMonth,theYear) {
     /**
      * week ending day is a friday for our purposes as the end of the business week
      * this can be modified to return a week ending on whatever day you want
     */
     var endOfWeek = 6;
     var theDay = 0;
     var i = 1;
     var arrDate = arrayNew(1);
     
     var theDate = "";
     
     // loop to find the first friday of the month
     do {
         theDay = theDay + 1;
     } while (dayOfWeek(createDate(theYear,theMonth,theDay)) NEQ endOfWeek);
     // establish the first friday of the month
     theDate = createDate(theYear,theMonth,theDay);
     // set the first week end date in the array
     arrDate[i] = theDate;
     /**
      * loop through the rest of the month adding seven to the date until the date
      * exceeds the end of the month
     */
     i=i+1;
     while (month(dateAdd('d',7,theDate)) EQ theMonth) {
         theDate = dateAdd('d',7,theDate);
         arrDate[i] = theDate;
         i = i + 1;
     }
     return arrDate;
 }

---

