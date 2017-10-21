---
layout: udf
title:  ArrayFilter
date:   2003-03-31T13:04:25.000Z
library: DataManipulationLib
argString: "array, filter"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Applies a filter to an array.
description: |
 Applies a filter to an array (based on array_filter from PHP). For example, taking an array of numbers, you can write a filter UDF that will remove all numbers less than 10.

returnValue: Returns an array.

example: |
 <cfscript>
 function noBerry(str) {
     return not findNoCase("berry",str);
 }
 </cfscript>
 
 <cfset fruit = listToArray("apple,banana,orange,pear,lemon,lime,cherry,strawberry,blueberry")>
 <cfdump var="#arrayFilter(fruit,noBerry)#">

args:
 - name: array
   desc: Array to modify.
   req: true
 - name: filter
   desc: The UDF, NOT THE NAME, but the UDF to use as a filter.
   req: true


javaDoc: |
 /**
  * Applies a filter to an array.
  * 
  * @param array      Array to modify. (Required)
  * @param filter      The UDF, NOT THE NAME, but the UDF to use as a filter. (Required)
  * @return Returns an array. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, March 31, 2003 
  */

code: |
 function arrayFilter(array,filter) {
     var newA = arrayNew(1);
     var i = 1;
     
     for(;i lte arrayLen(array); i=i+1) {
         if(filter(array[i])) arrayAppend(newA,array[i]);
     }
     
     return newA;
 }

---

