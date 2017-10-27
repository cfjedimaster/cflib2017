---
layout: udf
title:  ArraySplice
date:   2012-07-24T23:18:44.000Z
library: CFMLLib
argString: "array, index, howMany"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF8
shortDescription: Mimics the functionality of JavaScript Splice() method (https&#58;//developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice)
tagBased: false
description: |
 Changes the content of an array, adding new elements while removing old elements.
 
 As well as the specified named arguments, takes any number of optional arguments which are spliced into the array at `index`.  If passing these optional arguments, all arguments must be specified positionally, not as name/value pairs.
 
 Differs from its Javascript counterpart in that it returns the modified array, rather than updating the array argument and returning an array of the removed elements.  This is due to limitations in ColdFusion's array support.

returnValue: The updated array.

example: |
 <cfscript>
 aOriginal = ["Original 1", "Original 2", "Original 3", "Original 4"];
 writeDump(aOriginal);
 
 aResult = arraySplice(aOriginal, 3, 0, "Insert 1", "Insert 2");
 writeDump(aResult);
 </cfscript>

args:
 - name: array
   desc: The array to splice.
   req: true
 - name: index
   desc: Index at which to start changing the array. If negative, will begin that many elements from the end.
   req: true
 - name: howMany
   desc: An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed. In this case, you should specify at least one new element. If no howMany parameter is specified (second syntax above, which is a SpiderMonkey extension), all elements after index are removed.
   req: true


javaDoc: |
 /**
  * Mimics the functionality of JavaScript Splice() method
 (https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice)
  * version 0.1 by Joshua Miller
  * version 1.0 by Adam Cameron - reworking so it more closely emulates its Javascript namesake
  * 
  * @param array      The array to splice. (Required)
  * @param index      Index at which to start changing the array. If negative, will begin that many elements from the end. (Required)
  * @param howMany      An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed. In this case, you should specify at least one new element. If no howMany parameter is specified (second syntax above, which is a SpiderMonkey extension), all elements after index are removed. (Required)
  * @return The updated array. 
  * @author Joshua Miller (joshuamil@gmail.com) 
  * @version 1, July 24, 2012 
  */

code: |
 function arraySplice(array, index, howMany) {
     var i = 0;
     
     // If negative, will begin that many elements from the end    
     if (index <= 0){
         index = arrayLen(array) + (index + 1);
     }
 
     // get rid of however many they specify
     for (i=1; i LE howMany; i++){
         if (index LE arrayLen(array)){
             arrayDeleteAt(array, index);
         }
     }
 
     for (i=4; i LE arrayLen(arguments); i++){
         if (index GE arrayLen(array)){
             arrayAppend(array, arguments[i]);
             index++;
         }else{
             arrayInsertAt(array, index+(i-4), arguments[i]);
         }
     }
 
     return array;
 }

oldId: 2185
---

