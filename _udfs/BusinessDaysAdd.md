---
layout: udf
title:  BusinessDaysAdd
date:   2005-08-10T12:35:16.000Z
library: DateLib
argString: "date, number"
author: Billy Cravens
authorEmail: billy@architechx.com
version: 2
cfVersion: CF5
shortDescription: Works just like dateAdd(), except it only adds business days
description: |
 Allows you to only add business days to a date (in other words, it ignores weekends).  Unlike dateAdd(), it only works with days.

returnValue: Returns a date object.

example: |
 <cfoutput>
 Start date: #DateFormat(Now(), 'dddd mmmm dd, yyyy')#<br>
 Minus 10 business days: #DateFormat(BusinessDaysAdd(Now(), -10), 'dddd mmmm dd, yyyy')#<br>
 Minus 5 business days: #DateFormat(BusinessDaysAdd(Now(), -5), 'dddd mmmm dd, yyyy')#<br>
 Minus 3 business days: #DateFormat(BusinessDaysAdd(Now(), -3), 'dddd mmmm dd, yyyy')#<br>
 Minus 2 business days: #DateFormat(BusinessDaysAdd(Now(), -2), 'dddd mmmm dd, yyyy')#<br>
 Minus 1 business day : #DateFormat(BusinessDaysAdd(Now(), -1), 'dddd mmmm dd, yyyy')#<br>
 Plus 1 business day : #DateFormat(BusinessDaysAdd(Now(), 1), 'dddd mmmm dd, yyyy')#<br>
 Plus 2 business days: #DateFormat(BusinessDaysAdd(Now(), 2), 'dddd mmmm dd, yyyy')#<br>
 Plus 3 business days: #DateFormat(BusinessDaysAdd(Now(), 3), 'dddd mmmm dd, yyyy')#<br>
 Plus 5 business days: #DateFormat(BusinessDaysAdd(Now(), 5), 'dddd mmmm dd, yyyy')#<br>
 Plus 10 business days: #DateFormat(BusinessDaysAdd(Now(), 10), 'dddd mmmm dd, yyyy')#<br>
 </cfoutput>

args:
 - name: date
   desc: Date you want to add business days to.
   req: true
 - name: number
   desc: Number of business days to add to date.
   req: true


javaDoc: |
 /**
  * Works just like dateAdd(), except it only adds business days
  * Version 2 by Steven Van Gemert, svg2@placs.net
  * 
  * @param date      Date you want to add business days to. (Required)
  * @param number      Number of business days to add to date. (Required)
  * @return Returns a date object. 
  * @author Billy Cravens (billy@architechx.com) 
  * @version 2, August 10, 2005 
  */

code: |
 function businessDaysAdd(date,number) {
   var cAdded = 0;
   var tempDate = date;
   var direction = compare(number,0);
   while (cAdded LT abs(number)) {
     tempDate = dateAdd("d",direction,tempDate);
     if (dayOfWeek(tempDate) GTE 2 AND dayOfWeek(tempDate) LTE 6) {
       cAdded = incrementValue(cAdded);
     }
   }
   return tempDate;
 }

---

