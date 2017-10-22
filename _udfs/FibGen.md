---
layout: udf
title:  FibGen
date:   2002-06-26T19:04:33.000Z
library: MathLib
argString: "x, y, numSeq"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the Fibonacci sequence to n places given a starting point of x and y.
tagBased: false
description: |
 Returns the Fibonacci sequence to n places given a starting point of x and y (each integer is the sum of the two previous integers).  Note that the function will also calculate the sequence for non-Fibonacci numbers.  Based on FibCalc() by Phillip B. Holmes (pholmes@mediares.com).

returnValue: Returns a comma-delimited list of numbers.

example: |
 <cfoutput>
 #FibGen(0,1,10)#<BR>
 #FibGen(1,1,10)#
 </cfoutput>

args:
 - name: x
   desc: First number in the sequence.
   req: true
 - name: y
   desc: Second number in the sequence.
   req: true
 - name: numSeq
   desc: Number of elements to generate for the sequence.
   req: true


javaDoc: |
 /**
  * Returns the Fibonacci sequence to n places given a starting point of x and y.
  * 
  * @param x      First number in the sequence. (Required)
  * @param y      Second number in the sequence. (Required)
  * @param numSeq      Number of elements to generate for the sequence. (Required)
  * @return Returns a comma-delimited list of numbers. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function FibGen(x,y,numSeq){
   var sequence = arrayNew(1);
   var total = x+y;
   var i=1;
   sequence[1] = x;
   sequence[2] = y;
   while (i LTE numSeq-2) {
     total=(x+y); 
     ArrayAppend(sequence, total);
     x=y; 
     y=total;
     i=i+1;
   }
   return ArrayToList(sequence, ',');
 }

---

