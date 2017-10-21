---
layout: udf
title:  VolTorus
date:   2001-07-18T18:57:10.000Z
library: MathLib
argString: "MajorRadius, MinorRadius"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of a torus.
description: |
 Calculates the volume of a torus (3D donut shape).

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
   The volume of the torus is #VolTorus(MajorRadius, MinorRadius)#
   </CFOUTPUT>

args:
 - name: MajorRadius
   desc: 1/2 the diameter of the large circle.
   req: true
 - name: MinorRadius
   desc:             1/2 the diameter of a cross-section.
   req: true


javaDoc: |
 /**
  * Calculates the volume of a torus.
  * 
  * @param MajorRadius      1/2 the diameter of the large circle. 
  * @param MinorRadius                  1/2 the diameter of a cross-section. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function VolTorus(MajorRadius, MinorRadius)
 {
   Return (2 * Pi()^2 * MajorRadius * MinorRadius^2);
 }

---

