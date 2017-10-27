---
layout: udf
title:  IsOdd
date:   2001-11-27T14:37:24.000Z
library: MathLib
argString: "num"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: Returns true if the number passed it is odd, returns false if it is not.
tagBased: false
description: |
 This very simple but usefull UDF that returns true if the number passed is odd, or false if it is not.

returnValue: Returna a Boolean.

example: |
 <CFOUTPUT>
 <CFLOOP FROM="1" TO="10" INDEX="i">
 #i#: #IsOdd(i)#<BR>
 </CFLOOP>
 </CFOUTPUT>

args:
 - name: num
   desc: Number you want to test.
   req: true


javaDoc: |
 /**
  * Returns true if the number passed it is odd, returns false if it is not.
  * 
  * @param num      Number you want to test. 
  * @return Returna a Boolean. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, November 27, 2001 
  */

code: |
 function IsOdd(num) {
   // We only operate on numbers, otherwise we
   // we just return false.
   if (IsNumeric(num)) {
     //if it's evenly divisible by 2, it's
     //even. otherwise, it's odd. ;)
     return YesNoFormat(num MOD 2);
   }
   else {
     return No;
   }
 }

oldId: 400
---

