---
layout: udf
title:  countArbitraryDaysExcluding
date:   2010-03-03T17:21:43.000Z
library: DateLib
argString: "startDate, endDate[, exclude][, includeStartDate][, ignoreTimes][, excludeDates]"
author: Murray Hopkins
authorEmail: murray@murrah.com.au
version: 0
cfVersion: CF5
shortDescription: Returns the number of days between a start and end date, excluding a specified list of days, and allowing for an exclusion list
description: |
 Based on UDF countArbitraryDays(). Returns the number of days between a start and end date, excluding a specified list of days,e.g. exclude saturday and sunday. Optionally allows an array of dates to be excluded (eg public holidays). Since it is based on countArbitraryDays(), this UDF relies on formula instead of brute force to calculate the days and will perform better than other WeekDays/BusinessDays methods which loop from the start date to end date.

returnValue: returns a number

example: |
 holidays = arrayNew(1);
     holidays[1] = "YYYY-12-25"; // Dec 25 all years (Remember for your testing: this is a Sat in 2010 and Sun in 2011)
     holidays[2] = "YYYY-1-1";   // Jan 1 all years (is a Sat in 2011, Sun in 2012)
     holidays[3] = "2010-4-2";  // April 2, 2010 (Good friday) 
 
     date1 = CreateDateTime(2008,10,15,13,00,00);
     date2 = CreateDateTime(2011,2,1,6,00,00);
     
     days = countArbitraryDaysExcluding(date1,date2,"1,7",false,true,holidays); 
     
     writeOutput("#lsDateFormat(date1)# to #lsDateFormat(date2)# days=" & days);

args:
 - name: startDate
   desc: begin date for calculations
   req: true
 - name: endDate
   desc: end date for calculations
   req: true
 - name: exclude
   desc: days of week (1=sunday, etc.) to exclude from the count
   req: false
 - name: includeStartDate
   desc: boolean to include start date in count
   req: false
 - name: ignoreTimes
   desc: boolean to indicate if the times on the dates are to be ignored
   req: false
 - name: excludeDates
   desc: array containing simple string dates to exclude from the count
   req: false


javaDoc: |
 /**
  * Returns the number of days between a start and end date, excluding a specified list of days, and allowing for an exclusion list
  * 
  * @param startDate      begin date for calculations (Required)
  * @param endDate      end date for calculations (Required)
  * @param exclude      days of week (1=sunday, etc.) to exclude from the count (Optional)
  * @param includeStartDate      boolean to include start date in count (Optional)
  * @param ignoreTimes      boolean to indicate if the times on the dates are to be ignored (Optional)
  * @param excludeDates      array containing simple string dates to exclude from the count (Optional)
  * @return returns a number 
  * @author Murray Hopkins (murray@murrah.com.au) 
  * @version 0, March 3, 2010 
  */

code: |
 function countArbitraryDaysExcluding(startdate,enddate) {
 /*
 Example of use:
 
     holidays = arrayNew(1);
     holidays[1] = "YYYY-12-25"; // Dec 25 all years (Remember for your testing: this is a Sat in 2010 and Sun in 2011)
     holidays[2] = "YYYY-1-1";   // Jan 1 all years (is a Sat in 2011, Sun in 2012)
     holidays[3] = "2010-4-2";  // April 2, 2010 (Good friday) 
 
     date1 = CreateDateTime(2008,10,15,13,00,00);
     date2 = CreateDateTime(2011,2,1,6,00,00);
     
     days = countArbitraryDaysExcluding(date1,date2,"1,7",false,true,holidays); 
     
     writeOutput(", days=" & days);
     
 Note:
 includeStartDate - defaults to false so that if the startdate and enddate are the same the result will be 0, not 1
 
 ignoreTimes - CF date functions treat a day as 24 hours and this can cause unexpected results in your date calulations.
 eg the difference between today at 11pm and tomorrow at 6am is zero for dateDiff(). 
 But for this UDF we would generally expect 1 day's difference. Therefore, optionally, ignore the times (defults to true).
 
 */    
     var exclude = "1,7";
     var IncludeStartDate = false;
     var ignoreTimes = true;
     var excludeDates = arrayNew(1);
     var daysperweek = 0;
     var days = 0;
     var weekday = ArrayNew(1);
     var x = 0;
     var maxdays = 0;
     var tmpDate = 0;
     var dt = 0;
     var xdt = 0;
     var yr = 0;
      
     switch (arrayLen(arguments)) {
         case 6: { excludeDates = arguments[6]; }
         case 5: { ignoreTimes = arguments[5]; }
         case 4: { IncludeStartDate = arguments[4]; }
         case 3: { exclude = arguments[3]; }
     }
     
     // create an array to hold days of the week with 1 or 0 indicating if the day is counted
     arraySet(weekday,1,7,1); exclude = listToArray(exclude);
     for (x = 1; x lte arrayLen(exclude); x = x + 1) { weekday[exclude[x]] = 0; } // set the value of any excluded day to 0
     daysperweek = arraySum(weekday); // count the number of included days in a full week
  
      if (ignoreTimes){
          startdate = CreateDateTime(year(startdate),month(startdate),day(startdate),0,0,0);
          enddate = CreateDateTime(year(enddate),month(enddate),day(enddate),0,0,0);
      }
       
       maxdays = DateDiff("d",dateadd("d",-1,startdate),enddate);
      tmpDate = enddate;
      
     days = daysperweek * int(maxdays/7); // get the number of included days in all full weeks
     tmpDate = enddate;
     for (x = 1; x lte maxdays mod 7; x = x + 1) { // add any remaining days in the last partial week
         days = days + weekday[dayofweek(tmpDate)];
         tmpDate = dateadd("d",-1,tmpDate);
     }
     
                                     // if excluding the start date, remove the value that might have been added for the starting day
     if (not includeStartDate) { days = days - weekday[dayofweek(startdate)]; }
     
                                 // if there are any specific dates to exclude that we havent already 
                                 // excluded because of the day of week thay are on, decrement the count
     for (x=1; x lte arrayLen(excludeDates); x=x+1) {
                                 // masks MUST be in the form YYYY-mm-dd    where mm and dd are valid numeric values
                                 // I didnt want to put too much extra unnecessary validation in here! Although a good regEx would probably do!
         if (listFirst(excludeDates[x],'-') eq 'YYYY') {           
             for (yr = year(startdate); yr LTE year(enddate); yr=yr+1){
                                 // The mask has generated a date for the years in the date range we are counting
                                 // Add a new exclude date to the end of the array.
                                 // But dont bother if the day of week of the excluded date is being excluded anyway
                 dt = CreateDateTime( yr, listgetat(excludeDates[x],2,'-'), listgetat(excludeDates[x],3,'-'),0,0,0 );
                 if (weekday[dayofweek(dt)] eq 1) {
                     arrayAppend(excludeDates,dt);
                 }
             }
         } else {    
                if (isDate(excludeDates[x])) {
                    xdt = ParseDateTime(excludeDates[x]);
                  if (ignoreTimes){ xdt = CreateDateTime(year(xdt),month(xdt),day(xdt),0,0,0);}
                                      // If the excludeDate is GTE the start date AND LTE the end date (ie in inclusive range), 
                                      // AND it is a day of week to include,
                                      // then decrement the count         
                 if ( ((DateCompare(xdt, startdate) gt -1) AND (DateCompare(xdt, enddate) lt 1)) AND weekday[dayofweek(xdt)] eq 1) { 
                     days = days - 1; 
                 }
                }
         }
     }
     
     
     return days;
 }

---

