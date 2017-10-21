---
layout: udf
title:  nBase36
date:   2009-06-11T23:17:45.000Z
library: MathLib
argString: "num"
author: David Edgar
authorEmail: appsupport@hotmail.com
version: 0
cfVersion: CF5
shortDescription: Creates a base 36 from numbers that don't fit inside an integer.
description: |
 Creates a base 36 from numbers that don't fit inside an integer.

returnValue: Returns a string.

example: |
 <cfoutput>#nBase36(87123456789)#</cfoutput>

args:
 - name: num
   desc: Number to convert.
   req: true


javaDoc: |
 /**
  * Creates a base 36 from numbers that don't fit inside an integer.
  * 
  * @param num      Number to convert. (Required)
  * @return Returns a string. 
  * @author David Edgar (appsupport@hotmail.com) 
  * @version 0, June 11, 2009 
  */

code: |
 function nBase36(num){
     var stream = chr(32);
     var chars = "0123456789abcdefghijklmnopqrstuvwxyz";
     var res = "";
     if (num GT 0) { 
         while (num GT 0) {
             res = num - 36 * int(num / 36);
             num = int(num / 36);
             stream = mid(chars,res + 1,1) & stream;
         }
     } else {
         stream = num;
     }
     return(stream);
 }

---

