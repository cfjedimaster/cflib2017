---
layout: udf
title:  KelvinToRankine
date:   2001-09-17T15:52:40.000Z
library: ScienceLib
argString: "kelvin"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees Kelvin to degrees Rankine.
description: |
 Converts degrees Kelvin to degrees Rankine.Note that both the Kelvin and Rankine temperature scales have an absolute zero (negative Kelvin and Rankine temperatures do not exist).  If a temperature below 0 Kelvin (absolute 0) is passed, the funciton will return an invalid result.

returnValue: Returns a float.

example: |
 <CFSET k=100>
 <CFOUTPUT>
 Given k=#k#<BR>
 #k# degrees Kelvin = #KelvinToRankine(k)# degrees Rankine.
 </CFOUTPUT>

args:
 - name: kelvin
   desc: Degrees Kelvin you want converted to degrees Rankine.
   req: true


javaDoc: |
 /**
  * Converts degrees Kelvin to degrees Rankine.
  * Minor enhancements by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param kelvin      Degrees Kelvin you want converted to degrees Rankine. 
  * @return Returns a float. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 1.0, September 17, 2001 
  */

code: |
 function KelvinToRankine(kelvin)
 {
   Return kelvin*1.8;
 }

---

