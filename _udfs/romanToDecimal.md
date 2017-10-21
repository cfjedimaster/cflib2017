---
layout: udf
title:  romanToDecimal
date:   2010-02-05T04:40:28.000Z
library: StrLib
argString: "input"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF5
shortDescription: Converts Roman numerals to decimal.
description: |
 Converts Roman numerals to decimal. Assumes a valid ROman numeral.

returnValue: Returns a number.

example: |
 <cfset inputs = "XX,XI,IV,VIII,MC,DL,XL">
 <cfloop index="input" list="#inputs#">
     <cfoutput>
     #input#=#romantodec(input)#<br/>
     </cfoutput>
 </cfloop>

args:
 - name: input
   desc: Roman number input.
   req: true


javaDoc: |
 /**
  * Converts Roman numerals to decimal.
  * v2 fix by for non standard things like IIX, fix done by Gary Funk
  * 
  * @param input      Roman number input. (Required)
  * @return Returns a number. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 2, February 4, 2010 
  */

code: |
 function romantodec(input) {
     var romans = {};
     var result = 0;
     var pos = 1;
     var char = "";
     var thisSum = "";
     var nextchar = "";
     var subSum = 0;
         
     romans["I"] = 1;
     romans["V"] = 5;
     romans["X"] = 10;
     romans["L"] = 50;
     romans["C"] = 100;
     romans["D"] = 500;
     romans["M"] = 1000;
 
     while(pos lte len(input)) {
         char = mid(input, pos, 1);
         subSum += romans[char];
         if(pos != len(input)) {
             nextchar = mid(input, pos + 1, 1);
             if(romans[char] == romans[nextchar]) {
                 pos++;
             } else if(romans[char] < romans[nextchar]) {
                 result = result + romans[nextchar] - subSum;
                 subSum = 0;
                 pos += 2;
             } else {
                 result = result + subSum;
                 subSum = 0;
                 pos++;
             }
         } else {
             result = result + subSum;
             pos++;
         }
     }    
     return result;
 }

---

