---
layout: udf
title:  isArrayOf
date:   2012-12-19T21:36:06.000Z
library: CFMLLib
argString: "object, validator"
author: Adam Cameron
authorEmail: adamcameroncoldfusion@gmail.com
version: 1
cfVersion: CF9
shortDescription: Validates an array of [anything].
description: |
 Validates an array of [anything] using a callback to define what constitutes a valid [anything]. The callback should return a boolean: true if the passed-in array element is valid, otherwise false.

returnValue: Returns a boolean

example: |
 numbers = [
     {number=1, english="one", maori="tahi"},
     {number=2, english="two", maori="rua"},
     {number=3, english="three", maori="toru"},
     {number=4, english="four", maori="wha"}
 ];
 
 function numbersValdiator(number){
     return structKeyExists(number, "number") && structKeyExists(number, "english") && structKeyExists(number, "maori");
 }
 
 writeOutput(isArrayOf(numbers, numbersValdiator));

args:
 - name: object
   desc: The object to validate
   req: true
 - name: validator
   desc: The callback to use to validate each element in the array
   req: true


javaDoc: |
 /**
  * Validates an array of [anything].
  * version 1.0 by Adam Cameron
  * 
  * @param object      The object to validate (Required)
  * @param validator      The callback to use to validate each element in the array (Required)
  * @return Returns a boolean 
  * @author Adam Cameron (adamcameroncoldfusion@gmail.com) 
  * @version 1.0, December 19, 2012 
  */

code: |
 function isArrayOf(object, validator){
     if (!isArray(object)){
         return false;
     }
 
     for (var element in object){
         if (!validator(element)){
             return false;
         }
     }
     return true;
 }

---

