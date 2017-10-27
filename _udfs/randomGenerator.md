---
layout: udf
title:  randomGenerator
date:   2006-12-01T16:34:31.000Z
library: UtilityLib
argString: "count, start, end"
author: Srinivas.V.K
authorEmail: vksrinu@gmail.com
version: 1
cfVersion: CF5
shortDescription: This will generate the specified number of unique random numbers.
tagBased: false
description: |
 This will generate the specified number of unique random numbers.

returnValue: Returns an array.

example: |
 <cfset myarray=randomGenerator(10,1,10)>
 <cfdump var="#myarray#">

args:
 - name: count
   desc: Number of unique random numbers.
   req: true
 - name: start
   desc: Lower range of random numbers.
   req: true
 - name: end
   desc: Upper range of random numbers.
   req: true


javaDoc: |
 /**
  * This will generate the specified number of unique random numbers.
  * 
  * @param count      Number of unique random numbers. (Required)
  * @param start      Lower range of random numbers. (Required)
  * @param end      Upper range of random numbers. (Required)
  * @return Returns an array. 
  * @author Srinivas.V.K (vksrinu@gmail.com) 
  * @version 1, December 1, 2006 
  */

code: |
 function randomGenerator(count,start,end) {
     var myArray = arrayNew(1);
     var i = 0;
     var ran = 0;
             
     if((arguments.end-arguments.start+1) lt arguments.count) arguments.count = arguments.end-arguments.start+1;
     for(;arrayLen(myArray) lt arguments.count; i=i+1) {
         ran=randRange(arguments.start,arguments.end);
         //before appending random number to array,check the number in array
         if(not listFind(arrayToList(myArray),ran)) 
             arrayAppend(myArray,ran);
     }
     return myArray;
 }

oldId: 1473
---

