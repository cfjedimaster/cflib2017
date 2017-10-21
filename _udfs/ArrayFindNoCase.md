---
layout: udf
title:  ArrayFindNoCase
date:   2002-09-06T12:23:25.000Z
library: DataManipulationLib
argString: "arrayToSearch, valueToFind"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Like listFindNoCase(), but for arrays.
description: |
 Returns the index in an array containing a given (case-insensitive) value.  It is analagous to listFind(), but with arrays.  See also arrayFind().

returnValue: Returns a number.

example: |
 <cfscript>
     anArray = arrayNew(1);
     anArray[1] = "Camden";
     anArray[2] = "Archibald";
     anArray[3] = "Mueller";
     anArray[4] = "Dintenfass";
 </cfscript>
 
 <cfoutput>#arrayFindNoCase(anArray,"MUELLER")#</cfoutput>

args:
 - name: arrayToSearch
   desc: The array to search.
   req: true
 - name: valueToFind
   desc: The value to look for.
   req: true


javaDoc: |
 /**
  * Like listFindNoCase(), but for arrays.
  * 
  * @param arrayToSearch      The array to search. (Required)
  * @param valueToFind      The value to look for. (Required)
  * @return Returns a number. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, September 6, 2002 
  */

code: |
 function ArrayFindNoCase(arrayToSearch,valueToFind){
     //a variable for looping
     var ii = 0;
     //loop through the array, looking for the value
     for(ii = 1; ii LTE arrayLen(arrayToSearch); ii = ii + 1){
         //if this is the value, return the index
         if(NOT compareNoCase(arrayToSearch[ii],valueToFind))
             return ii;
     }
     //if we've gotten this far, it means the value was not found, so return 0
     return 0;
 }

---

