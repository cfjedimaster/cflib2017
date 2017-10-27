---
layout: udf
title:  ComplexNumToString
date:   2001-11-15T19:59:52.000Z
library: MathLib
argString: "ComplexNumber"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF5
shortDescription: Convert a stored complex number to a string in the form a + bi.
tagBased: false
description: |
 Convert a complex number stored as a structure by the Complex() UDF to a human readable form: a+bi. This is primarily intended as a quick output for debugging.

returnValue: Returns a string

example: |
 <cfoutput>
     <cfset z=ComplexNum(3,-10)>
     z = #ComplexNumToString(z)#
 </cfoutput>

args:
 - name: ComplexNumber
   desc: Structure containing complex number you want converted to a string.
   req: true


javaDoc: |
 /**
  * Convert a stored complex number to a string in the form a + bi.
  * Note that this function uses complex numbers stored as structures by the ComplexNum() UDF also available in this library.
  * 
  * @param ComplexNumber      Structure containing complex number you want converted to a string. 
  * @return Returns a string 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 1, November 15, 2001 
  */

code: |
 function ComplexNumToString(ComplexNumber) {
   if ( ComplexNumber.I LT 0 )
     return "#ComplexNumber.R# - #Abs(ComplexNumber.I)#i";
   else        
     return "#ComplexNumber.R# + #ComplexNumber.I#i";
 }

oldId: 353
---

