---
layout: udf
title:  Asinh
date:   2001-11-29T14:57:59.000Z
library: MathLib
argString: "x"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse hyberbolic sine of a value.
tagBased: false
description: |
 Returns the inverse hyberbolic sine of a value.  All angles are expressed in radians.

returnValue: Returns an angle in radians.

example: |
 <CFSET x=0.5>
   <CFOUTPUT>
   Given x=0.5<BR>
   The Asinh of #x# is: #Asinh(x)# radians
   </CFOUTPUT>

args:
 - name: x
   desc: Any real number.
   req: true


javaDoc: |
 /**
  * Returns the inverse hyberbolic sine of a value.
  * 
  * @param x      Any real number. 
  * @return Returns an angle in radians. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function Asinh(x)
 {
   Var RetVal = 0;
   Var Neg = False;
   if (x EQ 0) {
     RetVal = 0;
   }
   else {
     if (X LT 0) 
           Neg = True;
     x = Abs(x);
     if (x GT 1.0e10)
       RetVal = Log(2) + Log(X);
     else {
       RetVal = x^2;
       RetVal = Log(x + RetVal / (1 + Sqr(1 + RetVal)) + 1);
     }
     if (Neg) 
         RetVal = -RetVal;
   }
   Return(RetVal);
 }

oldId: 28
---

