---
layout: udf
title:  countArbitraryDays
date:   2006-12-05T23:19:00.000Z
library: DateLib
argString: "startdate, enddate[, exclude][, includeStartDate]"
author: Isaac Dealey
authorEmail: info@turnkey.to
version: 1
cfVersion: CF5
shortDescription: Returns the number of specific days between a start and end date - i.e. weekdays or workdays.
description: |
 Returns the number of days between a start and end date, excluding a specified list of days, i.e. the number of tuesdays and thursdays - this UDF relies on formula instead of brute force to calculate the days and will perform better than other WeekDays/BusinessDays methods which loop from the start date to end date

returnValue: Returns a number.

example: |
 <cfset BusinessDaysThisMonth = countArbitraryDays(CreateDate(year(now()),month(now()),1),CreateDate(year(now()),month(now()),daysinmonth(now())))>

args:
 - name: startdate
   desc: Starting date.
   req: true
 - name: enddate
   desc: Ending date.
   req: true
 - name: exclude
   desc: Days of the week (as a number) to include. Defaults to 1,7
   req: false
 - name: includeStartDate
   desc: Boolean value to indicate if startdate is included in count. Defaults to true.
   req: false


javaDoc: |
 /**
  * Returns the number of specific days between a start and end date - i.e. weekdays or workdays.
  * 
  * @param startdate      Starting date. (Required)
  * @param enddate      Ending date. (Required)
  * @param exclude      Days of the week (as a number) to include. Defaults to 1,7 (Optional)
  * @param includeStartDate      Boolean value to indicate if startdate is included in count. Defaults to true. (Optional)
  * @return Returns a number. 
  * @author Isaac Dealey (info@turnkey.to) 
  * @version 1, December 5, 2006 
  */

code: |
 function countArbitraryDays(startdate,enddate) { 
     var exclude = "1,7"; var IncludeStartDate = true; 
     var daysperweek = 0; var days = 0; 
     var weekday = ArrayNew(1); var x = 0; 
     var maxdays = DateDiff("d",dateadd("d",-1,startdate),enddate); 
     
     switch (arrayLen(arguments)) { 
         case 4: { IncludeStartDate = arguments[4]; } 
         case 3: { exclude = arguments[3]; } 
     } 
     
     // create an array to hold days of the week with 1 or 0 indicating if the day is counted 
     arraySet(weekday,1,7,1); exclude = listToArray(exclude); 
     for (x = 1; x lte arrayLen(exclude); x = x + 1) { weekday[exclude[x]] = 0; } // set the value of any excluded day to 0 
     daysperweek = arraySum(weekday); // count the number of included days in a full week 
     days = daysperweek * int(maxdays/7); // get the number of included days in all full weeks 
     for (x = 1; x lte maxdays mod 7; x = x + 1) { // add any remaining days in the last partial week 
         days = days + weekday[dayofweek(enddate)]; 
         enddate = dateadd("d",-1,enddate); 
     } 
     
     // if excluding the start date, remove the value that might have been added for the starting day 
     if (not includeStartDate) { days = days - weekday[dayofweek(startdate)]; } 
     
     return days; 
 }

---

