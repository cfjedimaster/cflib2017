---
layout: udf
title:  KelvinToCelsius
date:   2001-09-17T15:46:41.000Z
library: ScienceLib
argString: "kelvin"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Kelvin to degrees Celsius.
description: |
 Converts degrees Kelvinto degrees Celsius.  Note that the Kelvin temperature scale has an absolute zero (negative Kelvin temperatures do not exist).  If a temperature below 0 Kelvin (absolute 0) is passed, the funciton will return an invalid result.

returnValue: Returns a float.

example: |
 <CFSET k=100>
 <CFOUTPUT>
 Given k=#k#<BR>
 #k# degrees Kelvin = #KelvinToCelsius(k)# degrees Celsius.
 </CFOUTPUT>

args:
 - name: kelvin
   desc: Degrees Kelvin you want converted.
   req: true


javaDoc: |
 /**
  * Converts degrees Kelvin to degrees Celsius.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param kelvin      Degrees Kelvin you want converted. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1, September 17, 2001 
  */

code: |
 function KelvinToCelsius(kelvin)
 {
   Return kelvin - 273.15;
 }

---

