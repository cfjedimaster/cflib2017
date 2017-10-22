---
layout: udf
title:  AreaCircle
date:   2001-07-17T13:24:13.000Z
library: MathLib
argString: "radius"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of a circle.
tagBased: false
description: |
 Calculates the area of a circle based on the radius.

returnValue: Returns the area of the circle

example: |
 <CFSET r=12>
   <CFOUTPUT>
   Given r=#r#
   The area of the circle is #AreaCircle(r)#
   </CFOUTPUT>

args:
 - name: radius
   desc: 1/2 the diameter of the circle
   req: true


javaDoc: |
 /**
  * Calculates the area of a circle.
  * 
  * @param radius      1/2 the diameter of the circle 
  * @return Returns the area of the circle 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function AreaCircle(radius)
 {
   Return (Pi()*(radius^2));
 }

---

