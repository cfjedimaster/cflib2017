---
layout: udf
title:  VolCone
date:   2001-07-18T18:48:24.000Z
library: MathLib
argString: "radius, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of a cone.
description: |
 Calculates the volume of a cone.

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
   The volume of the cone is #VolCone(radius,height)#
   </CFOUTPUT>

args:
 - name: radius
   desc: 1/2 the diameter of the base of the cone.
   req: true
 - name: height
   desc: The height at the center of the cone.
   req: true


javaDoc: |
 /**
  * Calculates the volume of a cone.
  * 
  * @param radius      1/2 the diameter of the base of the cone. 
  * @param height      The height at the center of the cone. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 18, 2001 
  */

code: |
 function VolCone(radius, height)
 {
   Return ((Pi() * radius^2 * height)/3);
 }

---

