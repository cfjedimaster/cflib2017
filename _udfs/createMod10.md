---
layout: udf
title:  createMod10
date:   2009-09-09T22:28:36.000Z
library: StrLib
argString: "number"
author: Lucas Sherwood
authorEmail: lucas@thebitbucket.net
version: 2
cfVersion: CF5
shortDescription: Implementation of Luhn algorithm or Mod10.
tagBased: false
description: |
 This is an implementation of the Luhn algorithm or Luhn formula, also known as the &quot;modulus 10&quot; or &quot;mod 10&quot; algorithm. It calculates the check digit for a number and appends it to the end of the orignal string.
 
 For more details check out http://en.wikipedia.org/wiki/Luhn_algorithm

returnValue: Returns a number.

example: |
 #createMod10(123456789)#

args:
 - name: number
   desc: Value to format.
   req: true


javaDoc: |
 /**
  * Implementation of Luhn algorithm or Mod10.
  * v2 fix by Mike Causer
  * 
  * @param number      Value to format. (Required)
  * @return Returns a number. 
  * @author Lucas Sherwood (lucas@thebitbucket.net) 
  * @version 2, September 9, 2009 
  */

code: |
 function createMod10(number) {
     // this function generates the check digit and appends it to the orignal string
     var nDigits = len(arguments.number);
     var sum = 0;
     var i=0;
     var digit = "";
     var checkdigit = 0;
     for (i=0; i LT nDigits; i=i+1) {
         digit = mid(arguments.number, nDigits-i, 1);
         if(NOT (i MOD 2)) {
             digit = digit+digit;
             // check to see if we should add
             if(len(digit) gt 1) {
                 digit = left(digit,1) + right(digit,1);
             }
         }
         checkdigit = checkdigit + digit;
     }
     // divid by 10 and subtract from 10
     checkdigit = 10 - (checkdigit mod 10);
     return arguments.number & right( checkdigit, 1 );
 }

oldId: 1560
---

