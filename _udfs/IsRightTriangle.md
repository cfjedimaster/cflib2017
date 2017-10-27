---
layout: udf
title:  IsRightTriangle
date:   2001-12-07T20:10:29.000Z
library: MathLib
argString: "x, y, z"
author: Joshua Kay
authorEmail: josh@dataquix.com
version: 1
cfVersion: CF5
shortDescription: Takes any three numbers, checks to see whether they create a right triangle.
tagBased: false
description: |
 Takes any three numbers corresponding to sides on a triangle and returns a boolean for whether or not the three sides can create a right triangle.  
 Order of numbers does not matter.

returnValue: Returns a Boolean value.

example: |
 <cfset x=4>
 <cfset y=3>
 <cfset z=5>
 
 <CFOUTPUT>
 Given x=4,y=3,and z=5<br>
 Does this represent a right triangle?
 <BR>
 Answer: (#IsRightTriangle(x,y,z)#)
 </CFOUTPUT>

args:
 - name: x
   desc: Length of one side of the triangle.
   req: true
 - name: y
   desc: Length of the second side of the triangle.
   req: true
 - name: z
   desc: Length of the third side of the triangle.
   req: true


javaDoc: |
 /**
  * Takes any three numbers, checks to see whether they create a right triangle.
  * Optimizations by Rob Brooks-Bilson (rbils@amkor.com) and Sierra Bufe (sierra@brighterfusion.com)
  * 
  * @param x      Length of one side of the triangle. 
  * @param y      Length of the second side of the triangle. 
  * @param z      Length of the third side of the triangle. 
  * @return Returns a Boolean value. 
  * @author Joshua Kay (josh@dataquix.com) 
  * @version 1, December 7, 2001 
  */

code: |
 function isRightTriangle(x,y,z){
   // Sort the side lengths from smallest to largest
   ArraySort(Arguments,"Numeric");
   // Use the familiar Pythagorian theorem (a^2+B^2=C^2) to determine if this is a right triangle
   Return (Arguments[1]^2 + Arguments[2]^2) EQ Arguments[3]^2;
 }

oldId: 176
---

