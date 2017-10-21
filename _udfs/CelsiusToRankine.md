---
layout: udf
title:  CelsiusToRankine
date:   2001-09-17T15:30:56.000Z
library: ScienceLib
argString: "celsius"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Celsius to degrees Rankine.
description: |
 Converts degrees Celsius to degrees Rankine.  Note that the Rankine temperature scale has an absolute zero (negative Rankine temperatures do not exist).  If a temperature below -273.15 Celcius (absolute 0) is passed, the funciton returns -1.

returnValue: Returns a float.

example: |
 <CFSET c=100>
 <CFOUTPUT>
 Given c=#c#<BR>
 #c# degrees Celsius = #CelsiusToRankine(c)# degrees Rankine.
 </CFOUTPUT>

args:
 - name: celsius
   desc: Degrees Celsius you want converted to degrees Rankine.
   req: true


javaDoc: |
 /**
  * Converts degrees Celsius to degrees Rankine.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param celsius      Degrees Celsius you want converted to degrees Rankine. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1, September 17, 2001 
  */

code: |
 function CelsiusToRankine(celsius)
 {
   if (celsius lt -273.15)
     return -1;
   else
     return (celsius*1.8)+491.67;
 }

---

