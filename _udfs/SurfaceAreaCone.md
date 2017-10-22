---
layout: udf
title:  SurfaceAreaCone
date:   2001-07-18T16:01:44.000Z
library: MathLib
argString: "radius, slant"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the surface area of a cone.
tagBased: false
description: |
 Calculates the surface area of a cone based on the radius of the base and the height.

returnValue: Returns a simple value.

example: |
 <CFSET radius=4>
   <CFSET slant=8>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>radius=#radius#
   <LI>slant=#slant#
   </UL>
   The surface area of the cone is #SurfaceAreaCone(radius,slant)#
   </CFOUTPUT>

args:
 - name: radius
   desc: 1/2 the diameter of the base of the cone.
   req: true
 - name: slant
   desc: The height of the slant.
   req: true


javaDoc: |
 /**
  * Calculates the surface area of a cone.
  * 
  * @param radius      1/2 the diameter of the base of the cone. 
  * @param slant      The height of the slant. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function SurfaceAreaCone(radius, slant)
 {
   Return ((Pi() * radius^2) + (Pi() * radius * slant));
 }

---

