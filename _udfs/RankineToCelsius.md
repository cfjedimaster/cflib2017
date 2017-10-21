---
layout: udf
title:  RankineToCelsius
date:   2001-09-17T16:12:35.000Z
library: ScienceLib
argString: "rankine"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Rankine to degrees Celsius.
description: |
 Converts degrees Rankine to degrees Celsius.  Note that the Rankine temperature scale has an absolute zero (negative Rankine temperatures do not exist).  If a temperature below 0 Rankine (absolute 0) is passed, the funciton will return an invalid result.

returnValue: Returns a float.

example: |
 <CFSET r=0>
 <CFOUTPUT>
 Given r=#r#<BR>
 #r# degrees Rankine = #RankineToCelsius(r)# degrees Celsius.
 </CFOUTPUT>

args:
 - name: rankine
   desc: Degrees Rankine you want converted to degrees Celsius
   req: true


javaDoc: |
 /**
  * Converts degrees Rankine to degrees Celsius.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param rankine      Degrees Rankine you want converted to degrees Celsius 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1.0, September 17, 2001 
  */

code: |
 function RankineToCelsius(rankine)
 {
   Return (rankine-491.67)/1.8;
 }

---

