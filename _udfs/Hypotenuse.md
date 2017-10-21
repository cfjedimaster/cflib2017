---
layout: udf
title:  Hypotenuse
date:   2001-07-18T14:22:05.000Z
library: MathLib
argString: "x, y"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the hypotenuse of a right triangle by Pythagorean theorem, given the lengths of the other two sides.
description: |
 Returns the hypotenuse of a right triangle by Pythagorean theorem, given the lengths of the other two sides.

returnValue: Returns a simple value.

example: |
 <CFSET x=3>
   <CFSET y=4>
   <CFOUTPUT>
   Given:
   <UL>
   <LI>x = 3
   <LI>y = 4
   </UL>
   The length of the hypotenuse = #Hypotenuse(x, y)#
   </CFOUTPUT>

args:
 - name: x
   desc:            Length of one side adjacent to the right angle
   req: true
 - name: y
   desc:            Length of the other side adjacent to the right angle
   req: true


javaDoc: |
 /**
  * Returns the hypotenuse of a right triangle by Pythagorean theorem, given the lengths of the other two sides.
  * 
  * @param x                 Length of one side adjacent to the right angle 
  * @param y                 Length of the other side adjacent to the right angle 
  * @return Returns a simple value. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Hypotenuse(x,y)
 {
     Return(Sqr(x^2 + y^2));
 }

---

