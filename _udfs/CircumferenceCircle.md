---
layout: udf
title:  CircumferenceCircle
date:   2001-07-17T14:04:22.000Z
library: MathLib
argString: "radius"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the circumference of a circle
description: |
 Calculates the circumference of a circle based on the radius.

returnValue: Returns a simple value

example: |
 <CFSET radius=4>
   <CFOUTPUT>
   Given: radius = #radius#
   The circumference of the circle is #CircumferenceCircle(radius)#
   </CFOUTPUT>

args:
 - name: radius
   desc: 1/2 the diameter of the circle.
   req: true


javaDoc: |
 /**
  * Calculates the circumference of a circle
  * 
  * @param radius      1/2 the diameter of the circle. 
  * @return Returns a simple value 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function CircumferenceCircle(radius)
 {
   Return (2*PI()*radius);
 }

---

