---
layout: udf
title:  ComplexNum
date:   2001-11-15T19:56:40.000Z
library: MathLib
argString: "Real, Imaginary"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF5
shortDescription: Create a complex number as a structure.
tagBased: false
description: |
 This function simply builds a structure representing a complex number. This is a useful format to enable working with complex numbers.

returnValue: Returns a structure representing a complex number with the keys R and I.

example: |
 <cfset c = ComplexNum(5,-1)>
 <cfdump var="#c#">

args:
 - name: Real
   desc: Real part of the complex number.
   req: true
 - name: Imaginary
   desc: Imaginary part of the complex number.
   req: true


javaDoc: |
 /**
  * Create a complex number as a structure.
  * 
  * @param Real      Real part of the complex number. 
  * @param Imaginary      Imaginary part of the complex number. 
  * @return Returns a structure representing a complex number with the keys R and I. 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 1, November 15, 2001 
  */

code: |
 function ComplexNum(Real,Imaginary) {
   var ComplexNumber = StructNew();
   ComplexNumber.R=Real;
   ComplexNumber.I=Imaginary;
   return ComplexNumber;
 }

oldId: 351
---

