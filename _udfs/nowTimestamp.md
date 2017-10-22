---
layout: udf
title:  nowTimestamp
date:   2008-04-25T16:40:31.000Z
library: DateLib
argString: ""
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF6
shortDescription: Returns current time from year to milliscend in a purely numerical format.
tagBased: false
description: |
 Returns current time in human-readable yet purely numeric format, that format being YYYYMMDDHHMMSSLLL 
 
 YYYY=4-digit year
 MM=2-digit month
 DD=2-digit day
 HH=2-digit hour (24 hour format)
 MM=2-digit minute
 SS=2-digt second
 LLL=3-digit milisecond 
 
 This is useful when you want a string that will alpha-sort by date, or when you want an easy-to-read or at least easy-to-parse timestamp as part of a filename. 
 
 For example, 20080227154829957 is February 27, 2008, at 3:48 pm and 29.957 milliseconds.

returnValue: Numeric

example: |
 Right now is #nowTimestamp()#

args:


javaDoc: |
 /**
  * Returns current time from year to milliscend in a purely numerical format.
  * 
  * @return Numeric 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, April 25, 2008 
  */

code: |
 function nowTimestamp() {
    return dateformat(now(),"yyyymmdd") & timeformat(now(),"HHmmssL");
 }

---

