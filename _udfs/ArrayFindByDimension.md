---
layout: udf
title:  ArrayFindByDimension
date:   2004-09-23T10:27:09.000Z
library: DataManipulationLib
argString: "arrayToSearch, valueToFind, dimensionToSearch"
author: Grant Szabo
authorEmail: grant@quagmire.com
version: 1
cfVersion: CF6
shortDescription: Search a multidimensional array for a value.
tagBased: true
description: |
 Extends Nathan Dintenfass' ArrayFindNoCase() by adding ability to search a specified dimension of a multidimensional array.  Returns numeric array position of first dimension if element found, otherwise returns 0.

returnValue: Returns a number.

example: |
 <cfscript>
 arr = arrayNew(2);
 arr[1][1] = "apple";
 arr[1][2] = "pear";
 arr[1][3] = "orange";
 arr[2][1] = "star";
 arr[2][2] = "nova";
 arr[2][3] = "moon";
 
 writeOutput(arrayFindByDimension(arr,"star",1) & "<br>");            
 writeOutput(arrayFindByDimension(arr,"star",2) & "<br>");            
 
 </cfscript>

args:
 - name: arrayToSearch
   desc: Array to search.
   req: true
 - name: valueToFind
   desc: Value to find.
   req: true
 - name: dimensionToSearch
   desc: Dimension to search.
   req: true


javaDoc: |
 <!---
  Search a multidimensional array for a value.
  
  @param arrayToSearch      Array to search. (Required)
  @param valueToFind      Value to find. (Required)
  @param dimensionToSearch      Dimension to search. (Required)
  @return Returns a number. 
  @author Grant Szabo (grant@quagmire.com) 
  @version 1, September 23, 2004 
 --->

code: |
 <cffunction name="ArrayFindByDimension" access="public" returntype="numeric" output="false">
     <cfargument name="arrayToSearch" type="array" required="Yes">
     <cfargument name="valueToFind" type="string" required="Yes">
     <cfargument name="dimensionToSearch" type="numeric" required="Yes">
     <cfscript>
         var ii = 1;
         
         //loop through the array, looking for the value
         for(; ii LTE arrayLen(arguments.arrayToSearch); ii = ii + 1){
             //if this is the value, return the index
             if(NOT compareNoCase(arguments.arrayToSearch[ii][arguments.dimensionToSearch], arguments.valueToFind))
                 return ii;
         }
         //if we've gotten this far, it means the value was not found, so return 0
         return 0;
     </cfscript>
 </cffunction>

oldId: 1137
---

