---
layout: udf
title:  AreaTriangle
date:   2001-07-17T13:39:37.000Z
library: MathLib
argString: "base[, height]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of a triangle.
tagBased: false
description: |
 Calculates the area of a triangle based on the length of the base and the height.

returnValue: Returns the area of the triangle.

example: |
 <CFSET base=4>
   <CFSET height=6>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>base=#base#
   <LI>height=#height#
   </UL>
   The area of the triangle is #AreaTriangle(base,height)#
   </CFOUTPUT>

args:
 - name: base
   desc: Length of the base.
   req: true
 - name: height
   desc: The height of the triangle.
   req: false


javaDoc: |
 /**
  * Calculates the area of a triangle.
  * 
  * @param base      Length of the base. 
  * @param height      The height of the triangle. 
  * @return Returns the area of the triangle. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function AreaTriangle(base, height)
 {
   Return (0.5 * base * height);
 }

oldId: 27
---

