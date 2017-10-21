---
layout: udf
title:  businessDaysBetween
date:   2008-04-10T17:54:00.000Z
library: DateLib
argString: "date1, date2"
author: Harry Goldman
authorEmail: harry@icn.net
version: 1
cfVersion: CF5
shortDescription: Calculates the number of business days between 2 dates.
description: |
 Calculates the number of business days between 2 dates.  Holidays are not excluded. This count does not include the first day. So if you compare today (and today is Monday) to tomorrow, then your result is the difference (1).

returnValue: Returns a number.

example: |
 <cfoutput>
 Number of work days between #DateFormat(CreateDate(2004,2,2),"dd-mmm-yyyy")# and #DateFormat(CreateDate(2004,2,10),"dd-mmm-yyyy")# is 
 #businessDaysBetween(CreateDate(2004,2,2),CreateDate(2004,2,10))# day(s).
 </cfoutput>

args:
 - name: date1
   desc: First date.
   req: true
 - name: date2
   desc: Second date.
   req: true


javaDoc: |
 /**
  * Calculates the number of business days between 2 dates.
  * 
  * @param date1      First date. (Required)
  * @param date2      Second date. (Required)
  * @return Returns a number. 
  * @author Harry Goldman (harry@icn.net) 
  * @version 1, April 10, 2008 
  */

code: |
 function businessDaysBetween(date1,date2) {
     var numberOfDays = 0;
     
     while (date1 LT date2) {
         date1 = dateAdd("d",1,date1);
         if(dayOfWeek(date1) GTE 2 AND dayOfWeek(date1) LTE 6) numberOfDays = incrementValue(numberOfDays);
     }
 
     return numberOfDays;
 }

---

