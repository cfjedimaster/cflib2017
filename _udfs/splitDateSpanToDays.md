---
layout: udf
title:  splitDateSpanToDays
date:   2010-03-18T17:44:48.000Z
library: DateLib
argString: "spanStart, spanEnd"
author: Rodion Bykov
authorEmail: rodionbykov@gmail.com
version: 0
cfVersion: CF5
shortDescription: Splits date span to array of days (periods)
description: |
 Function splits date span into array of periods (smaller date spans), from first day to last day.

returnValue: Returns an array.

example: |
 <cfset spanStart = dateAdd("d", -2, Now()) />
 <cfset spanEnd = dateAdd("h", -2, Now()) />
 <cfset periods = splitDateSpanToDays(spanStart, spanEnd) />
 
 <cfdump var="#spanStart#" />
 <cfdump var="#spanEnd#" />
 <cfdump var="#periods#" />

args:
 - name: spanStart
   desc: Start date
   req: true
 - name: spanEnd
   desc: End date
   req: true


javaDoc: |
 /**
  * Splits date span to array of days (periods)
  * 
  * @param spanStart      Start date (Required)
  * @param spanEnd      End date (Required)
  * @return Returns an array. 
  * @author Rodion Bykov (rodionbykov@gmail.com) 
  * @version 0, March 18, 2010 
  */

code: |
 function splitDateSpanToDays(spanStart, spanEnd){
 
     var result = arrayNew(1);
     var period = structNew();
     var firstDayStart = now();
     var firstDay = arguments.spanStart;
     var firstDayEnd = createDateTime(year(firstDay), month(firstDay), day(firstDay), 23, 59, 59);
     var currentDay = now();
     var lastDayStart = now();
     var lastDay = arguments.spanEnd;
     var lastDayEnd = createDateTime(year(lastDay), month(lastDay), day(lastDay), 23, 59, 59);
     var daysBetween = 0;
     var i = 0;
     
     if (dayOfYear(firstDay) eq dayOfYear(lastDay)) {
         period = structNew();
         period.start = firstDay;
         period.end = lastDay;
         temp = arrayAppend(result, period);
     }else{
         firstDayStart = createDateTime(year(firstDay), month(firstDay), day(firstDay), 0, 0, 0);
         lastDayStart = createDateTime(year(lastDay), month(lastDay), day(lastDay), 0, 0, 0);
         daysBetween = dateDiff("d", firstDayStart, lastDayStart) - 1;
         
         period = structNew();
         period.start = firstDay;
         period.end = firstDayEnd;
         temp = arrayAppend(result, period);
         
         if (daysBetween gt 0) {
             for (i = 1; i lte daysBetween; i = i + 1) {
                 period = structNew();
                 currentDay = dateAdd("d", i, firstDayStart);
                 period.start = currentDay;
                 currentDay = dateAdd("d", i, firstDayEnd);
                 period.end = currentDay;
                 temp = arrayAppend(result, period);
             }
         }
         
         period = structNew();
         period.start = lastDayStart;
         period.end = lastDay;
         temp = arrayAppend(result, period);
         
     }
     
     return result;
 }

---

