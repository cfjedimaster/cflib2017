---
layout: udf
title:  arraySlice
date:   2005-07-13T23:24:41.000Z
library: DataManipulationLib
argString: "ary[, start][, finish]"
author: Darrell Maples
authorEmail: drmaples@gmail.com
version: 1
cfVersion: CF5
shortDescription: Slices an array.
tagBased: false
description: |
 Returns a slice of an array.

returnValue: Returns an array.

example: |
 <cfscript>
     a = arrayNew(1);
     a[1] = "this";
     a[2] = "is";
     a[3] = "the";
     a[4] = "best";
     a[5] = "udf";
     a[6] = "that";
     a[7] = "has";
     a[8] = "ever";
     a[9] = "been";
     a[10] = "written";
 </cfscript>
 
 <cfdump var="#a#">
 <cfdump var="#arrayslice(a, 2, 3)#">
 <cfdump var="#arrayslice(a, 7)#">
 <cfdump var="#arrayslice(a)#">

args:
 - name: ary
   desc: The array to slice.
   req: true
 - name: start
   desc: The index to start with. Defaults to 1.
   req: false
 - name: finish
   desc: The index to end with. Defaults to the end of the array.
   req: false


javaDoc: |
 /**
  * Slices an array.
  * 
  * @param ary      The array to slice. (Required)
  * @param start      The index to start with. Defaults to 1. (Optional)
  * @param finish      The index to end with. Defaults to the end of the array. (Optional)
  * @return Returns an array. 
  * @author Darrell Maples (drmaples@gmail.com) 
  * @version 1, July 13, 2005 
  */

code: |
 function arraySlice(ary) {
     var start = 1;
     var finish = arrayLen(ary);
     var slice = arrayNew(1);
     var j = 1;
 
     if (len(arguments[2])) { start = arguments[2]; };
     if (len(arguments[3])) { finish = arguments[3]; };
 
     for (j=start; j LTE finish; j=j+1) {
         arrayAppend(slice, ary[j]);
     }
     return slice;
 }

---

