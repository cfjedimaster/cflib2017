---
layout: udf
title:  SurfaceAreaTorus
date:   2001-07-18T18:36:12.000Z
library: MathLib
argString: "MajorRadius, MinorRadius"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the surface area of a torus.
description: |
 Calculates the surface area of a torus (3D donut shape).

returnValue: Returns a simple value.

example: |
 <CFSET MajorRadius=12>
   <CFSET MinorRadius=3>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>MajorRadius=#MajorRadius#
   <LI>MinorRadius=#MinorRadius#
   </UL>
   The surface area of the torus is #SurfaceAreaTorus(MajorRadius, MinorRadius)#
   </CFOUTPUT>

args:
 - name: MajorRadius
   desc: 1/2 the diameter of the large circle.
   req: true
 - name: MinorRadius
   desc: 1/2 the diameter of a cross-section.
   req: true


javaDoc: |
 /**
  * Calculates the surface area of a torus.
  * 
  * @param MajorRadius      1/2 the diameter of the large circle. 
  * @param MinorRadius      1/2 the diameter of a cross-section. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function SurfaceAreaTorus(MajorRadius, MinorRadius)
 {
   Return (4 * Pi()^2 * MajorRadius * MinorRadius);
 }

---

