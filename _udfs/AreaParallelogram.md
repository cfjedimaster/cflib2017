---
layout: udf
title:  AreaParallelogram
date:   2001-07-17T13:25:09.000Z
library: MathLib
argString: "base, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of a Parallelogram.
description: |
 Calculates the area of a Parallelogram based on the length of the base and the height.

returnValue: Returns the area of the parallelogram.

example: |
 <CFSET base=4>
   <CFSET height=6>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>base=#base#
   <LI>height=#height#
   </UL>
   The area of the parallelogram is #AreaParallelogram(base,height)#
   </CFOUTPUT>

args:
 - name: base
   desc: Length of the base
   req: true
 - name: height
   desc: The height
   req: true


javaDoc: |
 /**
  * Calculates the area of a Parallelogram.
  * 
  * @param base      Length of the base 
  * @param height      The height 
  * @return Returns the area of the parallelogram. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function AreaParallelogram(base, height)
 {
   Return (base * height);
 }

---

