---
layout: udf
title:  Permutation
date:   2001-07-18T13:47:16.000Z
library: MathLib
argString: "n, p"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the Permutation of n elements taken p at a time.
description: |
 Returns the Permutation of n elements taken p at a time.

returnValue: Returns a simple value.

example: |
 <CFSET n=13>
   <CFSET p=4>
   <CFOUTPUT>
   Given n=13, p=4
   Permutation(n,p) is #Permutation(n,p)#
   </CFOUTPUT>

args:
 - name: n
   desc: Any non-negative integer.
   req: true
 - name: p
   desc: Any non-negative integer, <= n
   req: true


javaDoc: |
 /**
  * Returns the Permutation of n elements taken p at a time.
  * This funciton requires the Factorial() function from this library.
  * 
  * @param n      Any non-negative integer. 
  * @param p      Any non-negative integer, <= n 
  * @return Returns a simple value. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Permutation(n,p)
 {
   var RetVal = 0;
   if (p GT n) {
    RetVal = "undefined";
   }
   else
    RetVal = Factorial(n) / Factorial(n-p);  
   Return RetVal;
 }

---

