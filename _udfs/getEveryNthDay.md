---
layout: udf
title:  getEveryNthDay
date:   2006-03-30T13:18:41.000Z
library: DateLib
argString: "dow, nth, yy"
author: charlie griefer
authorEmail: charlie@griefer.com
version: 1
cfVersion: CF5
shortDescription: determine every nth day of week for a given year.
description: |
 returns an array of dates.  dates are every nth day of week (e.g. every 2nd tuesday) for a given year.

returnValue: Returns an array.

example: |
 3rd friday of each month (friday = 6):
 <br /><br />
 
 <cfdump var="#getEveryNthDay(6, 3, 2006)#">

args:
 - name: dow
   desc: The numeric day of the week.
   req: true
 - name: nth
   desc: Week number in the month.
   req: true
 - name: yy
   desc: Year to iterate over.
   req: true


javaDoc: |
 /**
  * determine every nth day of week for a given year.
  * 
  * @param dow      The numeric day of the week. (Required)
  * @param nth      Week number in the month. (Required)
  * @param yy      Year to iterate over. (Required)
  * @return Returns an array. 
  * @author charlie griefer (charlie@griefer.com) 
  * @version 1, March 30, 2006 
  */

code: |
 function getEveryNthDay(dow,nth,yy) {
     var containerArray = arrayNew(1);
     
     var mm             = "";
     var dd             = "";
     var startDate    = "";
     var dateFound    = 0;
     
     if (val(dow) LT 1 OR val(dow) GT 7) return false;
     
     for (mm=1; mm LTE 12; mm=mm+1) {
         dateFound = 0;
         for (dd=1; dd LTE daysInMonth(createDate(yy, mm, 1)); dd=dd+1) {
             startDate = createDate(yy, mm, dd);
             if (dayOfWeek(startDate) EQ dow) {
                 dateFound = dateFound + 1;
                 if (dateFound EQ nth) arrayAppend(containerArray, startDate);
             }
         }
     }
     
     return containerArray;
 }

---

