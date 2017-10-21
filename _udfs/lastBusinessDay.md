---
layout: udf
title:  lastBusinessDay
date:   2003-05-13T16:41:13.000Z
library: DateLib
argString: "strMonth[, strYear]"
author: Sravan K Erukulla
authorEmail: erukulla@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Returns a date object representing the last Business day of the given month
description: |
 The purpose of this script is to get the last business day of any given month and year. Year is optional.

returnValue: Returns a date object.

example: |
 <cfset month = 11>
 <cfset year = 2003>
 
 <cfoutput>
 Last business day of the month 11/2003 is: 
 #DateFormat(LastBusinessDayOfMonth(month,year), "dddd mmm dd, yyyy")#
 </cfoutput>

args:
 - name: strMonth
   desc: Month number. Should range from 1 to 12.
   req: true
 - name: strYear
   desc: Year. Defaults to this year.
   req: false


javaDoc: |
 /**
  * Returns a date object representing the last Business day of the given month
  * 
  * @param strMonth      Month number. Should range from 1 to 12. (Required)
  * @param strYear      Year. Defaults to this year. (Optional)
  * @return Returns a date object. 
  * @author Sravan K Erukulla (erukulla@yahoo.com) 
  * @version 1, May 13, 2003 
  */

code: |
 function LastBusinessDayOfMonth(strMonth) {
     var strYear=Year(Now());
     var busDay = false;
     var tempDate = "";
 
     if (ArrayLen(Arguments) gt 1) strYear=Arguments[2];
 
     tempDate = DateAdd("d", -1, DateAdd("m", 1, CreateDate(strYear, strMonth, 1)));
     
     while (busDay eq false) {
           
            if (dayOfWeek(tempDate) GTE 2 AND dayOfWeek(tempDate) LTE 6) return tempDate;
           else {
               tempDate = DateAdd("d",-1,tempDate);
             busDay = false;
           }
     }
     
 }

---

