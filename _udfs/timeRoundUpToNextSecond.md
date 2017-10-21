---
layout: udf
title:  timeRoundUpToNextSecond
date:   2009-05-10T02:29:10.000Z
library: DateLib
argString: "datetime"
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 0
cfVersion: CF5
shortDescription: corrects rounding errors for times brought in from Excel
description: |
 Correct for rounding error when working with datetimes brought into CF from Excel.

returnValue: returns a string

example: |
 timeFormat(39916.7083333,"hh:mm:ss") returns 04:59:59
 
 timeFormat(timeRoundUpToNextSecond(39916.7083333),"hh:mm:ss") returns 05:00:00

args:
 - name: datetime
   desc: datetime
   req: true


javaDoc: |
 /**
  * corrects rounding errors for times brought in from Excel
  * 
  * @param datetime      datetime (Required)
  * @return returns a string 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 0, May 9, 2009 
  */

code: |
 function timeRoundUpToNextSecond(datetime){
     // Declare our local variables
     var lDiff = 0;    
     
     // Correct for rounding error. If the milliseconds are something like .997,
     // I am asserting (assuming?) that the actual time is really the next second.
     // Why bother? I have Excel worksheets where the datetime is "4/13/09 17:00"
     // but when brought into CF via POI, it gets turned into "4/13/09 16:59:59"
     
     if(datePart("l", datetime) gte 997)
         {
         lDiff = 1000 - datePart("l", datetime);
         lDiff = lDiff / 1000;
         lDiff = lDiff + 1;
         datetime = dateAdd("s",lDiff,datetime); 
     };
 
     return datetime;
 }

---

