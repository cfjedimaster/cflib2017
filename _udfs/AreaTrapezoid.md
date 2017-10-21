---
layout: udf
title:  AreaTrapezoid
date:   2001-07-17T13:35:07.000Z
library: MathLib
argString: "base1, base2, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of a trapezoid.
description: |
 Calculates the area of a trapezoid based on the length of the top and bottom bases and the height.

returnValue: Returns the area of the trapezoid.

example: |
 <CFSET base1=4>
   <CFSET base2=6>
   <CFSET height=5>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>base1=#base1#
   <LI>base2=#base2#
   <LI>height=#height#
   </UL>
   The area of the trapezoid is #AreaTrapezoid(base1, base2, height)#
   </CFOUTPUT>

args:
 - name: base1
   desc: Length of the bottom base.
   req: true
 - name: base2
   desc: Length of the top base.
   req: true
 - name: height
   desc: Height of the trapezoid.
   req: true


javaDoc: |
 /**
  * Calculates the area of a trapezoid.
  * 
  * @param base1      Length of the bottom base. 
  * @param base2      Length of the top base. 
  * @param height      Height of the trapezoid. 
  * @return Returns the area of the trapezoid. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function AreaTrapezoid(base1, base2, height)
 {
   Return (base1 + base2)/2 * height;
 }

---

