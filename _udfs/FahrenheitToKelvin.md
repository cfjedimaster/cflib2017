---
layout: udf
title:  FahrenheitToKelvin
date:   2001-09-17T15:21:09.000Z
library: ScienceLib
argString: "fahrenheit"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Fahrenheit to Degrees Kelvin.
description: |
 Converts degrees Fahrenheit to Degrees Kelvin.  Note that the Kelvin temperature scale has an absolute zero (negative Kelvin temperatures do not exist).  If a temperature below -459.67 Fahrenheit (absolute 0) is passed, the funciton returns -1.

returnValue: Returns a float.

example: |
 <CFSET f=212>
 <CFOUTPUT>
 Given f=#f#<BR>
 #f# degrees Fahrenheit = #FahrenheitToKelvin(f)# degrees Kelvin.
 </CFOUTPUT>

args:
 - name: fahrenheit
   desc: Degrees fahrenheit you want converted to degrees Kelvin.
   req: true


javaDoc: |
 /**
  * Converts degrees Fahrenheit to Degrees Kelvin.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param fahrenheit      Degrees fahrenheit you want converted to degrees Kelvin. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1.0, September 17, 2001 
  */

code: |
 function FahrenheitToKelvin(fahrenheit)
 {
   if (fahrenheit lt -459.67)
     Return -1;
   else
     Return (fahrenheit + 459.67)/1.8;
 }

---

