---
layout: udf
title:  SurfaceAreaCube
date:   2001-07-18T15:56:47.000Z
library: MathLib
argString: "side"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the surface area of a cube.
description: |
 Calculates the surface area of a cube based on the length of one side.

returnValue: Returns a simple value.

example: |
 <CFSET side=4>
   <CFOUTPUT>
   Given: side = #side#<BR>
   The surface area of the cube is #SurfaceAreaCube(side)#
   </CFOUTPUT>

args:
 - name: side
   desc: Length of one side.
   req: true


javaDoc: |
 /**
  * Calculates the surface area of a cube.
  * 
  * @param side      Length of one side. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function SurfaceAreaCube(side)
 {
   Return (6 * side^2);
 }

---

