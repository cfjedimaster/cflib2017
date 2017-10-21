---
layout: udf
title:  arrayMap
date:   2014-06-23T08:52:00.000Z
library: DataManipulationLib
argString: "array, f"
author: Henry Ho
authorEmail: henryho167@gmail.com
version: 1
cfVersion: CF9
shortDescription: arrayMap() for CF9/10
description: |
 ArrayMap is introduced in CF11 but it is quite easy to make it available for CF10.

returnValue: Returns a new array, with each element mapped by the callback

example: |
 // TestQueryGetRow.cfc
 component extends="testbox.system.BaseSpec" {
 
     function run(){
         include "udfs/arrayMap.cfm";
         var testArray  = ["tahi","rua","toru","wha"];
 
         describe("Tests arrayMap()", function(){
             it("handles an empty array", function(){
                 expect(
                     _arrayMap([], function(v,i,a){
                         return v;
                     })
                 ).toBe([]);
             });
             it("handles a direct transformation", function(){
                 expect(
                     _arrayMap(testArray, function(v,i,a){
                         return v;
                     })
                 ).toBe(testArray);
             });
             it("handles an actual transformation", function(){
                 var newArray =_arrayMap(testArray, function(v,i,a){
                     return ucase(v);
                 }); 
                 expect(
                     newArray.toList()
                 ).toBeWithCase("TAHI,RUA,TORU,WHA");
             });
         });
     }
 
 }

args:
 - name: array
   desc: Array to map
   req: true
 - name: f
   desc: Callback with which to map each element
   req: true


javaDoc: |
 /**
  * arrayMap() for CF9/10
  * v0.9 by Henry Ho
  * v1.0 by Adam Cameron (converting to script)
  * 
  * @param array      Array to map (Required)
  * @param f      Callback with which to map each element (Required)
  * @return Returns a new array, with each element mapped by the callback 
  * @author Henry Ho (henryho167@gmail.com) 
  * @version 1, June 23, 2014 
  */

code: |
 array function arrayMap(required array array, required any f){
     if (!isCustomFunction(f)){
         throw(type="InvalidArgumentException", message="The 'f' argument must be a function");
     }
 
     var result    = [];
     var arrLen    = arrayLen(array);
     for (var i=1; i <= arrLen; i++){
         arrayAppend(result, f(array[i], i, array));
     }
     return result;
 }

---

