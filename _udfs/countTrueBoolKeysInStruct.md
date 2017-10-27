---
layout: udf
title:  countTrueBoolKeysInStruct
date:   2012-09-16T18:53:16.000Z
library: UtilityLib
argString: "strc"
author: Alan McCollough
authorEmail: amccollough@anthc.org
version: 1
cfVersion: CF8
shortDescription: I loop through a struct that contains keys set to boolean values and return count of how many keys evaluate true.
tagBased: false
description: |
 You supply a structure filled with keys that are boolean values, and I will return a number of how many keys were boolean values that evaluated to true.

returnValue: Returns a numeric value that is the number of boolean TRUE values found in the struct

example: |
 <cfscript>
 loc={};
 loc.lorem="true";
 loc.ipsum="false";
 loc.dolor="true";
 </cfscript>
 result is 2: #countTrueBoolKeysInStruct(loc)#

args:
 - name: strc
   desc: A struct to count positive booleans
   req: true


javaDoc: |
 /**
  * I loop through a struct that contains keys set to boolean values and return count of how many keys evaluate true.
  * v0.1 by Alan McCollough
  * v1.0 by Adam Cameron.  VARing
  * 
  * @param strc      A struct to count positive booleans (Required)
  * @return Returns a numeric value that is the number of boolean TRUE values found in the struct 
  * @author Alan McCollough (amccollough@anthc.org) 
  * @version 1.0, September 16, 2012 
  */

code: |
 function countTrueBoolKeysInStruct(strc){
     var x = 0;
     var i = 0;
     for(i in strc) {
         if (isBoolean(strc[i]) && strc[i]){
             x++;
         }
     };
     return x;
 };

oldId: 2219
---

