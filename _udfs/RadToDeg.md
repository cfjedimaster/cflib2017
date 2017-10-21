---
layout: udf
title:  RadToDeg
date:   2001-07-18T15:31:11.000Z
library: MathLib
argString: "radians"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts radians to degrees.
description: |
 Converts radians to degrees.

returnValue: Returns a simple value.

example: |
 <CFSET n=0.785398163397>
   <CFOUTPUT>
   Given n=#n#
   #n# radians = #RadToDeg(n)# degrees
   </CFOUTPUT>

args:
 - name: radians
   desc: Angle (in radians) you want converted to degrees.
   req: true


javaDoc: |
 /**
  * Converts radians to degrees.
  * 
  * @param radians      Angle (in radians) you want converted to degrees. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function RadToDeg(radians)
 {
   Return (radians*(180/Pi()));
 }

---

