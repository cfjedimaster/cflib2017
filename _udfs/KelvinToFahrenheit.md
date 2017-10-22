---
layout: udf
title:  KelvinToFahrenheit
date:   2001-09-17T15:48:03.000Z
library: ScienceLib
argString: "kelvin"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Kelvin to degrees Fahrenheit.
tagBased: false
description: |
 Converts degrees Kelvin to degrees Fahrenheit.   Note that the Kelvin temperature scale has an absolute zero (negative Kelvin temperatures do not exist).  If a temperature below 0 Kelvin (absolute 0) is passed, the funciton will return an invalid result.

returnValue: Returns a float.

example: |
 <CFSET k=0>
 <CFOUTPUT>
 Given k=#k#<BR>
 #k# degrees Kelvin = #KelvinToFahrenheit(k)# degrees Fahrenheit.
 </CFOUTPUT>

args:
 - name: kelvin
   desc: Degrees Kelvin you want converted to Degrees Fahrenheit.
   req: true


javaDoc: |
 /**
  * Converts degrees Kelvin to degrees Fahrenheit.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param kelvin      Degrees Kelvin you want converted to Degrees Fahrenheit. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1.0, September 17, 2001 
  */

code: |
 function KelvinToFahrenheit(kelvin)
 {
   Return (kelvin*1.8)-459.67;
 }

---

