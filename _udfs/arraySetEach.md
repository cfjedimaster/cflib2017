---
layout: udf
title:  arraySetEach
date:   2013-10-14T10:18:43.000Z
library: DataManipulationLib
argString: "array, from, to, callback"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: Variation of arraySet() which uses a callback to set each array element
tagBased: false
description: |
 Variation of arraySet() which uses a callback to set each array element.
 
 The callback function will be passed all the arguments the call to arraySetEach() received, plus the current array index being set.

returnValue: A array with specified elements set

example: |
 uuids = arraySetEach([], 1, 5, function(){
     return createUuid();
 });
 writeDump(uuids);

args:
 - name: array
   desc: An array to set elements within
   req: true
 - name: from
   desc: The index from which to set elements
   req: true
 - name: to
   desc: The index to which set elements
   req: true
 - name: callback
   desc: Function to call to set elements
   req: true


javaDoc: |
 /**
  * Variation of arraySet() which uses a callback to set each array element
  * v1.0 by Adam Cameron
  * 
  * @param array      An array to set elements within (Required)
  * @param from      The index from which to set elements (Required)
  * @param to      The index to which set elements (Required)
  * @param callback      Function to call to set elements (Required)
  * @return A array with specified elements set 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, October 14, 2013 
  */

code: |
 array function arraySetEach(required array array, required numeric from, required numeric to, required function callback){
     arrayset(array, from, to, "");
     for (var i=from; i <= to; i++){
         array[i] = callback(index=i, argumentCollection=arguments);
     }
     return array;
 }

oldId: 2269
---

