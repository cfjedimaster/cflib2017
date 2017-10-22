---
layout: udf
title:  ArrayOfStructsSort
date:   2013-04-04T20:58:37.000Z
library: DataManipulationLib
argString: "aofS, key[, sortOrder][, sortType][, delim]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Sorts an array of structures based on a key in the structures.
tagBased: false
description: |
 This function takes an array of structures and the name of a key in the structures and returns a new array of structures sorted by the key.

returnValue: Returns a sorted array.

example: |
 <cfscript>
     a = arraynew(1);
     a[1] = structnew();
     a[1].name = "Dintenfass";
     a[1].number = 420;
     a[2] = structnew();
     a[2].name = "Archibald";
     a[2].number = 999;    
     a[3] = structnew();
     a[3].name = "Camden";
     a[3].number = 123;
 </cfscript>
 
 UNSORTED:
 <cfdump var="#a#">
 SORTED BY NAME:
 <cfdump var="#arrayOfStructsSort(a,"name")#">    
 SORTED BY NUMBER DESCENDING
 <cfdump var="#arrayOfStructsSort(a,"number","desc","numeric")#">

args:
 - name: aofS
   desc: Array of structures.
   req: true
 - name: key
   desc: Key to sort by.
   req: true
 - name: sortOrder
   desc: Order to sort by, asc or desc.
   req: false
 - name: sortType
   desc: Text, textnocase, or numeric.
   req: false
 - name: delim
   desc: Delimiter used for temporary data storage. Must not exist in data. Defaults to a period.
   req: false


javaDoc: |
 /**
  * Sorts an array of structures based on a key in the structures.
  * 
  * @param aofS      Array of structures. (Required)
  * @param key      Key to sort by. (Required)
  * @param sortOrder      Order to sort by, asc or desc. (Optional)
  * @param sortType      Text, textnocase, or numeric. (Optional)
  * @param delim      Delimiter used for temporary data storage. Must not exist in data. Defaults to a period. (Optional)
  * @return Returns a sorted array. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, April 4, 2013 
  */

code: |
 function arrayOfStructsSort(aOfS,key){
         //by default we'll use an ascending sort
         var sortOrder = "asc";        
         //by default, we'll use a textnocase sort
         var sortType = "textnocase";
         //by default, use ascii character 30 as the delim
         var delim = ".";
         //make an array to hold the sort stuff
         var sortArray = arraynew(1);
         //make an array to return
         var returnArray = arraynew(1);
         //grab the number of elements in the array (used in the loops)
         var count = arrayLen(aOfS);
         //make a variable to use in the loop
         var ii = 1;
         //if there is a 3rd argument, set the sortOrder
         if(arraylen(arguments) GT 2)
             sortOrder = arguments[3];
         //if there is a 4th argument, set the sortType
         if(arraylen(arguments) GT 3)
             sortType = arguments[4];
         //if there is a 5th argument, set the delim
         if(arraylen(arguments) GT 4)
             delim = arguments[5];
         //loop over the array of structs, building the sortArray
         for(ii = 1; ii lte count; ii = ii + 1)
             sortArray[ii] = aOfS[ii][key] & delim & ii;
         //now sort the array
         arraySort(sortArray,sortType,sortOrder);
         //now build the return array
         for(ii = 1; ii lte count; ii = ii + 1)
             returnArray[ii] = aOfS[listLast(sortArray[ii],delim)];
         //return the array
         return returnArray;
 }

---

