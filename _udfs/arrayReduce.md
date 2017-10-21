---
layout: udf
title:  arrayReduce
date:   2013-07-31T08:58:36.000Z
library: CFMLLib
argString: "array, callback"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF9
shortDescription: CFML implementation of Array.reduce()
description: |
 Similar to Javascript's one ref https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

returnValue: The result of the reduction. Can be any data type

example: |
 function add(required numeric currentValue, required numeric index, required array array, numeric previousValue){
     return previousValue + currentValue;
 }
 
 
 result = arrayReduce([1,2,3,4], add, 0);
 
 writeDump([result]);

args:
 - name: array
   desc: Array to reduce
   req: true
 - name: callback
   desc: Callback function to use to reduce. Will receive the following arguments&#58; element (of current iteration of the all), index, array, (optional) result (of preceeding call to callback())
   req: true


javaDoc: |
 /**
  * CFML implementation of Array.reduce()
  * v1.0 by Adam Cameron with assistance from Adam Tuttle and Russ Spivey
  * 
  * @param array      Array to reduce (Required)
  * @param callback      Callback function to use to reduce. Will receive the following arguments: element (of current iteration of the all), index, array, (optional) result (of preceeding call to callback()) (Required)
  * @return The result of the reduction. Can be any data type 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, July 31, 2013 
  */

code: |
 public any function arrayReduce(required array array, required any callback, any initialValue){
     var startIdx = 1;
     if (!structKeyExists(arguments, "initialValue")){
         if (arrayLen(array) > 0){
             var result = callback(array[1], 1, array);
             startIdx = 2;
         }else{
             return;
         }
     }else{
         var result = initialValue;
     }
     for (var i=startIdx; i <= arrayLen(array); i++){
         result = callback(array[i], i, array, result);
     }
     return result;
 }

---

