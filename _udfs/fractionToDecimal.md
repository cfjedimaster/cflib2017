---
layout: udf
title:  fractionToDecimal
date:   2008-08-16T15:21:38.000Z
library: MathLib
argString: "fraction"
author: Trevor Orr
authorEmail: fractorr@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Convert fractions to decimal.
tagBased: false
description: |
 Convert fractions to decimal.

returnValue: Returns a number.

example: |
 <cfoutput>
 1 1/2: #fractionToDecimal("1 1/2")#<br />
 3/8: #fractionToDecimal("3/8")#<br />
 12 13/64: #fractionToDecimal("12 13/64")#<br />
 </cfoutput>

args:
 - name: fraction
   desc: Value to convert to decimal.
   req: true


javaDoc: |
 /**
  * Convert fractions to decimal.
  * 
  * @param fraction      Value to convert to decimal. (Required)
  * @return Returns a number. 
  * @author Trevor Orr (fractorr@yahoo.com) 
  * @version 1, August 16, 2008 
  */

code: |
 function fractionToDecimal(fraction) {
     var thisNumber        = 0;
     var thisFraction    = 0;
     var thisOut         = "0.0";
 
     if (ListLen(arguments.fraction, " ") EQ 1) {
         if (Trim(arguments.fraction) contains  "/") {
             thisOut = Val(ListFirst(arguments.fraction, "/")) / Val(ListLast(arguments.fraction, "/"));
         } else {
             thisOut = Val(Trim(arguments.fraction));
         }
     } else {
         if (Trim(ListLast(arguments.fraction, " ")) contains  "/") {
             thisOut = Val(ListFirst(arguments.fraction, " "));
             thisOut = thisOut + Val(ListFirst(ListLast(arguments.fraction, " "), "/")) / Val(ListLast(ListLast(arguments.fraction, " "), "/"));
         } else {
             thisOut = Val(Trim(arguments.fraction));
         }
     }
 
     return thisOut;
 }

---

