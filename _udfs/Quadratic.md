---
layout: udf
title:  Quadratic
date:   2001-07-18T15:16:24.000Z
library: MathLib
argString: "a, b, c"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the two real roots of a polynomial in the form&#58; ax^2 + bx + c = 0
description: |
 Returns a structure containing the two real roots of a polynomial in the form: ax^2 + bx + c = 0

returnValue: Returns a structure.

example: |
 <CFSET a = 1>
   <CFSET b = -3>
   <CFSET c = -4>
   <CFSET Quadratic=#Quadratic(a, b, c)#> 
 
   <CFOUTPUT>
   Given a = 1, b = -3, c = -4
   The first root is #Quadratic.Root1#
   The second root is #Quadratic.Root2#
   </CFOUTPUT> 
 
 <P>
 Here's the Quadratic structure:
 <P>
 <CFDUMP VAR="#Quadratic#">

args:
 - name: a
   desc: Coefficient of x^2 term
   req: true
 - name: b
   desc: Coefficient of x term
   req: true
 - name: c
   desc: Constant
   req: true


javaDoc: |
 /**
  * Returns the two real roots of a polynomial in the form: ax^2 + bx + c = 0
  * 
  * @param a      Coefficient of x^2 term 
  * @param b      Coefficient of x term 
  * @param c      Constant 
  * @return Returns a structure. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, July 18, 2001 
  */

code: |
 function Quadratic(a, b, c)
 {
   Var mRoots = StructNew();
   Var first = 0;
   Var second = 0;
   Var denom = 2 * a;
   Var arg1 = b^2 - 4 * a * c;
   if (arg1 LT 0) {
     mRoots["Root1"] = "not real";
       mRoots["Root2"] = "not real";
   }
   else {   
       first = -b / denom;
       second = Sqr(arg1) / denom;
       mRoots["Root1"] = first + second;
       mRoots["Root2"] = first - second; 
   }
   Return mRoots;
 }

---

