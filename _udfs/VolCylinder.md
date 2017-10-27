---
layout: udf
title:  VolCylinder
date:   2001-07-18T18:44:35.000Z
library: MathLib
argString: "radius, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of a cylinder.
tagBased: false
description: |
 Calculates the volume of a cylinder.

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
   The volume of the cylinder is #VolCylinder(radius,height)#
   </CFOUTPUT>

args:
 - name: radius
   desc: 1/2 the diameter of a cross-section of the cylinder.
   req: true
 - name: height
   desc: The height of the cylinder.
   req: true


javaDoc: |
 /**
  * Calculates the volume of a cylinder.
  * 
  * @param radius      1/2 the diameter of a cross-section of the cylinder. 
  * @param height      The height of the cylinder. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function VolCylinder(radius, height)
 {
   Return (PI() * radius^2 * height);
 }

oldId: 92
---

