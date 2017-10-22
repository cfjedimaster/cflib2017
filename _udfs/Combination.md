---
layout: udf
title:  Combination
date:   2001-07-18T12:28:10.000Z
library: MathLib
argString: "n, p"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the Combination of n elements taken p at a time.
tagBased: false
description: |
 Returns the Combination of n elements taken p at a time.

returnValue: Returns a simple value

example: |
 <CFSET n=13>
   <CFSET p=2>
   <CFOUTPUT>
   Given n=13, p=2
   Combination(n,p) is #Combination(n,p)#
   </CFOUTPUT>

args:
 - name: n
   desc: Any non-negative integer
   req: true
 - name: p
   desc: any non-negative integer, <= n
   req: true


javaDoc: |
 /**
  * Returns the Combination of n elements taken p at a time.
  * This funciton requires the Permutation() and Factorial() functions from this library.
  * 
  * @param n      Any non-negative integer 
  * @param p      any non-negative integer, <= n 
  * @return Returns a simple value 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, July 18, 2001 
  */

code: |
 function Combination(n,p)
 {
   var RetVal = 0;
   if (p GT n) {
    RetVal = "undefined";
   }
   else
    RetVal = Permutation(n,p) / Factorial(p);  
   Return RetVal;
 }

---

