---
layout: udf
title:  decimalRound
date:   2006-03-03T13:11:18.000Z
library: MathLib
argString: "numberToRound, numberOfPlaces[, mode]"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF6
shortDescription: Rounds a number to a specific number of decimal places by using Java's math library.
description: |
 Rounds a number to a specific number of decimal places by using Java's math library.  This UDF provides &quot;finer grain&quot; rounding functionality that CF does not provide with it's built-in functions.  Thanks to Christian Cantrell's blog for this one.
 
 The mods are: up = rounds up, 
 down = rounds down, 
 even = if the number to the right of the number of decimal places (i.e. the first digit of the discarded numbers) is even, the udf rounds down.  if the number to the right of the number of decimal places is odd, the udf rounds up.  This take helps  eliminates cumulative round errors when working with a series of calculations.
 
 Again, thanks to Christian Cantrell's for the original code which I modified.

returnValue: Returns a number.

example: |
 <cfoutput>
 #decimalRound(125.2525152, 1)#<br/>
 #decimalRound(125.2525152, 2, "up")#<br/>
 #decimalRound(125.2525152, 3, "down")#<br/>
 </cfoutput>

args:
 - name: numberToRound
   desc: The number to round.
   req: true
 - name: numberOfPlaces
   desc: The number of decimal places.
   req: true
 - name: mode
   desc: The rounding mode. Defaults to even.
   req: false


javaDoc: |
 /**
  * Rounds a number to a specific number of decimal places by using Java's math library.
  * 
  * @param numberToRound      The number to round. (Required)
  * @param numberOfPlaces      The number of decimal places. (Required)
  * @param mode      The rounding mode. Defaults to even. (Optional)
  * @return Returns a number. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, March 3, 2006 
  */

code: |
 function decimalRound(numberToRound, numberOfPlaces) {
     // Thanks to the blog of Christian Cantrell for this one
     var bd = CreateObject("java", "java.math.BigDecimal");
     var mode = "even";
     var result = "";
     
     if (ArrayLen(arguments) GTE 3) {
         mode = arguments[3];
     }
 
     bd.init(arguments.numberToRound);
     if (mode IS "up") {
         bd = bd.setScale(arguments.numberOfPlaces, bd.ROUND_HALF_UP);
     } else if (mode IS "down") {
         bd = bd.setScale(arguments.numberOfPlaces, bd.ROUND_HALF_DOWN);
     } else {
         bd = bd.setScale(arguments.numberOfPlaces, bd.ROUND_HALF_EVEN);
     }
     result = bd.toString();
     
     if(result EQ 0) result = 0;
 
     return result;
 }

---

