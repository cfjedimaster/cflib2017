---
layout: udf
title:  NormDist
date:   2003-06-14T10:52:41.000Z
library: MathLib
argString: "x, mean, sd"
author: Rob Ingram
authorEmail: rob.ingram@broadband.co.uk
version: 1
cfVersion: CF5
shortDescription: Calculates the normal distribution for a given mean and standard deviation with cumulative=true
tagBased: false
description: |
 Calculates the normal distribution for a given mean and standard deviation with cumulative=true.  Equivalent to the MS Excel function NORMDIST(x,mean,standard_dev, 1). This code is based on the C++ version by Oliver Maag
 (http://www.alina.ch/oliver/faq-excel-normdist.shtml)

returnValue: Returns a number.

example: |
 <cfset val = 4.2>
 <cfset mean = 4.7>
 <cfset SD = 0.65>
 <cfset nDist = NormDist(val, mean, SD)>
     
 <cfoutput>#nDist#</cfoutput>

args:
 - name: x
   desc: Value to compute the cumulative normal distribution for.
   req: true
 - name: mean
   desc: Mean value.
   req: true
 - name: sd
   desc: Standard deviation.
   req: true


javaDoc: |
 /**
  * Calculates the normal distribution for a given mean and standard deviation with cumulative=true
  * 
  * @param x      Value to compute the cumulative normal distribution for. (Required)
  * @param mean      Mean value. (Required)
  * @param sd      Standard deviation. (Required)
  * @return Returns a number. 
  * @author Rob Ingram (rob.ingram@broadband.co.uk) 
  * @version 1, June 14, 2003 
  */

code: |
 function NormDist(x, mean, sd) {
     var res = 0.0;
     var x2 = 0.0;
     var oor2pi = 0.0;
     var t = 0.0;
     
     x2 = (x - mean) / sd;
     if (x2 eq 0) res = 0.5;
     else
     {
         oor2pi = 1/(sqr(2.0 * 3.14159265358979323846));
         t = 1 / (1.0 + 0.2316419 * abs(x2));
         t = t * oor2pi * exp(-0.5 * x2 * x2) 
              * (0.31938153   + t 
              * (-0.356563782 + t
              * (1.781477937  + t 
              * (-1.821255978 + t * 1.330274429))));
         if (x2 gte 0)
         {
             res = 1.0 - t;
         }
         else
         {
             res = t;
         }
     }
     return res;
 }

oldId: 926
---

