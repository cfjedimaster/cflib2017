---
layout: udf
title:  ArrayDefinedAt
date:   2003-10-24T11:21:46.000Z
library: DataManipulationLib
argString: "arr, pos"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Returns true if a specified array position is defined.
tagBased: false
description: |
 Returns true if a specified array position is defined.

returnValue: Returns a boolean.

example: |
 <cfscript>
 a = arrayNew(1);
 a[1] = "d";
 a[2] = "e";
 a[4] = "f";
 for(i = 1; i lte arrayLen(a); i=i+1) {
     if(arrayDefinedAt(a,i)) writeOutput("a#i# is #a[i]#<br>");
     else writeOutput("a#i# is undefined<br>");
 }
 </cfscript>

args:
 - name: arr
   desc: The array to check.
   req: true
 - name: pos
   desc: The position to check.
   req: true


javaDoc: |
 /**
  * Returns true if a specified array position is defined.
  * 
  * @param arr      The array to check. (Required)
  * @param pos      The position to check. (Required)
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 2, October 24, 2003 
  */

code: |
 function arrayDefinedAt(arr,pos) {
     var temp = "";
     try {
         temp = arr[pos];
         return true;
     } 
     catch(coldfusion.runtime.UndefinedElementException ex) {
         return false;
     }
     catch(coldfusion.runtime.CfJspPage$ArrayBoundException ex) {
         return false;
     }
 }

oldId: 632
---

