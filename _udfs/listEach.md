---
layout: udf
title:  listEach
date:   2013-10-17T13:08:03.000Z
library: DataManipulationLib
argString: "list, callback[, delimiters]"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: UDF to loop over a list
tagBased: false
description: |
 Iterates over a list, calling a callback for each element. Returns an ARRAY of the results of the callback calls. The callback receives the arguments passed to the listEach(), plus index, element and length.

returnValue: An array containing the returned values from each callback call

example: |
 numbers = "tahi|rua|toru|wha";
 
 function _ucase(){
     return ucase(element);
 }
 
 upperCasedNumbers = listEach(numbers, _ucase, "|");
 writeOutput(serializeJson(upperCasedNumbers));

args:
 - name: list
   desc: A list to iterate over
   req: true
 - name: callback
   desc: A callback to call for each element of the list
   req: true
 - name: delimiters
   desc: The delimiters the list uses. Defaults to a comma
   req: false


javaDoc: |
 /**
  * UDF to loop over a list
  * v1.0 by Adam Cameron
  * 
  * @param list      A list to iterate over (Required)
  * @param callback      A callback to call for each element of the list (Required)
  * @param delimiters      The delimiters the list uses. Defaults to a comma (Optional)
  * @return An array containing the returned values from each callback call 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, October 17, 2013 
  */

code: |
 public array function listEach(required string list, required function callback, string delimiters=","){
     var arr = listToArray(list, delimiters);
     var arrLen = arrayLen(arr);
     var result = [];
     for (var index=1; index <= arrLen; index++){
         arrayAppend(result, callBack(argumentCollection=arguments, index=index, element=arr[index], length=arrLen));
     }
     return result;
 }

oldId: 2270
---

