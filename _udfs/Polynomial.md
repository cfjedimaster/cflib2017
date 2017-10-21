---
layout: udf
title:  Polynomial
date:   2001-07-18T13:58:29.000Z
library: MathLib
argString: "x, a1, a0[, a...]"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Evaluates the Polynomial in the form y = an * x^n + a(n-1) * x^(n-1) + ... + a1 * x + a0 for a given value of x.
description: |
 Horner's method, evaluates for given value of x
 for a polynomial in the form y = an*x^n + an-1*x^(n-1) + an-2*x^(n-2) + ... + a1 * x + a0
 <P>
 Supply as many coefficients as necessary (two required) for each decreasing power of x, using 0 for missing terms.

returnValue: Returns a simple value.

example: |
 <CFSET x = -2>
   <CFSET a4 = 2>
   <CFSET a3 = 0>
   <CFSET a2 = -3>
   <CFSET a1 = 3>
   <CFSET a0 = -4>
   <CFOUTPUT>
   Given x = -2, a4 = 2, a3 = 0, a2 = -3, a1 = 3, a0 = -4
   Polynomial(-2, 2, 0, -3, 3, -4) is #Polynomial(-2, 2, 0, -3, 3, -4)#
   </CFOUTPUT>

args:
 - name: x
   desc: Any real value.
   req: true
 - name: a1
   desc: Real coefficient of highest power of x.
   req: true
 - name: a0
   desc: Real coefficient of second-highest power of x.
   req: true
 - name: a...
   desc: Additional coefficients.
   req: false


javaDoc: |
 /**
  * Evaluates the Polynomial in the form y = an * x^n + a(n-1) * x^(n-1) + ... + a1 * x + a0 for a given value of x.
  * 
  * @param x      Any real value. 
  * @param a1      Real coefficient of highest power of x. 
  * @param a0      Real coefficient of second-highest power of x. 
  * @param a...      Additional coefficients. 
  * @return Returns a simple value. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Polynomial(x, a1, a0)
 { 
     var RetVal = a1 * x + a0;  
     var arg_count = ArrayLen(Arguments);
     var opt_arg = 4;
     for( ; opt_arg LTE arg_count; opt_arg = opt_arg + 1 )
     {
         RetVal = RetVal * x + Arguments[opt_arg];
     }
     return(RetVal); 
 }

---

