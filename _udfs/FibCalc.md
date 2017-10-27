---
layout: udf
title:  FibCalc
date:   2002-06-26T19:04:17.000Z
library: MathLib
argString: "x, y, top"
author: Phillip B. Holmes
authorEmail: pholmes@mediares.com
version: 1
cfVersion: CF5
shortDescription: This script Calculates the Fibonacci sequence  (each integer is the sum of the two previous integers).
tagBased: false
description: |
 This script Calculates the Fibonacci sequence  (each integer is the sum of the two previous integers).  Note that the function will also calculate the sequence for non-Fibonacci numbers.

returnValue: Returns a comma-delimited list of numeric values.

example: |
 <cfoutput>
 #fibcalc(0,1,200)#<BR>
 #fibcalc(1,1,200)#
 </cfoutput>

args:
 - name: x
   desc: First number in the Fibonacci sequence.
   req: true
 - name: y
   desc: Second number in the Fibonacci sequence.
   req: true
 - name: top
   desc: Ceiling for the Fibonacci number.  The sequence will terminate when this value is reached.
   req: true


javaDoc: |
 /**
  * This script Calculates the Fibonacci sequence  (each integer is the sum of the two previous integers).
  * 
  * @param x      First number in the Fibonacci sequence. (Required)
  * @param y      Second number in the Fibonacci sequence. (Required)
  * @param top      Ceiling for the Fibonacci number.  The sequence will terminate when this value is reached. (Required)
  * @return Returns a comma-delimited list of numeric values. 
  * @author Phillip B. Holmes (pholmes@mediares.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function FibCalc(x,y,top){
   var sequence = arrayNew(1);
   var total = x+y;
   sequence[1] = x;
   sequence[2] = y;
   while (total LTE top) {
     ArrayAppend(sequence, total);
     x=y; 
     y=total;
     total=(x+y); 
   }
   return ArrayToList(sequence, ',');
 }

oldId: 678
---

