---
layout: udf
title:  AreaEllipse
date:   2001-07-17T13:24:42.000Z
library: MathLib
argString: "radius1, radius2"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of an ellipse.
description: |
 Calculates the area of an ellipse based on the vertical and horizontal radii.

returnValue: Returns the area of the ellipse.

example: |
 <CFSET radius1=4>
   <CFSET radius2=6>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>radius1=#radius1#
   <LI>radius2=#radius2#
   </UL>
   The area of the ellipse is #AreaEllipse(radius1, radius2)#
   </CFOUTPUT>

args:
 - name: radius1
   desc: The vertical radius
   req: true
 - name: radius2
   desc: The horizontal radius
   req: true


javaDoc: |
 /**
  * Calculates the area of an ellipse.
  * 
  * @param radius1      The vertical radius 
  * @param radius2      The horizontal radius 
  * @return Returns the area of the ellipse. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function AreaEllipse(r1, r2)
 {
   Return (pi() * r1 * r2);
 }

---

