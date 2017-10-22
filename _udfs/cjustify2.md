---
layout: udf
title:  cjustify2
date:   2012-09-16T17:35:19.000Z
library: StrLib
argString: "string, length[, padChar]"
author: Al Everett
authorEmail: everett.al@gmail.com
version: 1
cfVersion: CF5
shortDescription: Same as built-in CJustify(), but allows optional parameter character to pad with.
tagBased: false
description: |
 This function mimics the CJustify() function, but offers an optional third parameter to define the character to use for padding (if padding is necessary).

returnValue: A string, center-justified to occupy the specified field length

example: |
 <cfoutput>
 #cjustify2("foobar",10,".")#<br> <!--- outputs: ..foobar.. --->
 #cjustify2("foobar",5,"-")#<br> <!--- outputs: foobar --->
 </cfoutput>

args:
 - name: string
   desc: String to justify
   req: true
 - name: length
   desc: Length of field
   req: true
 - name: padChar
   desc: Character to use for padding
   req: false


javaDoc: |
 /**
  * Same as built-in CJustify(), but allows optional parameter character to pad with.
  * version 1.0 by Al Everett
  * 
  * @param string      String to justify (Required)
  * @param length      Length of field (Required)
  * @param padChar      Character to use for padding (Optional)
  * @return A string, center-justified to occupy the specified field length 
  * @author Al Everett (everett.al@gmail.com) 
  * @version 1.0, September 16, 2012 
  */

code: |
 function cJustify2(string,length) {
     var padChar = " ";
     var padLeftCount = 0;
     var padRightCount = 0;
     if (arrayLen(arguments) GT 2) {
         padChar=left(arguments[3],1);
     }
         
     if (len(string) LT length) {
         padLeftCount = (arguments.length - len(arguments.string)) \ 2; // integer divide by 2 the number of characters for padding
         padRightCount = arguments.length - len(arguments.string) - padLeftCount; // take whatever is left over and put on the right
     }
         
     return repeatString(padChar,padLeftCount) & arguments.string & repeatString(padChar,padRightCount);
 }

---

