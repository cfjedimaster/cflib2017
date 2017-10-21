---
layout: udf
title:  isArrayOfStructs
date:   2012-12-19T21:30:33.000Z
library: DataManipulationLib
argString: "object"
author: Jon Briccetti
authorEmail: jbriccetti@gmail.com
version: 1
cfVersion: CF9
shortDescription: Tells you if a variable is an array of structs
description: |
 Allows you to check if a variable contains an array of structs.

returnValue: Returns a boolean

example: |
 numbers = [
     {number=1, english="one", maori="tahi"},
     {number=2, english="two", maori="rua"},
     {number=3, english="three", maori="toru"},
     {number=4, english="four", maori="wha"}
 ];
 
 writeOutput(isArrayOfStructs(numbers));

args:
 - name: object
   desc: The object to validate
   req: true


javaDoc: |
 /**
  * Tells you if a variable is an array of structs
  * version 0.9 by Jon Briccetti
  * version 1.0 by Adam Cameron (tidied logic, converted to script, removed some extraneous logic that didn't fit the function's stated purpose)
  * 
  * @param object      The object to validate (Required)
  * @return Returns a boolean 
  * @author Jon Briccetti (jbriccetti@gmail.com) 
  * @version 1.0, December 19, 2012 
  */

code: |
 function isArrayOfStructs(object){
     if (!isArray(object)){
         return false;
     }
     for (var element in object){
         if (!isStruct(element)){
             return false;
         }
     }
     return true;
 }

---

