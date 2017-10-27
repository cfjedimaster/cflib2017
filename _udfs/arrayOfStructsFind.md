---
layout: udf
title:  arrayOfStructsFind
date:   2009-06-11T23:12:52.000Z
library: DataManipulationLib
argString: "array, searchKey, value"
author: Nath Arduini
authorEmail: nathbot@gmail.com
version: 0
cfVersion: CF5
shortDescription: Returns the position of an element in an array of structures.
tagBased: false
description: |
 This function searches for an element in an array of structures, using the key name and a value as criteria.

returnValue: Returns the numeric index of a match.

example: |
 <cfset aOfStructs = arrayNew(1)>
 <cfset arrayAppend(aOfStructs,structNew())>
 <cfset aOfStructs[arrayLen(aOfStructs)].firstName = "Jeff">
 <cfset aOfStructs[arrayLen(aOfStructs)].lastName = "Tapper">
 <cfset aOfStructs[arrayLen(aOfStructs)].city = "Astoria">
 <cfset arrayAppend(aOfStructs,structNew())>
 <cfset aOfStructs[arrayLen(aOfStructs)].firstName = "Jon">
 <cfset aOfStructs[arrayLen(aOfStructs)].lastName = "Tapper">
 <cfset aOfStructs[arrayLen(aOfStructs)].city = "Brookline">
 <cfset arrayAppend(aOfStructs,structNew())>
 <cfset aOfStructs[arrayLen(aOfStructs)].firstName = "Dan">
 <cfset aOfStructs[arrayLen(aOfStructs)].lastName = "Tapper">
 <cfset aOfStructs[arrayLen(aOfStructs)].city = "Suffield">
 
 <cfoutput>
 #ArrayOfStructsFind(aOfStructs,"lastName","Tapper")#<BR>
 #ArrayOfStructsFind(aOfStructs,"city","Suffield")#
 </cfoutput>

args:
 - name: array
   desc: Array to search.
   req: true
 - name: searchKey
   desc: Key to check in the structs.
   req: true
 - name: value
   desc: Value to search for.
   req: true


javaDoc: |
 /**
  * Returns the position of an element in an array of structures.
  * 
  * @param array      Array to search. (Required)
  * @param searchKey      Key to check in the structs. (Required)
  * @param value      Value to search for. (Required)
  * @return Returns the numeric index of a match. 
  * @author Nath Arduini (nathbot@gmail.com) 
  * @version 0, June 11, 2009 
  */

code: |
 function arrayOfStructsFind(Array, SearchKey, Value){
     var result = 0;
     var i = 1;
     var key = "";
     for (i=1;i lte arrayLen(array);i=i+1){
         for (key in array[i])
         {
             if(array[i][key]==Value and key == SearchKey){
                 result = i;
                 return result;
             }
         }
     }
     
     return result;
 }

oldId: 1949
---

