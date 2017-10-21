---
layout: udf
title:  ljustify2
date:   2012-09-16T20:04:52.000Z
library: StrLib
argString: "string, length[, padChar]"
author: Al Everett
authorEmail: everett.al@gmail.com
version: 0
cfVersion: CF5
shortDescription: Same as built-in LJUSTIFY, but allows optional parameter character to pad with.
description: |
 This function mimics the lJustify function, but offers an optional third parameter to define the character to use for padding (if padding is necessary).

returnValue: Returns a string, left-justified and padded to the specified field length

example: |
 <cfoutput>
 #ljustify2("foobar",10,".")#<br> <!--- outputs: foobar.... --->
 #ljustify2("foobar",5,"-")#<br> <!--- outputs: foobar --->
 </cfoutput>

args:
 - name: string
   desc: A string to justify within the specified field length
   req: true
 - name: length
   desc: The length of the field within which to justify the string
   req: true
 - name: padChar
   desc: Character to use for padding
   req: false


javaDoc: |
 /**
  * Same as built-in LJUSTIFY, but allows optional parameter character to pad with.
  * version 1.0 by Al Everett
  * 
  * @param string      A string to justify within the specified field length (Required)
  * @param length      The length of the field within which to justify the string (Required)
  * @param padChar      Character to use for padding (Optional)
  * @return Returns a string, left-justified and padded to the specified field length 
  * @author Al Everett (everett.al@gmail.com) 
  * @version 0, September 16, 2012 
  */

code: |
 function ljustify2(string,length) {
     var padChar = " ";
     if (arrayLen(arguments) GT 2) {
         padChar=left(arguments[3],1);
     }
         
     return arguments.string & repeatString(padChar,max(0,arguments.length - len(arguments.string)));
 }

---

