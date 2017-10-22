---
layout: udf
title:  Factorial
date:   2001-07-18T13:09:02.000Z
library: MathLib
argString: "integer"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the factorial (n!) for a given positive integer.
tagBased: false
description: |
 Returns the factorial (n!) for a given positive integer.

returnValue: Returns a simple value.

example: |
 <CFSET n=5>
   <CFOUTPUT>
   Given n=5
   n! is #Factorial(n)#
   </CFOUTPUT>

args:
 - name: integer
   desc: Any non negitive integer.
   req: true


javaDoc: |
 /**
  * Returns the factorial (n!) for a given positive integer.
  * Note that a recursive function call is NOT used here for performance reasons.
  * 
  * @param integer      Any non negitive integer. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Factorial(integer)
 {
   Var factorial=1;
   Var i=integer;  
   while (i GT 0) {
     factorial = factorial*i;
     i = i-1;
     }
   Return factorial;
 }

---

