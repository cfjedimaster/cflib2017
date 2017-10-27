---
layout: udf
title:  Percentage
date:   2001-09-06T10:28:29.000Z
library: MathLib
argString: "value, maximum"
author: Jennifer Larkin
authorEmail: mr_urc@drule.org
version: 1
cfVersion: CF5
shortDescription: Returns the percentage of value out of maximum.
tagBased: false
description: |
 Divides value by maximum, multiplies the result by 100, and returns the percenage. Returns repeating decimals to ten decimal places.

returnValue: Returns the percentage.

example: |
 <cfoutput>
 Your score is #Round(percentage(1,3))# %.
 </cfoutput>

args:
 - name: value
   desc: The value.
   req: true
 - name: maximum
   desc: The maximum value.
   req: true


javaDoc: |
 /**
  * Returns the percentage of value out of maximum.
  * 
  * @param value      The value. 
  * @param maximum      The maximum value. 
  * @return Returns the percentage. 
  * @author Jennifer Larkin (mr_urc@drule.org) 
  * @version 1, September 6, 2001 
  */

code: |
 function percentage(Value,Maximum) {
   return ((Value/Maximum)*100);
 }

oldId: 250
---

