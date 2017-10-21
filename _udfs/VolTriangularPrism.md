---
layout: udf
title:  VolTriangularPrism
date:   2001-07-18T18:59:13.000Z
library: MathLib
argString: "length, width, height"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of a triangular prism.
description: |
 Calculates the volume of a triangular prism.

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
   The volume of the triangular prism is #VolTriangularPrism(length,width,height)#
   </CFOUTPUT>

args:
 - name: length
   desc: The length of the prism.
   req: true
 - name: width
   desc: The width of the prism.
   req: true
 - name: height
   desc: The height of the prism.
   req: true


javaDoc: |
 /**
  * Calculates the volume of a triangular prism.
  * 
  * @param length      The length of the prism. 
  * @param width      The width of the prism. 
  * @param height      The height of the prism. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function VolTriangularPrism(length, width, height)
 {
   Return (0.5 * length * width * height);
 }

---

