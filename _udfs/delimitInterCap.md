---
layout: udf
title:  delimitInterCap
date:   2008-07-09T20:10:51.000Z
library: StrLib
argString: "str, delimiter, capFirst"
author: Rachel Maxim
authorEmail: rmaxim@gmail.com
version: 1
cfVersion: CF5
shortDescription: Adds delimiting character(s) before capital letters in interCap strings.
description: |
 Adds passed delimiter (any character) before capital letters in passed InterCap/Camel Case string. Optionally capitalize the first letter in the string. Use for creating human readable file names and labels from interCap names and labels.

returnValue: Returns a string.

example: |
 <!--- add spaces and cap first letter --->
 <cfset delimitIntercapString = delimitInterCap('myTestInterCapString',' ',true)>
 <cfdump var="#delimitIntercapString#">
 
 <!--- add underscores and don't cap first letter --->
 <cfset delimitIntercapString = delimitInterCap('myTestInterCapString','_',false)>
 <cfdump var="#delimitIntercapString#">

args:
 - name: str
   desc: String to format.
   req: true
 - name: delimiter
   desc: Delimiter used to format string.
   req: true
 - name: capFirst
   desc: Boolean used to determine if first character should be set to uppercase.
   req: true


javaDoc: |
 /**
  * Adds delimiting character(s) before capital letters in interCap strings.
  * 
  * @param str      String to format. (Required)
  * @param delimiter      Delimiter used to format string. (Required)
  * @param capFirst      Boolean used to determine if first character should be set to uppercase. (Required)
  * @return Returns a string. 
  * @author Rachel Maxim (rmaxim@gmail.com) 
  * @version 1, July 9, 2008 
  */

code: |
 function delimitInterCap(str,delimiter,capFirst) {
     var newStr = '';
     var currentChar = '';
     var replaceStr = '';
     var i = 0;
     //should the first letter be upper case?
     if (isBoolean(capFirst) and capFirst is true) {
         newStr = uCase(left(str,1));
     } else {
         newStr = left(str,1);
     }
     //loop over each character in the string starting with the second
     for (i = 2; i lte len(str); i = i + 1) {
         //get the character at this index
         currentChar = mid(str,i,1);
         //search for capital letters
         if  (reFind('[A-Z]',currentChar)) {
             //if capital, prepend with delimiter
             replaceStr = delimiter & currentChar;
             //append to the new string
             newStr = newStr & replaceStr;
         } else {
             //append original character to the new string
             newStr = newStr & currentChar;
         }
     }
     return newStr;
 }

---

