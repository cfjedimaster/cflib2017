---
layout: udf
title:  TrailingZeroes
date:   2002-09-27T11:04:11.000Z
library: MathLib
argString: "inNum, places"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Restores significant trailing zeroes which may have been omitted during calculations.
description: |
 Restores significant trailing zeroes which may have been omitted during calculations. Does not remove excess trailing zeroes (use a rounding function for this).

returnValue: Returns a number.

example: |
 <cfoutput>
 10.0/2:<br>
 #10.0/2#<br>
 <br>
 TrailingZeroes(10.0/2, 1):<br>
 #TrailingZeroes(10.0/2, 1)#<br>
 <br>
 TrailingZeroes(5.0/2, 1):<br>
 #TrailingZeroes(5.0/2, 1)#<br>
 <br>
 TrailingZeroes(5.00, 1):<br>
 #TrailingZeroes(5.00, 1)#<br>
 </cfoutput>

args:
 - name: inNum
   desc: The number.
   req: true
 - name: places
   desc: Number of significant digits.
   req: true


javaDoc: |
 /**
  * Restores significant trailing zeroes which may have been omitted during calculations.
  * 
  * @param inNum      The number. (Required)
  * @param places      Number of significant digits. (Required)
  * @return Returns a number. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, September 27, 2002 
  */

code: |
 function TrailingZeroes(inNum, decPlaces){
     var existing_dec_places  = 0;
 
     if(decPlaces GT 0) {
         if(inNum contains "."){
             existing_dec_places = Len(ListGetAt(inNum, 2, "."));
             if(existing_dec_places LT decPlaces){
                 return inNum & RepeatString("0", decPlaces - existing_dec_places);
             }
         } else {
             // was shortened to an integer without a decimal point
             return inNum & "." & RepeatString("0", decPlaces - existing_dec_places);
         }
     }
     return inNum;
 }

---

