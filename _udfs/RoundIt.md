---
layout: udf
title:  RoundIt
date:   2001-11-15T13:33:51.000Z
library: MathLib
argString: "num, digits"
author: Sierra Bufe
authorEmail: sierra@brighterfusion.com
version: 2
cfVersion: CF5
shortDescription: RoundIt will round any number to a specific decimal point.
description: |
 RoundIt will round any number to a specific decimal point.

returnValue: Returns a rounded number.

example: |
 <cfset InfiniteRepeater = Evaluate(2/3)>
 
 <cfoutput>
 Ugly Number: #InfiniteRepeater#<br>
 Rounded:  #RoundIt(InfiniteRepeater,5)#
 </cfoutput>

args:
 - name: num
   desc: The number to be rounded.
   req: true
 - name: digits
   desc: The number of decimal places to round to.
   req: true


javaDoc: |
 /**
  * RoundIt will round any number to a specific decimal point.
  * Original UDF by Simon Horwith (shorwith@figleaf.com)
  * 
  * @param num      The number to be rounded. 
  * @param digits      The number of decimal places to round to. 
  * @return Returns a rounded number. 
  * @author Sierra Bufe (sierra@brighterfusion.com) 
  * @version 2, November 15, 2001 
  */

code: |
 function RoundIt(num,digits) {
     var i = num;
     // multiply by 10 to the power of the number of digits to be preserved
     i = i * (10 ^ digits);
     // round off to an integer
     i = Round(i);
     // divide by 10 to the power of the number of digits to be preserved
     i = i / (10 ^ digits);
     // return the result
     return i;
 }

---

