---
layout: udf
title:  ProperMod
date:   2002-02-24T13:13:50.000Z
library: MathLib
argString: "y, x"
author: Tom Nunamaker
authorEmail: tom@toshop.com
version: 1
cfVersion: CF5
shortDescription: Computes the mathematical function Mod(y,x).
description: |
 The mod function is defined as the amount by which a number exceeds the largest integer multiple of the divisor that is not greater than that number.  CF has a mod operator, however, it only operates on integers and does not handle situations like 2.3 mod 2 (which should return 0.3).

returnValue: Returns a numeric value.

example: |
 <cfset y = 340>
 <cfset x = 60>
 <cfoutput>#y# mod #x# is #propermod(y,x)#<br></cfoutput>
 
 <cfset y = -340>
 <cfset x = 60>
 <cfoutput>#y# mod #x# is #propermod(y,x)#<br></cfoutput>
 
 <cfset y = 2.3>
 <cfset x = 2>
 <cfoutput>#y# mod #x# is #propermod(y,x)#<br></cfoutput>

args:
 - name: y
   desc: Number to be modded.
   req: true
 - name: x
   desc: Devisor.
   req: true


javaDoc: |
 /**
  * Computes the mathematical function Mod(y,x).
  * 
  * @param y      Number to be modded. 
  * @param x      Devisor. 
  * @return Returns a numeric value. 
  * @author Tom Nunamaker (tom@toshop.com) 
  * @version 1, February 24, 2002 
  */

code: |
 function ProperMod(y,x) {
   var modvalue = y - x * int(y/x);
   
   if (modvalue LT 0) modvalue = modvalue + x;
   
   Return ( modvalue );
 }

---

