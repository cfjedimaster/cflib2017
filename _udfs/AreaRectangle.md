---
layout: udf
title:  AreaRectangle
date:   2001-07-17T13:20:38.000Z
library: MathLib
argString: "length, width"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the area of a rectangle.
description: |
 Calculates the area of a rectangle based on the length of one side and the width of an adjacent side.

returnValue: Returns the area of the rectangle.

example: |
 <CFSET length=4>
   <CFSET width=6>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>length=#length#
   <LI>width=#width#
   </UL>
   The area of the rectangle is #AreaRectangle(length,width)#
   </CFOUTPUT>

args:
 - name: length
   desc: Length of one side
   req: true
 - name: width
   desc: Width of an adjacent side
   req: true


javaDoc: |
 /**
  * Calculates the area of a rectangle.
  * 
  * @param length      Length of one side 
  * @param width      Width of an adjacent side 
  * @return Returns the area of the rectangle. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function AreaRectangle(length,width)
 {
   Return (length*width);
 }

---

