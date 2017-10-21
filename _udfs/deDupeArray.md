---
layout: udf
title:  deDupeArray
date:   2012-04-26T23:27:49.000Z
library: CFMLLib
argString: "inputArray"
author: Dave Anderson
authorEmail: the.one.true.dave.anderson@gmail.com
version: 1
cfVersion: CF9
shortDescription: Removes duplicate values from an array.
description: |
 I saw a function here for removing dupes from lists and queries, but not one for arrays.  Here's one I've been using for a while.

returnValue: Returns an array.

example: |
 myArray = ["1","2","1","3","1","4"];
 myArray = deDupeArray(myArray);
 
 result: ["1","2","3","4"]

args:
 - name: inputArray
   desc: Array to dedupe.
   req: true


javaDoc: |
 /**
  * Removes duplicate values from an array.
  * 
  * @param inputArray      Array to dedupe. (Required)
  * @return Returns an array. 
  * @author Dave Anderson (the.one.true.dave.anderson@gmail.com) 
  * @version 1, April 26, 2012 
  */

code: |
 public array function deDupeArray(required array inputArray) {
     local.arrList = arrayToList(inputArray);
     local.retArr = inputArray;
     for (local.i = arrayLen(inputArray);i gte 1;i=i-1) {
         if (listValueCountNoCase(arrList,inputArray[i]) gt 1) {
             arrayDeleteAt(retArr,i);
             arrList = arrayToList(retArr);
         }
     }
     return retArr;
 }

---

