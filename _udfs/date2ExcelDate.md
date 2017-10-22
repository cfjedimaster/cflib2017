---
layout: udf
title:  date2ExcelDate
date:   2016-05-05T06:18:36.000Z
library: DateLib
argString: "dateString"
author: Kevin Cotton
authorEmail: senatorcotton@gmail.com
version: 1
cfVersion: CF6
shortDescription: Return a date number for Excel columns.
tagBased: false
description: |
 Return the 'Date' format that Excel demands which is, in fact, a numeric representation of a date created by the difference in the number of days, between the date in question and Dec. 31, 1899

returnValue: Returns a number.

example: |
 <cfoutput>#date2ExcelDate(now())#</cfoutput>

args:
 - name: dateString
   desc: Date to format
   req: true


javaDoc: |
 

code: |
 function date2ExcelDate(dateString) {
     var rtrnString = '';
     if(isDate(dateString)) {
         return dateDiff("d", createDate( 1899,12,30 ), dateString);
     };
                 
     return rtrnString;
 };

---

