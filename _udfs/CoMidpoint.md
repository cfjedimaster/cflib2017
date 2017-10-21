---
layout: udf
title:  CoMidpoint
date:   2001-07-17T18:11:56.000Z
library: MathLib
argString: "x1, y1, x2, y2"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the coordinates of the midpoint between two points on a line.
description: |
 Returns the coordinates of the midpoint between two points on a line on the Cartesian coordinate system.

returnValue: Returns a string

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
   The midpoint between (#x1#,#y1#) and (#x2#,#y2#) = (#CoMidpoint(x1,y1,x2,y2)#)
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
  * Returns the coordinates of the midpoint between two points on a line.
  * 
  * @param x1      x position of the first point 
  * @param y1      y position of the first point 
  * @param x2      x position of the second point 
  * @param y2      y position of the second point 
  * @return Returns a string 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 17, 2001 
  */

code: |
 function CoMidpoint(x1,y1,x2,y2)
 {
   Return (x1+x2)/2 & ',' & (y1+y2)/2;
 }

---

