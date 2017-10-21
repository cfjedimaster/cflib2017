---
layout: udf
title:  ArraySort2D
date:   2012-12-19T14:16:20.000Z
library: DataManipulationLib
argString: "arrayToSort, sortColumn, type[, direction][, delimiter]"
author: Robert West
authorEmail: robert.west@digiphilic.com
version: 1
cfVersion: CF5
shortDescription: Sorts a two dimensional array by the specified column in the second dimension.
description: |
 Returns an array sorted by the sortcolumn in the second dimension according to the type and order.

returnValue: Returns an array.

example: |
 <cfset startArray = ArrayNew(2)>
 <cfset startArray[1][1] = 3>
 <cfset startArray[1][2] = 5>
 <cfset startArray[2][1] = 4>
 <cfset startArray[2][2] = 2>
 <cfset startArray[3][1] = 9>
 <cfset startArray[3][2] = 1>
 
 <cfoutput>
 
 <cfloop from="1" to="#ArrayLen(startArray)#" index="i">
     <cfloop from="1" to="#ArrayLen(startArray[i])#" index="j">
         startArray[#i#][#j#] is #startArray[i][j]#<br>    </cfloop>
 </cfloop>
 </p>
 
 <cfset finalArray = #ArraySort2D(startArray, 2, "numeric")#>
 
 <p>
 <cfloop from="1" to="#ArrayLen(finalArray)#" index="i">
     <cfloop from="1" to="#ArrayLen(finalArray[i])#" index="j">
         finalArray[#i#][#j#] is #finalArray[i][j]#<br>
     </cfloop>
 </cfloop>
 </p>
 </cfoutput>

args:
 - name: arrayToSort
   desc: A two-dimensional array to sort
   req: true
 - name: sortColumn
   desc: The index in the second-dimension to sort on
   req: true
 - name: type
   desc: Type of sort (as per same-named argument for arraySort()
   req: true
 - name: direction
   desc: How to sort. One of ASC (default) or DESC
   req: false
 - name: delimiter
   desc: Used to override the delimiter used internally. If the data to sort contains a ASCII 31 (unit separator) character, specify a DIFFERENT delimiter here
   req: false


javaDoc: |
 /**
  * Sorts a two dimensional array by the specified column in the second dimension.
  * version 1.0 by Robert West       
  * version 1.09 by Richard Davies (added support for delimiter)
  * version 1.1 by Adam Cameron (using a more appropriate default delimiter)
  * 
  * @param arrayToSort      A two-dimensional array to sort (Required)
  * @param sortColumn      The index in the second-dimension to sort on (Required)
  * @param type      Type of sort (as per same-named argument for arraySort() (Required)
  * @param direction      How to sort. One of ASC (default) or DESC (Optional)
  * @param delimiter      Used to override the delimiter used internally. If the data to sort contains a ASCII 31 (unit separator) character, specify a DIFFERENT delimiter here (Optional)
  * @return Returns an array. 
  * @author Robert West (robert.west@digiphilic.com) 
  * @version 1.1, December 19, 2012 
  */

code: |
 function arraySort2D(arrayToSort, sortColumn, type) {
     var order            = "asc";
     var delim            = chr(31); // unit separator. This needs to be something that is very unlikely to show up in the values being sorted
     var i                = 1;
     var j                = 1;
     var thePosition        = "";
     var theList            = "";
     var arrayToReturn    = arrayNew(2);
     var sortArray        = arrayNew(1);
     var counter            = 1;
 
     if (arrayLen(arguments) GT 3){
         order = arguments[4];
     }
 
     if (arrayLen(arguments) GT 4){
         delim = arguments[5];
     }
 
     for (i=1; i LTE arrayLen(arrayToSort); i=i+1) {
         arrayAppend(sortArray, arrayToSort[i][sortColumn]);
     }
 
     theList = arrayToList(sortArray, delim);
     arraySort(sortArray, type, order);
 
     for (i=1; i LTE arrayLen(sortArray); i=i+1) {
         thePosition = listFind(theList, sortArray[i], delim);
         theList = listDeleteAt(theList, thePosition, delim);
         for (j=1; j LTE arrayLen(arrayToSort[thePosition]); j=j+1) {
             arrayToReturn[counter][j] = arrayToSort[thePosition][j];
         }
         arrayDeleteAt(arrayToSort, thePosition);
         counter = counter + 1;
     }
     return arrayToReturn;
 }

---

