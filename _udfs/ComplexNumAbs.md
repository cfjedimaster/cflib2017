---
layout: udf
title:  ComplexNumAbs
date:   2001-11-15T19:58:44.000Z
library: MathLib
argString: "ComplexNumber"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF5
shortDescription: Absolute value |z| of a complex number.
tagBased: false
description: |
 This function calculates the real number representing the absolute value of a complex number, where the complex number is a structure created earlier using the ComplexNum() UDF. If the real and imaginary parts of the number are the horizontal and vertical sides of a right triangle, the absolute value is the hypotenuse.

returnValue: Returns a numeric value.

example: |
 <cfoutput>
     | 3+4i | = #ComplexNumAbs(ComplexNum(3,4))#
 </cfoutput>

args:
 - name: ComplexNumber
   desc: Structure containing the complex number you want the absolute value for.
   req: true


javaDoc: |
 /**
  * Absolute value |z| of a complex number.
  * Note that this function uses complex numbers stored as structures by the ComplexNum() UDF also available in this library.
  * 
  * @param ComplexNumber      Structure containing the complex number you want the absolute value for. 
  * @return Returns a numeric value. 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 1, November 15, 2001 
  */

code: |
 function ComplexNumAbs(ComplexNumber){
   return Sqr(ComplexNumber.R^2 + ComplexNumber.I^2);
 }

oldId: 352
---

