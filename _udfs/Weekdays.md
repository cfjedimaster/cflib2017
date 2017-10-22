---
layout: udf
title:  Weekdays
date:   2001-10-09T11:41:16.000Z
library: DateLib
argString: "date1, date2"
author: Dan Anderson
authorEmail: udf@sr77.com
version: 1
cfVersion: CF5
shortDescription: Returns the number of weekdays between two dates.
tagBased: false
description: |
 Returns the number of weekdays between two dates.

returnValue: Returns a numeric value.

example: |
 <CFSET date1="January 1, 2001">
 <CFSET date2="12/31/01">
 <CFOUTPUT>
 Weekdays between #Date1# and #Date2# = 
 #weekdays("1/1/01","12/31/01")# 
 </CFOUTPUT>

args:
 - name: date1
   desc: Start date for the date range.  Can take any valid CF date format.
   req: true
 - name: date2
   desc: End date for the date range.  Can take any valid CF date format.
   req: true


javaDoc: |
 /**
  * Returns the number of weekdays between two dates.
  * 
  * @param date1      Start date for the date range.  Can take any valid CF date format. 
  * @param date2      End date for the date range.  Can take any valid CF date format. 
  * @return Returns a numeric value. 
  * @author Dan Anderson (udf@sr77.com) 
  * @version 1.0, October 9, 2001 
  */

code: |
 function weekdays(date1,date2){
   //initialize variables
   var wday=0;
   var day=0;
   var numdays=0;
   
   //get total number of days in between days and save it in numdays
   numdays=datediff("d",date1,date2);
   //loop through all the days between the dates.
   for (day=0; day lte numdays; day=day+1){
   
    if(dayofweek(dateadd("d",day,date1)) neq 1 and dayofweek(dateadd("d",day,date1)) neq 7){
    //if the day is neither saturday or sunday add a week day.
    wday=wday+1;}
   } 
  return wday;
  }

---

