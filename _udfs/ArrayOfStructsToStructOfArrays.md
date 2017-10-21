---
layout: udf
title:  ArrayOfStructsToStructOfArrays
date:   2004-09-21T20:06:33.000Z
library: DataManipulationLib
argString: "ar"
author: Nathan Strutz
authorEmail: mrnate@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Changes a given array of structures to a structure of arrays.
description: |
 For those times when you're working with complex structures and arrays, here's a function that will rearrange your data. This changes a given array of structures to a structure of arrays.

returnValue: Returns a struct.

example: |
 <cfscript>
 
 ar = arrayNew(1);
 ar[1] = structNew();
 ar[1].name = 'nathan';
 ar[1].date = '1/1/2004';
 
 ar[2] = structNew();
 ar[2].name = 'zorro';
 ar[2].date = '2/3/2000';
 
 ar[3] = structNew();
 ar[3].name = 'lone ranger';
 ar[3].date = '4/8/2003';
 
 </cfscript>
 
 <cfdump var="#ar#" label="Array Of Structs">
 <cfdump var="#ArrayOfStructsToStructOfArrays(ar)#" label="Struct Of Arrays">

args:
 - name: ar
   desc: Array of structs.
   req: true


javaDoc: |
 /**
  * Changes a given array of structures to a structure of arrays.
  * 
  * @param ar      Array of structs. (Required)
  * @return Returns a struct. 
  * @author Nathan Strutz (mrnate@hotmail.com) 
  * @version 1, September 21, 2004 
  */

code: |
 function arrayOfStructsToStructOfArrays(ar) {
     var st = structNew();
     var arKeys = structKeyArray(ar[1]);
     var i=0;
     var j=0;
     var arLen = arrayLen(ar);
     for (i=1;i lte arrayLen(arKeys);i=i+1) {
         st[arKeys[i]] = arrayNew(1);
         for (j=1;j lte arLen;j=j+1) {
             st[arKeys[i]][j] = ar[j][arKeys[i]];
         }
     }
     return st;
 }

---

