---
layout: udf
title:  VolCube
date:   2001-07-18T18:42:28.000Z
library: MathLib
argString: "side"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of a cube.
description: |
 Calculates the volume of a cube.

returnValue: Returns a simple value.

example: |
 <CFSET side=4>
   <CFOUTPUT>
   Given: side = #side#<BR>
   The volume of the cube is #VolCube(side)#
   </CFOUTPUT>

args:
 - name: side
   desc: The length of any one side of the cube.
   req: true


javaDoc: |
 /**
  * Calculates the volume of a cube.
  * 
  * @param side      The length of any one side of the cube. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function VolCube(Side)
 {
   Return (side^3);
 }

---

