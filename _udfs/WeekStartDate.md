---
layout: udf
title:  WeekStartDate
date:   2002-03-19T19:57:45.000Z
library: DateLib
argString: "weekNum, weekYear[, ISOFormat]"
author: David Murphy
authorEmail: dmurphy52@lycos.com
version: 1
cfVersion: CF5
shortDescription: Takes a week number and returns a date object of the first day of that week.
tagBased: false
description: |
 Takes a week number and returns a date object of the first day of that week. This can be useful if you want to display an actual date that can be easily understood by a person as opposed to a week number. By default, Sunday is considered the first day of the week. If you pass the optional ISOFormat argument, you can set Monday as the first day of the week.

returnValue: Returns a date object.

example: |
 <cfoutput>
 This data was aquired the week of #dateFormat(weekStartDate(12,2002),"mm/dd/yyyy")#
 </cfoutput>

args:
 - name: weekNum
   desc: The week number.
   req: true
 - name: weekYear
   desc: The year.
   req: true
 - name: ISOFormat
   desc: Use ISO for first day of week. Defaults to false.
   req: false


javaDoc: |
 /**
  * Takes a week number and returns a date object of the first day of that week.
  * Added ISOFormat, RCamden, 3/19/2002
  * 
  * @param weekNum      The week number. 
  * @param weekYear      The year. 
  * @param ISOFormat      Use ISO for first day of week. Defaults to false. 
  * @return Returns a date object. 
  * @author David Murphy (dmurphy52@lycos.com) 
  * @version 1, March 19, 2002 
  */

code: |
 function weekStartDate(weekNum,weekYear) {
     var weekDate = dateAdd("WW",weekNum-1,"1/1/" & weekYear);
     var toDay1 = dayofweek(weekDate)-1;
     var weekStartDate = dateAdd("d",-toDay1,weekDate);
     if(arrayLen(arguments) gte 3 and arguments[3]) weekStartDate = dateAdd("d",1,weekStartDate);
     return weekStartDate;    
  }

oldId: 543
---

