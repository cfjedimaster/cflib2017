---
layout: udf
title:  VolSphere
date:   2001-07-18T18:55:20.000Z
library: MathLib
argString: "radius"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the volume of a sphere.
tagBased: false
description: |
 Calculates the volume of a sphere.

returnValue: Returns a simple value.

example: |
 <CFSET radius=4>
   <CFOUTPUT>
   Given: radius = #radius#<BR>
   The volume of the sphere is #VolSphere(radius)#
   </CFOUTPUT>

args:
 - name: radius
   desc: 1/2 the diameter of the sphere.
   req: true


javaDoc: |
 /**
  * Calculates the volume of a sphere.
  * 
  * @param radius      1/2 the diameter of the sphere. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function VolSphere(radius)
 {
   Return ((4/3) * PI() * radius^3);
 }

oldId: 96
---

