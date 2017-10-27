---
layout: udf
title:  quickSort
date:   2012-01-15T22:13:55.000Z
library: UtilityLib
argString: "arrayToCompare, sorter"
author: James Sleeman
authorEmail: james@innovativemedia.co.nz
version: 3
cfVersion: CF6
shortDescription: Implementation of Hoare's Quicksort algorithm for sorting arrays of arbitrary items.
tagBased: true
description: |
 Using this UDF you are able to sort an array via the Quicksort algorithm using your own comparison function to enable you to sort arrays of anything (simple variables, structs, arrays, dates...).
 
 Your sort UDF must return one of three values: -1 if the first value is less than the second. 0 if the values are equal. 1 if the first value is greater than the second.

returnValue: Returns a sorted array.

example: |
 <CFSCRIPT>
 function nodeCompare(node1, node2){
         if(node1.display lt node2.display) return -1;
         if(node1.display eq node2.display) return 0;
         if(node1.display gt node2.display) return 1;
 }
 
 function node() {
         var newStruct = structNew();
     newStruct.Display = RandRange(100, 200000);
     return newStruct;
 }
 </CFSCRIPT>
 
 <CFSET unsorted = arrayNew(1)>
 <CFLOOP FROM="1" TO="10" INDEX="arID">
     <CFSET unsorted[arID] = node()>
 </CFLOOP>
 <CFOUTPUT><B>Unsorted data:</B></CFOUTPUT>
 <CFDUMP VAR="#unsorted#">
 <CFSET sorted = quickSort(unsorted, nodeCompare)>
 <CFOUTPUT><P><B>Sorted data:</B></CFOUTPUT>
 <CFDUMP VAR="#sorted#">

args:
 - name: arrayToCompare
   desc: The array to be sorted.
   req: true
 - name: sorter
   desc: The comparison UDF.
   req: true


javaDoc: |
 <!---
  Implementation of Hoare's Quicksort algorithm for sorting arrays of arbitrary items.
  Slight mods by RCamden (added var for comparison).
  Update my Mark Mandel to use List.addAll() functions.
  
  @param arrayToCompare      The array to be sorted. (Required)
  @param sorter      The comparison UDF. (Required)
  @return Returns a sorted array. 
  @author James Sleeman (james@innovativemedia.co.nz) 
  @version 3, January 15, 2012 
 --->

code: |
 <cffunction name="quickSort" hint="Implementation of quicksort" access="public" returntype="array" output="false">
        <cfargument name="arrayToCompare" hint="The array to compare" type="array" required="Yes">
        <cfargument name="sorter" hint="UDF for comparing items" type="any" required="Yes">
        <cfscript>
                var lesserArray  = ArrayNew(1);
                var greaterArray = ArrayNew(1);
                var pivotArray   = ArrayNew(1);
                var examine      = 2;
                var comparison = 0;
 
                pivotArray[1]    = arrayToCompare[1];
 
                if (arrayLen(arrayToCompare) LT 2) {
                        return arrayToCompare;
                }
 
                while(examine LTE arrayLen(arrayToCompare)){
                        comparison = arguments.sorter(arrayToCompare[examine], pivotArray[1]);
                        switch(comparison) {
                                case "-1": {
                                        arrayAppend(lesserArray, arrayToCompare[examine]);
                                        break;
                                }
                                case "0": {
                                        arrayAppend(pivotArray, arrayToCompare[examine]);
                                        break;
                                }
                                case "1": {
                                        arrayAppend(greaterArray, arrayToCompare[examine]);
                                        break;
                                }
                        }
                        examine = examine + 1;
                }
 
                if (arrayLen(lesserArray)) {
                        lesserArray  = quickSort(lesserArray, arguments.sorter);
                } else {
                        lesserArray = arrayNew(1);
                }
 
                if (arrayLen(greaterArray)) {
                        greaterArray = quickSort(greaterArray, arguments.sorter);
                } else {
                        greaterArray = arrayNew(1);
                }
 
                lesserArray.addAll(pivotArray);
                lesserArray.addAll(greaterArray);
 
                return lesserArray;
        </cfscript>
 </cffunction>

oldId: 518
---

