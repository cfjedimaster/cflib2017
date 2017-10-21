---
layout: udf
title:  MphToKts
date:   2001-09-10T13:19:02.000Z
library: ScienceLib
argString: "mph"
author: Joshua Licht
authorEmail: jlicht5@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Converts Miles Per Hour to Knots.
description: |
 Converts Miles Per Hour to Knots.  Knots are a unit of speed, not distance.

returnValue: Returns a numeric value.

example: |
 <CFSET mph=23>
 <CFOUTPUT>
 Given mph=#mph#<BR>
 #mph# Miles Per Hour = #MphToKts(mph)# Knots Per Hour. <br>
 </CFOUTPUT>

args:
 - name: mph
   desc: Miles per hour you want converted to knots.
   req: true


javaDoc: |
 /**
  * Converts Miles Per Hour to Knots.
  * 
  * @param mph      Miles per hour you want converted to knots. 
  * @return Returns a numeric value. 
  * @author Joshua Licht (jlicht5@hotmail.com) 
  * @version 1.0, September 10, 2001 
  */

code: |
 function MphToKts(mph)
 {
   Return MPH / 1.15;
 }

---

