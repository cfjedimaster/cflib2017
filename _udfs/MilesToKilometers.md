---
layout: udf
title:  MilesToKilometers
date:   2001-09-17T12:22:49.000Z
library: ScienceLib
argString: "miles"
author: Joshua Licht
authorEmail: jlicht5@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Converts miles to kilometers.
description: |
 Converts miles to kilometers.

returnValue: Returns a numeric value.

example: |
 <CFSET m=31.9>
 <CFOUTPUT>
 Given m=#m#<BR>
 #m# miles = #MilesToKilometer(M)# kilometers.
 </CFOUTPUT>

args:
 - name: miles
   desc: The number of miles you want converted to kilometers.
   req: true


javaDoc: |
 /**
  * Converts miles to kilometers.
  * 
  * @param miles      The number of miles you want converted to kilometers. 
  * @return Returns a numeric value. 
  * @author Joshua Licht (jlicht5@hotmail.com) 
  * @version 1.0, September 17, 2001 
  */

code: |
 function MilesToKilometer(Miles)
 {
   Return Miles * 1.609;
 }

---

