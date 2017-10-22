---
layout: udf
title:  SymRound
date:   2002-10-04T11:59:51.000Z
library: MathLib
argString: "theNumber[, numDigits]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Symmetrically rounds any number to a specific decimal point, preventing a common &quot;rounding bias&quot; from skewing results.
tagBased: false
description: |
 Despite what is conventionally taught, a &quot;5&quot; after the digit to be rounded should not always be rounded up. Five is the exact middle of the digits that are rounded (the digit &quot;0&quot; is not rounded, but just truncated), and thus should only be rounded up half of the time. Non-zero digits after the five mean that it is no longer in the exact middle, so most fives do correctly round up. However, a five which is at the end of the number or which is followed by only zeros should round to the closest *even* number (and thus rounded down half of the time).

returnValue: Returns a numeric value.

example: |
 <cfoutput>
 <pre>
 <b>x</b>               <b>SymRound(x)</b>
 
 (to the nearest tenth ... or 1 decimal place):
 1.14            #SymRound(1.14, 1)#
 1.15            #SymRound(1.15, 1)#
 1.24            #SymRound(1.24, 1)#
 1.25            #SymRound(1.25, 1)# *surprised?*
 1.25000000000   #SymRound(1.25000000000, 1)# *surprised?*
 1.25000000001   #SymRound(1.25000000001, 1)#
 1.26            #SymRound(1.26, 1)#
 
 -1.25           #SymRound(-1.25, 1)# *surprised?*
 -1.251          #SymRound(-1.251, 1)#
 
 
 (to the nearest hundred ... or -2 decimal places):
 149             #SymRound(149, -2)#
 150             #SymRound(150, -2)#
 151             #SymRound(151, -2)#
 249             #SymRound(249, -2)#
 250             #SymRound(250, -2)# *surprised?*
 251             #SymRound(251, -2)#
 
 (to the nearest whole number):
 2.5             #SymRound(2.5)# *surprised?*
 </pre>
 </cfoutput>

args:
 - name: theNumber
   desc: Number you want to round.
   req: true
 - name: numDigits
   desc: Number of decimal places to round to. 
   req: false


javaDoc: |
 /**
  * Symmetrically rounds any number to a specific decimal point, preventing a common &quot;rounding bias&quot; from skewing results.
  * Ver 1.1: Made numDigits an optional parameter instead of required.
  * 
  * @param theNumber      Number you want to round. (Required)
  * @param numDigits      Number of decimal places to round to.  (Optional)
  * @return Returns a numeric value. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1.1, October 4, 2002 
  */

code: |
 function SymRound(theNumber) {
     // The decimal-place-rounding foundation of this code was based on Sierra Bufe's (sierra@brighterfusion.com) RoundIt().
     var x              = 0;
     var rounded_down   = 0;
 
     var numDigits      = 0;  // rounds to the nearest whole integer unless a decimal place is specified
         if(ArrayLen(Arguments) GTE 2) numDigits = Arguments[2];
 
     // multiply by 10 to the power of the number of digits to be preserved, and remove its sign
     x = Abs(theNumber * (10 ^ numDigits));
     rounded_down = Int(x);
 
     // round off to an integer, checking for the exception first
     if((x -rounded_down EQ 0.5) and (not rounded_down mod 2)) {
         // number is an exact-middle "5" AND rounding down is the closest *even* result
         x = rounded_down;
     } else x = Round(Val(x));  // otherwise round normally
 
     // divide by 10 to the power of the number of digits to be preserved, and restore the number's sign
     return x / (10 ^ numDigits) * Sgn(theNumber);
 
 }

---

