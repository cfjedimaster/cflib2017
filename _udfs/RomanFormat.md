---
layout: udf
title:  RomanFormat
date:   2002-01-29T22:31:45.000Z
library: StrLib
argString: "DecIn"
author: Brian Kallion
authorEmail: brian@kallion.net
version: 1
cfVersion: CF5
shortDescription: Converts a number to Roman numerals.
tagBased: false
description: |
 The RomanFormat function takes a single argument of a positive integer (decimals are truncated, negative numbers will return an empty string, and un-convertable strings will create an error) and returns a string containing the Roman numeral equivalent of the supplied argument.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 &copy; #RomanFormat(Year(now()))# CFLib.org
 </CFOUTPUT>

args:
 - name: DecIn
   desc: Number you want converted to Roman numerals.
   req: true


javaDoc: |
 /**
  * Converts a number to Roman numerals.
  * 
  * @param DecIn      Number you want converted to Roman numerals. 
  * @return Returns a string. 
  * @author Brian Kallion (brian@kallion.net) 
  * @version 1, January 29, 2002 
  */

code: |
 function RomanFormat(DecIn) {
 
 /* declare variables */
 var RomOut = ""; // string to be returned
 var RomList = "M,D,C,L,X,V,I"; // list of roman numerals
 var DecList = "1000,500,100,50,10,5,1"; // list of equivalents to roman numerals
 
 /* variables used in looping */
 var i = 1;
 var j = 1; 
 
 /* implement the subtraction rule by converting the in strings to the out strings later */
 var RomReplaceInList = "DCCCC,CCCC,LXXXX,XXXX,VIIII,IIII";
 var RomReplaceOutList = "CM,CD,XC,XL,IX,IV";
 
 /* convert lists to arrays for easier access */
 var RomArray = ListToArray(RomList);
 var DecArray = ListToArray(DecList);
 var RomReplaceInArray = ListToArray(RomReplaceInList);
 var RomReplaceOutArray = ListToArray(RomReplaceOutList);
 
 /* hack off the decimal part of the incoming argument */
 DecIn = int(DecIn);
 
 /* generate the raw Roman string */
 i = 1;
 while (DecIn GT 0) {
     if (DecIn - DecArray[i] GTE 0) {
         DecIn = DecIn - DecArray[i];
         RomOut = RomOut & RomArray[i];
         } else {
         i = i + 1;
     }
 }
 
 /* apply the subtraction rule to the raw Roman string */
 for (j = 1; j LTE ArrayLen(RomReplaceInArray); j = j + 1) {
     RomOut = Replace(RomOut, RomReplaceInArray[j], RomReplaceOutArray[j]);
 }
 
 return RomOut;
 }

---

