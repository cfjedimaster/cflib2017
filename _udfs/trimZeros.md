---
layout: udf
title:  trimZeros
date:   2012-08-26T16:06:01.000Z
library: StrLib
argString: "num"
author: Alan McCollough
authorEmail: amccollough@anthc.org
version: 1
cfVersion: CF5
shortDescription: I trim leading and trailing zeros off of a decimal number.
tagBased: false
description: |
 I take a number, and if it equals zero, I return zero. Otherwise, I return the number, stripped of leading and trailing zeros. 
 
 Based on a modification of Ray Camden's TrimZero()

returnValue: A string with leading and trailing zeros removed

example: |
 trimZeros("0") = 0
 trimZeros("0.01") = .01
 trimZeros("0.50") = .5
 trimZeros("1.0") = 1
 trimZeros("1.50") = 1.5
 trimZeros("1.51") = 1.51

args:
 - name: num
   desc: String to trim zeros from
   req: true


javaDoc: |
 /**
  * I trim leading and trailing zeros off of a decimal number.
  * version 1.0 by Alan McCollough
  * 
  * @param num      String to trim zeros from (Required)
  * @return A string with leading and trailing zeros removed 
  * @author Alan McCollough (amccollough@anthc.org) 
  * @version 1, August 26, 2012 
  */

code: |
 function trimZeros(num){    
     if(val(num) == 0){
         return "0";
     } else if (num < 1) {
         return "." & listLast(num + 0,".");    
     } else {
         return num + 0;        
     }     
 }

---

