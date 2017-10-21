---
layout: udf
title:  rjustify2
date:   2011-12-21T23:29:10.000Z
library: UtilityLib
argString: "string, length"
author: Al Everett
authorEmail: everett.al@gmail.com
version: 0
cfVersion: CF5
shortDescription: Same as built-in RJUSTIFY, but allows optional parameter character to pad with.
description: |
 This function mimics the rJustify function, but offers an optional third parameter to define the character to use for padding (if padding is necessary).

returnValue: Returns a string.

example: |
 <cfoutput>
 #rjustify2("foobar",10,".")#<br> <!--- outputs: ....foobar --->
 #rjustify2("foobar",5,"-")#<br> <!--- outputs: foobar --->
 </cfoutput>

args:
 - name: string
   desc: String to manipulate.
   req: true
 - name: length
   desc: Length of pad.
   req: true


javaDoc: |
 /**
  * Same as built-in RJUSTIFY, but allows optional parameter character to pad with.
  * 
  * @param string      String to manipulate. (Required)
  * @param length      Length of pad. (Required)
  * @return Returns a string. 
  * @author Al Everett (everett.al@gmail.com) 
  * @version 0, December 21, 2011 
  */

code: |
 function rjustify2(string,length) {
     var padChar = " ";
     if (arrayLen(arguments) GT 2) {
         padChar=left(arguments[3],1);
     }
         
     return repeatString(padChar,max(0,arguments.length - len(arguments.string))) & arguments.string;
 }

---

