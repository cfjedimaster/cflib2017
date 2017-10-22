---
layout: udf
title:  convertPhoneLetters
date:   2012-08-26T16:29:11.000Z
library: StrLib
argString: "[oldNumber]"
author: Brian Swartzfager
authorEmail: bcswartz@gmail.com
version: 1
cfVersion: CF9
shortDescription: Converts the letters in a phone number to the corresponding digits on an American phone.
tagBased: false
description: |
 Converts the letters in a phone number to their numeric keypad equivalent (eg: a=&gt;2, k=&gt;5, p=&gt;7, etc). Coded for phones using ISO/IEC 9995-8 (http://en.wikipedia.org/wiki/ISO/IEC_9995#ISO.2FIEC_9995-8), but easily changed.

returnValue: A string with letters converted back to digits

example: |
 <cfscript>
 testNums= ["1-800-TRY-FOGO","555-212-cfml"];
 
 for(x=1; x <= ArrayLen(testNums); x++) {
   result= convertPhoneLetters(testNums[x]);
   writeOutput(result & "<br />");
 }
 </cfscript>

args:
 - name: oldNumber
   desc: A string representing the phone number to convert
   req: false


javaDoc: |
 /**
  * Converts the letters in a phone number to the corresponding digits on an American phone.
  * version 1.0 by Brian Swartzfager
  * 
  * @param oldNumber      A string representing the phone number to convert (Optional)
  * @return A string with letters converted back to digits 
  * @author Brian Swartzfager (bcswartz@gmail.com) 
  * @version 1.0, August 26, 2012 
  */

code: |
 public string function convertPhoneLetters(required string oldNumber) {
   var newNumber= arguments.oldNumber;
   var regArray= [
     "[A-Ca-c]",
     "[D-Fd-f]",
     "[G-Ig-i]",
     "[J-Lj-l]",
     "[M-Om-o]",
     "[P-Sp-s]",
     "[T-Vt-v]",
     "[W-Zw-z]"
   ];
         
   var resultArray= [
     2,3,4,5,6,7,8,9
   ];
         
   for (var x=1; x <= arrayLen(regArray); x++) {
     newNumber= REReplace(newNumber,regArray[x],resultArray[x],"all");
   }
         
   return newNumber;
 }

---

