---
layout: udf
title:  dailyBusinessReportDateRange
date:   2007-04-04T19:33:00.000Z
library: DateLib
argString: "dateIn"
author: Dharmesh Goel
authorEmail: drgoel@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a time range for a particular date from midnight to 11&#58;59&#58;59 the same day except for Monday.
description: |
 Returns a time range for a particular date from midnight to 11:59:59 the same day. If it is a Monday, the start date range begins from Saturday 12:00 AM till end of day Monday. This is helpful for reports run on business days. Usually a process runs 7 days a week early in the morning but a report is run manually only from Monday to Friday. So every day of the week except for Monday gets data for that day. On Monday, current days data as well as weekend's data are lumped together.

returnValue: Returns a string.

example: |
 Any day except Monday : <cfoutput>#dailyBusinessReportDateRange('10/24/2006')#</cfoutput><br>
 A Monday : <cfoutput>#dailyBusinessReportDateRange('10/23/2006')#</cfoutput><br>
 Current Date : <cfoutput>#dailyBusinessReportDateRange(Now())#</cfoutput><br>

args:
 - name: dateIn
   desc: Date value to use for range.
   req: true


javaDoc: |
 /**
  * Returns a time range for a particular date from midnight to 11:59:59 the same day except for Monday.
  * 
  * @param dateIn      Date value to use for range. (Required)
  * @return Returns a string. 
  * @author Dharmesh Goel (drgoel@yahoo.com) 
  * @version 1, April 4, 2007 
  */

code: |
 function dailyBusinessReportDateRange(dateIn) {
     var dateRange = "";
     var dateOut1 = "";
     var dateOut2 = "";
     
     dateIn = dateFormat(dateIn, 'MM/DD/YYYY');
     
     if(dayOfWeek(dateIn) EQ 2) {
         dateOut1 = dateAdd("d",-2,dateIn);
         dateOut2 = dateadd("s",-1,dateAdd("d",1,dateIn));
     } else {
         dateOut1 = dateAdd("d",0,dateIn);
         dateOut2 = dateadd("s",-1,dateAdd("d",1,dateIn));
     }
     dateRange = dateout1 & "," & dateOut2;
 
     return dateRange;
 }

---

