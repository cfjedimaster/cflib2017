---
layout: udf
title:  VolEllipsoid
date:   2001-07-18T18:50:05.000Z
library: MathLib
argString: "radius1, radius2, radius3"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of an ellipsoid.
tagBased: false
description: |
 Calculates the volume of an ellipsoid.

returnValue: Returns a simple value.

example: |
 <CFSET radius1=2>
   <CFSET radius2=4>
   <CFSET radius3=6>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>radius1=#radius1#
   <LI>radius2=#radius2#
   <LI>radius3=#radius3#
   </UL>
   The volume of the ellipsoid is #VolEllipsoid(radius1, radius2, radius3)#
   </CFOUTPUT>

args:
 - name: radius1
   desc: 1/2 the diameter of the first axis.
   req: true
 - name: radius2
   desc: 1/2 the diameter of the second axis.
   req: true
 - name: radius3
   desc: 1/2 the diameter of the third axis.
   req: true


javaDoc: |
 /**
  * Calculates the volume of an ellipsoid.
  * 
  * @param radius1      1/2 the diameter of the first axis. 
  * @param radius2      1/2 the diameter of the second axis. 
  * @param radius3      1/2 the diameter of the third axis. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function VolEllipsoid(radius1, radius2, radius3)
 {
   Return ((4/3) * PI() * radius1 *radius2 * radius3);
 }

---

