---
layout: udf
title:  isUsefulDate
date:   2012-07-25T22:57:21.000Z
library: DateLib
argString: "date"
author: Alan McCollough
authorEmail: amccollough@anthc.org
version: 1
cfVersion: CF5
shortDescription: Tests if a date is valid, and within a century of today.
tagBased: false
description: |
 isUsefulDate() tests for valid dates, but also tests that the date is within a century of now. Why? Dates outside that range are probably fat-fingered so you have a year of &quot;201&quot; or &quot;20100&quot; instead of &quot;2010&quot;. Unless you are a historian or a futurist, you probably don't use dates beyond a hundred years of now; but if you do, feel free to increase the 100-year test in the UDF.

returnValue: Returns a boolean

example: |
 isUsefulDate("blah")=false
 isUsefulDate("9/14/201")=false
 isUsefulDate("9/14/2010")=true
 isUsefulDate("9/14/20100")=false

args:
 - name: date
   desc: The value to test
   req: true


javaDoc: |
 /**
  * Tests if a date is valid, and within a century of today.
  * version 1.0 by Alan McCollough
  * 
  * @param date      The value to test (Required)
  * @return Returns a boolean 
  * @author Alan McCollough (amccollough@anthc.org) 
  * @version 1, July 25, 2012 
  */

code: |
 function isUsefulDate(date){
     if(isDate(date)){
         if(abs(dateDiff("yyyy",date,now())) LTE 100)
             return true;
         else
             return false;
         }
     else
         return false;
 }

---

