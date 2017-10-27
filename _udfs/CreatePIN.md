---
layout: udf
title:  CreatePIN
date:   2002-05-14T17:14:50.000Z
library: StrLib
argString: "chars[, type][, format]"
author: Sierra Bufe
authorEmail: sierra@brighterfusion.com
version: 1
cfVersion: CF5
shortDescription: Flexible PIN generator, supporting alphabetical, numeric, and alphanumeric types, upper, lower, and mixed cases, and validating prescence of letters and numbers in alphanumeric PINs at least 2 characters long.
tagBased: false
description: |
 Creates a random PIN from alphabetical, numeric, or alphanumeric characters.
 Supports upper, lower, and mixed cases.
 Validates prescence of both letters and numbers in alphanumeric PINs at least 2 characters long.

returnValue: Returns a string.

example: |
 <cfoutput>
     createPIN(25,"n"):    #createPIN(25,"n","l")#<br>
     createPIN(25,"a","l"):    #createPIN(25,"a","l")#<br>
     createPIN(25,"a","u"):    #createPIN(25,"a","u")#<br>
     createPIN(25,"a","m"):    #createPIN(25,"a","m")#<br>
     createPIN(25,"m","l"):    #createPIN(25,"m","l")#<br>
     createPIN(25,"m","u"):    #createPIN(25,"m","u")#<br>
     createPIN(25,"m","m"):    #createPIN(25,"m","m")#<br>
     createPIN(50,"alphanumeric","mixed"):    #createPIN(50,"alphanumeric","mixed")#<br>
     createPIN(50,"alpha","lower"):    #createPIN(50,"alpha","lower")#<br>
     createPin(10):    #createPin(10)#<br>
     createPin(2):    #createPin(2)#<br>
 </cfoutput>

args:
 - name: chars
   desc: Number of characters to return.
   req: true
 - name: type
   desc: Type of PIN to create. Types are&#58; n (numeric), a (alphabetical), m (mixed, or alphanumeric). Default is m.
   req: false
 - name: format
   desc: Case of PIN. Options are&#58; u (uppercase), l (lowercase), m (mixed). Default is m.
   req: false


javaDoc: |
 /**
  * Flexible PIN generator, supporting alphabetical, numeric, and alphanumeric types, upper, lower, and mixed cases, and validating prescence of letters and numbers in alphanumeric PINs at least 2 characters long.
  * 
  * @param chars      Number of characters to return. (Required)
  * @param type      Type of PIN to create. Types are: n (numeric), a (alphabetical), m (mixed, or alphanumeric). Default is m. (Optional)
  * @param format      Case of PIN. Options are: u (uppercase), l (lowercase), m (mixed). Default is m. (Optional)
  * @return Returns a string. 
  * @author Sierra Bufe (sierra@brighterfusion.com) 
  * @version 1, May 14, 2002 
  */

code: |
 function createPIN(chars){
     var type    = "m";
     var format  = "m";
     var PIN     = "";
     var isValid = false;
     var i       = 0;
     var j       = 0;
     var r        = 0;
     
     // Check to see if type was provided.  If not, default to "m" (mixed, or alphanumeric).
     if (ArrayLen(Arguments) GT 1) {
         type = Arguments[2];
         if (type is "alphanumeric")
             type = "m";
         type = left(type,1);
         if ("a,n,m" does not contain type)
             return "Invalid type argument.  Valid types are:  alpha, numeric, alphanumeric, mixed, a, n, m.  This argument is optional, and defaults to alphanumeric";
     }
     
     // Check to see if format was provided.  If not, default to "m" (mixed upper and lower).
     if (ArrayLen(Arguments) GT 2) {
         format = Arguments[3];
         format = left(format,1);
         if ("u,l,m" does not contain format)
             return "Invalid format argument.  Valid formats are:  upper, lower, mixed, u, l, m.";
     }
     
     // if type is alphanumeric, set j to 10 to allow for numbers in the RandRange
     if (type is "m")
         j = 10;
     
     while (not isValid) {
     
         PIN = "";
         
         // loop through each character of the PIN
         for (i = 1; i LTE chars; i = i+1) {
         
             // numeric type
             if (type is "n") {
                 r = RandRange(0,9) + 48;
             
             // lowercase format
             } else if (format is "l") {
                 r = RandRange(97,122 + j);
                 if (r GTE 123)
                     r = r - 123 + 48;
             
             // uppercase format
             } else if (format is "u") {
                 r = RandRange(65,90 + j);
                 if (r GTE 91)
                     r = r - 91 + 48;
             
             // upper and lower cases mixed
             } else if (format is "m") {
                 r = RandRange(65,116 + j);
                 if (r GTE 117)
                     r = r - 117 + 48;
                 else if (r GTE 91)
                     r = r + 6;
             
             }
             
             PIN = PIN & Chr(r);
         }
         
         // verfify that alphanumeric strings contain both letters and numbers
         if (type is "m" AND chars GTE 2) {
             if (REFind("[A-Z,a-z]+",PIN) AND REFind("[0-9]+",PIN))
                 isValid = true;
         } else {
             isValid = true;
         }
     
     }
         
     return PIN;
 }

oldId: 508
---

