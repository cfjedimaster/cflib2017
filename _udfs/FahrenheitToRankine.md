---
layout: udf
title:  FahrenheitToRankine
date:   2001-09-17T15:21:48.000Z
library: ScienceLib
argString: "fahrenheit"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Fahrenheit to degrees Rankine.
tagBased: false
description: |
 Converts degrees Fahrenheit to degrees Rankine.  Note that the Rankine temperature scale has an absolute zero (negative Rankine temperatures do not exist).  If a temperature below -459.67 Fahrenheit (absolute 0) is passed, the funciton returns -1.

returnValue: Returns a float.

example: |
 <CFSET f=212>
 <CFOUTPUT>
 Given f=#f#<BR>
 #f# degrees Fahrenheit = #FahrenheitToRankine(f)# degrees Rankine.
 </CFOUTPUT>

args:
 - name: fahrenheit
   desc: Degrees Fahrenheit you want to convert to Rankine.
   req: true


javaDoc: |
 /**
  * Converts degrees Fahrenheit to degrees Rankine.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param fahrenheit      Degrees Fahrenheit you want to convert to Rankine. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1, September 17, 2001 
  */

code: |
 function FahrenheitToRankine(fahrenheit)
 {
   if (fahrenheit lt -459.67)
     return -1;
   else
     return fahrenheit + 459.67;
 }

---

