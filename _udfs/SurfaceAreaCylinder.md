---
layout: udf
title:  SurfaceAreaCylinder
date:   2001-07-18T18:30:28.000Z
library: MathLib
argString: "radius, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the surface area of a cylinder.
description: |
 Calculates the surface area of a cylinder.

returnValue: Returns a simple value.

example: |
 <CFSET radius=4>
   <CFSET height=8>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>radius=#radius#
   <LI>height=#height#
   </UL>
   The surface area of the cylinder is #SurfaceAreaCylinder(radius,height)#
   </CFOUTPUT>

args:
 - name: radius
   desc: 1/2 the diameter of a cross-section of the cylinder.
   req: true
 - name: height
   desc: Height of the cylinder from base to base.
   req: true


javaDoc: |
 /**
  * Calculates the surface area of a cylinder.
  * 
  * @param radius      1/2 the diameter of a cross-section of the cylinder. 
  * @param height      Height of the cylinder from base to base. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function SurfaceAreaCylinder(radius, height)
 {
   Return ((2 * pi() * radius^2) + (2 * Pi() * radius * height));
 }

---

