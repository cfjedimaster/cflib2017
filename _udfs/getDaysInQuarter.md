---
layout: udf
title:  getDaysInQuarter
date:   2015-11-13T12:18:36.000Z
library: DateLib
argString: ""
author: Sebastiaan Naafs - van Dijk
authorEmail: sebastiaan@onlinebase.nl
version: 1
cfVersion: CF5
shortDescription: Returns the number of days in the current quarter.
tagBased: false
description: |
 Returns the number of days in the current quarter.

returnValue: Returns a number.

example: |
 writeoutput("Days in this quarter: " & getDaysInQuarter());

args:


javaDoc: |
 /**
  * Returns the number of days in the current quarter.
  * 
  * @return Returns a number. 
  * @author Sebastiaan Naafs - van Dijk (sebastiaan@onlinebase.nl) 
  * @version 1, November 13, 2015 
  */

code: |
 function getDaysInQuarter() {
     var firstDayOfQuarter = createDate(year(now()),(quarter(now())-1)*3 + 1,1);
     var lastDayOfQuarter = dateAdd("d",-1,dateAdd("m",3,firstDayOfQuarter));
     return dateDiff("d",firstDayOfQuarter,lastDayOfQuarter) + 1;
 }

oldId: getDaysinQuarter
---

