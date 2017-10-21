---
layout: udf
title:  IsEven
date:   2001-11-27T14:37:20.000Z
library: MathLib
argString: "num"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: Returns true if the number passed it is even, returns false if it is not.
description: |
 This very simple but usefull UDF returns true if the number passed is even, or false if it is not.

returnValue: Returna a Boolean.

example: |
 <CFOUTPUT>
 <CFLOOP FROM="1" TO="10" INDEX="i">
 #i#: #IsEven(i)#<BR>
 </CFLOOP>
 </CFOUTPUT>

args:
 - name: num
   desc: Number you want to test.
   req: true


javaDoc: |
 /**
  * Returns true if the number passed it is even, returns false if it is not.
  * 
  * @param num      Number you want to test. 
  * @return Returna a Boolean. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, November 27, 2001 
  */

code: |
 function IsEven(num) {
   // We only operate on numbers, otherwise we
   // we just return false.
   if (IsNumeric(num)) {
     //if it's evenly divisible by 2, it's
     //even. otherwise, it's odd. ;)
     return (not num mod 2);
   }
   else {
     return No;
   }
 }

---

