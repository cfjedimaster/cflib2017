---
layout: udf
title:  VolPyramid
date:   2001-07-18T18:51:52.000Z
library: MathLib
argString: "base, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of a pyramid.
description: |
 Calculates the volume of a pyramid.

returnValue: Returns a simple value.

example: |
 <CFSET base=4>
   <CFSET height=8>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>base=#base#
   <LI>height=#height#
   </UL>
   The volume of the pyramid is #VolPyramid(base,height)#
   </CFOUTPUT>

args:
 - name: base
   desc: The length of the base of the pyramid.
   req: true
 - name: height
   desc: The height of the pyramid.
   req: true


javaDoc: |
 /**
  * Calculates the volume of a pyramid.
  * 
  * @param base      The length of the base of the pyramid. 
  * @param height      The height of the pyramid. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function VolPyramid(base, height)
 {
   Return ((base * height)/3);
 }

---

