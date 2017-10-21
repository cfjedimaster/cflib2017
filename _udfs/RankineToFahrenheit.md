---
layout: udf
title:  RankineToFahrenheit
date:   2001-09-17T16:17:25.000Z
library: ScienceLib
argString: "rankine"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Rankine to degrees Fahrenheit.
description: |
 Converts degrees Rankine to degrees Fahrenheit.  Note that the Rankine temperature scale has an absolute zero (negative Rankine temperatures do not exist).  If a temperature below 0 Rankine (absolute 0) is passed, the funciton will return an invalid result.

returnValue: Returns a float.

example: |
 <CFSET r=0>
 <CFOUTPUT>
 Given r=#r#<BR>
 #r# degrees Rankine = #RankineToFahrenheit(r)# degrees Fahrenheit.
 </CFOUTPUT>

args:
 - name: rankine
   desc: Degrees Rankine you want converted to degrees Fahrenheit.
   req: true


javaDoc: |
 /**
  * Converts degrees Rankine to degrees Fahrenheit.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param rankine      Degrees Rankine you want converted to degrees Fahrenheit. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1, September 17, 2001 
  */

code: |
 function RankineToFahrenheit(rankine)
 {
   Return rankine-459.67;
 }

---

