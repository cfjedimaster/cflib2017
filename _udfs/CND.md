---
layout: udf
title:  CND
date:   2003-03-10T15:30:00.000Z
library: MathLib
argString: "x"
author: Alex
authorEmail: axs@arbornet.org
version: 1
cfVersion: CF5
shortDescription: Cumulative Normal Distribution
description: |
 Computes cumulative normal distribution function.

returnValue: Returns a numeric value.

example: |
 <cfoutput>
 CND(3) = #CND(3)#
 </cfoutput>

args:
 - name: x
   desc: value for which you want to compute the cumulative normal distribution
   req: true


javaDoc: |
 /**
  * Cumulative Normal Distribution
  * 
  * @param x      value for which you want to compute the cumulative normal distribution (Required)
  * @return Returns a numeric value. 
  * @author Alex (axs@arbornet.org) 
  * @version 1, March 10, 2003 
  */

code: |
 function CND (x) {
     // The cumulative normal distribution function
     var Pi = 3.141592653589793238;
     var a1 = 0.31938153;
     var a2 = -0.356563782;
     var a3 = 1.781477937;
     var a4 = -1.821255978;
     var a5 = 1.330274429;
     var L = abs(x);
     var k = 1 / ( 1 + 0.2316419 * L);
     var p = 1 - 1 /  ((2 * Pi)^0.5) * exp( -(L^2) / 2 ) * (a1 * k + a2 * (k^2) + a3 * (k^3) + a4 * (k^4) + a5 * (k^5) );
 
     if (x gte 0)
         return p;
     else
         return 1-p;
 
 }

---

