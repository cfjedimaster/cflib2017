---
layout: udf
title:  AsciiToDec
date:   2003-01-02T12:23:18.000Z
library: StrLib
argString: "string[, order][, signed]"
author: Evan Keller
authorEmail: coldfusion@evankeller.com
version: 2
cfVersion: CF5
shortDescription: Convert ASCII characters into a decimal number.
description: |
 Convert ASCII characters (i.e. binary file) into a decimal number.  You can specify either Intel or Motorola byte order, and process signed intergers normally or in two's complement notation.

returnValue: Returns a string.

example: |
 <cfset ascii = "!�?�?�?�?�?�?�?¿">
 <cfoutput>
 Unsigned Intel: #AsciiToDec(ascii)#<br>
 Signed Intel: #AsciiToDec(ascii, "i", true)#<br>
 TCN signed Intel: #AsciiToDec(ascii, "i", "tcn")#<br>
 Unsigned Motorola: #AsciiToDec(ascii, "m")#
 </cfoutput>

args:
 - name: string
   desc: String to format.
   req: true
 - name: order
   desc: Byte order (i for Intel or m for Motorola)
   req: false
 - name: signed
   desc: Process signed integers normally or in two's complement notation. Values are false (process normally), true (signed), and tcn (2's complement notation)
   req: false


javaDoc: |
 /**
  * Convert ASCII characters into a decimal number.
  * Removed evaluate
  * 
  * @param string      String to format. (Required)
  * @param order      Byte order (i for Intel or m for Motorola) (Optional)
  * @param signed      Process signed integers normally or in two's complement notation. Values are false (process normally), true (signed), and tcn (2's complement notation) (Optional)
  * @return Returns a string. 
  * @author Evan Keller (coldfusion@evankeller.com) 
  * @version 2, January 2, 2003 
  */

code: |
 function AsciiToDec(string) {
     var order="i";        //Optional arrtibute: Byte Order
                         //"i"= Intel (default)
                         //"m"= Motorola
     var signed=false;    //Optional attribute: Signed
                         //false= unsigned (default)
                         //true= signed
                         //"tcn"= 2's Complement Notation
     var result=0;
     var i=0;
     
     if (ArrayLen(arguments) gt 1) {
         order = arguments[2];
     }
     if (ArrayLen(arguments) gt 2) {
         signed = arguments[3];
     }
     for (i=1; i LTE len(string)+1; i=i+1) {
         if (order is "i") {
             result = result + (asc(mid(string, i, 1)) * 256^(i-1));
         }
         if (order is "m") {
             result = result + (asc(mid(string, i, 1)) * 256^(len(string)-i));
         }
     }
     switch (signed) {
         case true:
             if (len(string) is 0) { //If the string is "0" the length is calculated as zero,
                                     //which throws things off, we set the string to " " so
                                     //it has a length of one.
                 string = " ";
             }
             result = result - 256^len(string)/2;
         case "tcn":
             if (result GTE 256^len(string)/2) {
                 result = result - 256^len(string);
             }
         default:
             result = result;
     }
     return result;
 }

---

