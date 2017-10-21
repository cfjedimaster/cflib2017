---
layout: udf
title:  SurfaceAreaRectangularPrism
date:   2001-07-18T18:32:25.000Z
library: MathLib
argString: "length, width, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the surface area of a rectangular prism.
description: |
 Calculates the surface area of a rectangular prism.

returnValue: Returns a simple value.

example: |
 <CFSET length=4>
   <CFSET width=6>
   <CFSET height=5>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>length=#length#
   <LI>width=#width#
   <LI>height=#height#
   </UL>
   The surface area of the rectangular prism is #SurfaceAreaRectangularPrism(length,width,height)#
   </CFOUTPUT>

args:
 - name: length
   desc: The length of the prism
   req: true
 - name: width
   desc: The width of the prism
   req: true
 - name: height
   desc: The height of the prism
   req: true


javaDoc: |
 /**
  * Calculates the surface area of a rectangular prism.
  * 
  * @param length      The length of the prism 
  * @param width      The width of the prism 
  * @param height      The height of the prism 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function SurfaceAreaRectangularPrism(length, width, height)
 {
   Return ((2*length*height)+(2*length*width)+(2*width*height));
 }

---

