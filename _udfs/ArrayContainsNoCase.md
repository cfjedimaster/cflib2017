---
layout: udf
title:  ArrayContainsNoCase
date:   2003-03-31T13:10:54.000Z
library: DataManipulationLib
argString: "arrayToSearch, valueToFind"
author: Sudhir Duddella
authorEmail: skduddella@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Returns the index of the first item in an array that contains a specified substring.
tagBased: false
description: |
 Returns the index of the first item that contains a specified substring. The search is case-insensitive. If the substring is not found in an Array, it  returns zero (0).

returnValue: Returns a number.

example: |
 <cfset arrN = arrayNew(1)>
 <cfset arrN[1] = "A">
 <cfset arrN[2] = "AP">
 <cfset arrN[3] = "B">
 <cfset arrN[4] = "APPLE">
 <cfset arrN[5] = "BOY">
 <cfset arrN[6] = "BOUGHT">
 
 <cfoutput>#ArrayContainsNoCase(arrN,"oU")#</cfoutput>
 
 Output:
 6

args:
 - name: arrayToSearch
   desc: Array to search.
   req: true
 - name: valueToFind
   desc: Value to look for.
   req: true


javaDoc: |
 /**
  * Returns the index of the first item in an array that contains a specified substring.
  * Mods by RCamden
  * 
  * @param arrayToSearch      Array to search. (Required)
  * @param valueToFind      Value to look for. (Required)
  * @return Returns a number. 
  * @author Sudhir Duddella (skduddella@hotmail.com) 
  * @version 1, March 31, 2003 
  */

code: |
 function ArrayContainsNoCase(arrayToSearch,valueToFind){
     var arrayList = "";
 
     arrayList = ArrayToList(arrayToSearch);
     return ListContainsNoCase(arrayList,valueToFind);                
 }

---

