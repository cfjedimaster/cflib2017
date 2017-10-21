---
layout: udf
title:  KtsToMph
date:   2001-09-10T13:14:45.000Z
library: ScienceLib
argString: "knots"
author: Joshua Licht
authorEmail: jlicht5@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Converts Knots to Mile Per Hour.
description: |
 Converts Knots to Miles Per Hour.  Knots are a unit of speed, not distance.

returnValue: Returns a numeric value.

example: |
 <CFSET kts=20>
 <CFOUTPUT>
 Given kt=#kts#<BR>
 #kts# Knots = #KtsToMph(kts)# Miles Per Hour. <br>
 </CFOUTPUT>

args:
 - name: knots
   desc: Number of knots you want to convert to miles per hour.
   req: true


javaDoc: |
 /**
  * Converts Knots to Mile Per Hour.
  * 
  * @param knots      Number of knots you want to convert to miles per hour. 
  * @return Returns a numeric value. 
  * @author Joshua Licht (jlicht5@hotmail.com) 
  * @version 1.0, September 10, 2001 
  */

code: |
 function KtsToMph(knots)
 {
   Return Knots * 1.15;
 }

---

