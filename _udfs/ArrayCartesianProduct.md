---
layout: udf
title:  ArrayCartesianProduct
date:   2013-03-10T15:53:03.000Z
library: DataManipulationLib
argString: "arrays"
author: Azadi Saryev
authorEmail: azadi.saryev@gmail.com
version: 1
cfVersion: CF9
shortDescription: Returns a cartesian product (a join) of arbitrary number of arrays.
tagBased: false
description: |
 The output is an array of arrays of unique combinations of one item from each array, in the order the arrays were passed in.

returnValue: An array that is the cartesian product of the passed-in arrays

example: |
 <cfset arrayOfArrays = [[129,128,127],[130,131,132],[135,133,134],[137,138,136],[140,139],[141,142]]>
 <cfset res = arrayCartesianProduct(arrayOfArrays)>
 <cfoutput>#arraylen(res)#</cfoutput>
 <cfdump var="#res#">

args:
 - name: arrays
   desc: An array of arrays to process
   req: true


javaDoc: |
 /**
  * Returns a cartesian product (a join) of arbitrary number of arrays.
  * v1.0 by Azadi Saryev
  * 
  * @param arrays      An array of arrays to process (Required)
  * @return An array that is the cartesian product of the passed-in arrays 
  * @author Azadi Saryev (azadi.saryev@gmail.com) 
  * @version 1.0, March 10, 2013 
  */

code: |
 public array function arrayCartesianProduct(required array arrays) {
     var result = [];
     var arraysLen = arrayLen(arguments.arrays);
     var size = (arraysLen) ? 1 : 0;
     var array = '';
     var x = 0;
     var i = 0;
     var j = 0;
     var current = [];
     
     for (x=1; x <= arraysLen; x++) {
         size = size * arrayLen(arguments.arrays[x]);
         current[x] = 1;
     }
     for (i=1; i <= size; i++) {
         result[i] = [];
         for (j=1; j <= arraysLen; j++) {
             arrayAppend(result[i], arguments.arrays[j][current[j]]);
         }
         for (j=arraysLen; j > 0; j--) {
             if (arrayLen(arguments.arrays[j]) > current[j])  {
                 current[j]++;
                 break;
             }
             else {
                 current[j] = 1;
             }
         }
     }
     
     return result;
 }

oldId: 2198
---

