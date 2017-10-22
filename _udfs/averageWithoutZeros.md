---
layout: udf
title:  averageWithoutZeros
date:   2004-01-12T14:36:58.000Z
library: MathLib
argString: "data"
author: David Simms
authorEmail: dsimms@dcbar.org
version: 1
cfVersion: CF5
shortDescription: Calculates the average of a set of numbers omitting values less than 1 from that average.
tagBased: false
description: |
 ColdFusion's built-in arrayAvg() function calculates an average by taking the sum of a set of numbers and then dividing that sum by the total count of the numbers. When the set of numbers contains one or more zeros, this produces an inaccurate average when the developer wishes to average only those values which are greater than or equal to 1.

returnValue: Returns a number.

example: |
 <cfset data = listToArray("5,0,5,3,0")>
 <cfoutput>
 Built-in ArrayAvg: #arrayAvg(data)#<br>
 AverageWithoutZeros: #averageWithoutZeros(data)#
 </cfoutput>

args:
 - name: data
   desc: The array to average.
   req: true


javaDoc: |
 /**
  * Calculates the average of a set of numbers omitting values less than 1 from that average.
  * 
  * @param data      The array to average. (Required)
  * @return Returns a number. 
  * @author David Simms (dsimms@dcbar.org) 
  * @version 1, January 12, 2004 
  */

code: |
 function averageWithoutZeros(data) {
     var counter = arrayLen(data);
     
     //remove zeros
     for(;counter gte 1;counter=counter-1) {
         if(data[counter] lt 1) arrayDeleteAt(data,counter);
     } 
 
     if(arrayLen(data)) return arrayAvg(data);
     else return 0;
 }

---

