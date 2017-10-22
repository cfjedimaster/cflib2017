---
layout: udf
title:  IsSafeArray
date:   2002-04-29T12:32:53.000Z
library: DataManipulationLib
argString: "arr"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Returns true if all positions in an array are defined.
tagBased: false
description: |
 Returns true if all positions in an array are defined.

returnValue: Returns a boolean.

example: |
 <cfscript>
 a = arrayNew(1);
 a[1] = "d";
 a[2] = "e";
 a[4] = "f";
 writeOutput("Is a complete? " & IsSafeArray(a));
 </cfscript>

args:
 - name: arr
   desc: The array to check.
   req: true


javaDoc: |
 /**
  * Returns true if all positions in an array are defined.
  * 
  * @param arr      The array to check. (Required)
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, April 29, 2002 
  */

code: |
 function IsSafeArray(arr) {
     var i=1;
     var temp = "";
     
     for(i=1; i lte arrayLen(arr); i=i+1) {
         try {
             temp = arr[i];
         } catch(coldfusion.runtime.UndefinedElementException ex) {
             return false;
         }        
     }
     
     return true;
 }

---

