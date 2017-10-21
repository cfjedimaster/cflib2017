---
layout: udf
title:  ArrayListCompareNoCase
date:   2005-03-28T23:54:59.000Z
library: DataManipulationLib
argString: "arrayToSearch, listToFind[, delimiter]"
author: Steve Robison, Jr
authorEmail: steverobison@gmail.com
version: 1
cfVersion: CF5
shortDescription: Returns the index of the first item in an array that contains a list element.
description: |
 Returns the index in an array containing one of the given (case-insensitive) list elements or 0 if none found.

returnValue: Returns a number.

example: |
 <cfset l = "a,b,c,d">
 <cfset a = ArrayNew(1)>
 <cfset a[1] = "e">
 <cfset a[2] = "d">
 <cfset a[3] = "ab">
 
 <cfoutput>#ArrayListCompareNoCase(a, l)#</cfoutput>

args:
 - name: arrayToSearch
   desc: The array to search.
   req: true
 - name: listToFind
   desc: List that will be searched for. If any item is found, the array index is returned.
   req: true
 - name: delimiter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns the index of the first item in an array that contains a list element.
  * 
  * @param arrayToSearch      The array to search. (Required)
  * @param listToFind      List that will be searched for. If any item is found, the array index is returned. (Required)
  * @param delimiter      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a number. 
  * @author Steve Robison, Jr (steverobison@gmail.com) 
  * @version 1, March 28, 2005 
  */

code: |
 function ArrayListCompareNoCase(arrayToSearch,listToFind){
     //a variable for looping
     var ii = 0;        // variable for looping through list
     var jj = 0;        // variable for looping through array
     var delimiter = ',';        // default delimiter
     
 
     // check to see if delimiters were passed
     if (ArrayLen(arguments) gt 2) delimiter = arguments[3];
 
     //loop through list
     for(ii = 1; ii LTE ListLen(listToFind, delimiter); ii = ii + 1) {
     //loop through the array, looking for the value
     for(jj = 1; jj LTE arrayLen(arrayToSearch); jj = jj + 1){
         //if this is the value, return the index
         if(NOT compareNoCase(arrayToSearch[jj],ListGetAt(listToFind, ii, delimiter)))
             return jj;
     }
     }
     //if we've gotten this far, it means the value was not found, so return 0
     return 0;
 }

---

