---
layout: udf
title:  RankineToKelvin
date:   2001-09-17T16:22:33.000Z
library: ScienceLib
argString: "rankine"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Rankine to degrees Kelvin.
tagBased: false
description: |
 Converts degrees Rankine to degrees Kelvin.  Note that the Rankine and Kelvin temperature scales have an absolute zero (negative Rankine and Kelvin temperatures do not exist).  If a temperature below 0 Rankine (absolute 0) is passed, the funciton will return an invalid result.

returnValue: Returns a float.

example: |
 <CFSET r=671.67>
 <CFOUTPUT>
 Given r=#r#<BR>
 #r# degrees Rankine = #RankineToKelvin(r)# degrees Kelvin.
 </CFOUTPUT>

args:
 - name: rankine
   desc: Degrees Rankine you want converted to degrees Kelvin.
   req: true


javaDoc: |
 /**
  * Converts degrees Rankine to degrees Kelvin.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param rankine      Degrees Rankine you want converted to degrees Kelvin. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1.0, September 17, 2001 
  */

code: |
 function RankineToKelvin(rankine)
 {
   Return rankine/1.8;
 }

oldId: 275
---

