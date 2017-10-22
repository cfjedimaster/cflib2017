---
layout: udf
title:  DegToRad
date:   2001-07-18T13:03:05.000Z
library: MathLib
argString: "degrees"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts degrees to radians.
tagBased: false
description: |
 Converts degrees to radians.

returnValue: Returns a simple value

example: |
 <CFSET n=45>
   <CFOUTPUT>
   Given n=#n#
   #n# degrees = #DegToRad(n)# radians
   </CFOUTPUT>

args:
 - name: degrees
   desc: Angle (in degrees) you want converted to radians.
   req: true


javaDoc: |
 /**
  * Converts degrees to radians.
  * 
  * @param degrees      Angle (in degrees) you want converted to radians. 
  * @return Returns a simple value 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function DegToRad(degrees)
 {
   Return (degrees*(Pi()/180));
 }

---

