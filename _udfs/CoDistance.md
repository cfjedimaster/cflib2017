---
layout: udf
title:  CoDistance
date:   2001-07-17T14:11:26.000Z
library: MathLib
argString: "x1, y1, x2, y2"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates the distance between two sets of coordinates.
tagBased: false
description: |
 Calculates the distance between two sets of coordinates on the Cartesian coordinate system

returnValue: Returns a simple value

example: |
 <CFSET x1=1>
   <CFSET y1=5>
   <CFSET x2=1>
   <CFSET y2=-5>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>x1,y1 = (1,5)
   <LI>x2,y2 = (1,-5)
   </UL>
   The distance between (#x1#,#y1#) and (#x2#,#y2#) = #CoDistance(x1,y1,x2,y2)#
   </CFOUTPUT>

args:
 - name: x1
   desc: x position of the first point
   req: true
 - name: y1
   desc: y position of the first point
   req: true
 - name: x2
   desc: x position of the second point
   req: true
 - name: y2
   desc: y position of the second point
   req: true


javaDoc: |
 /**
  * Calculates the distance between two sets of coordinates.
  * 
  * @param x1      x position of the first point 
  * @param y1      y position of the first point 
  * @param x2      x position of the second point 
  * @param y2      y position of the second point 
  * @return Returns a simple value 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function CoDistance(x1,y1,x2,y2)
 {
   Return SQR(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
 }

---

