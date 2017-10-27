---
layout: udf
title:  DeepStructCount
date:   2002-08-23T10:23:32.000Z
library: DataManipulationLib
argString: "myStruct"
author: Galen Smallen
authorEmail: galen@oncli.com
version: 2
cfVersion: CF5
shortDescription: Counts the number of keys in a structure of structures.
tagBased: false
description: |
 I needed a way to count the number of keys in a structure that contained other structures.  This UDF will parse all the way through and return the count.   So far I have tested it to 5 nested deep. If an array is encountered, each element in the array will be tested to see if it is a structure. (However, the UDF still requires that the top level value be a structure.)
 
 Note - the count will not include a key that is a structure.

returnValue: Returns a numeric value.

example: |
 <cfset x = structNew()>
 <cfset x.firstname = "ray">
 <cfset x.lastname = "camden">
 <cfset x.child = arrayNew(1)>
 <cfset x.child[1] = structNew()>
 <cfset x.child[1].firstName = "jacob">
 <cfset x.child[1].lastName = "camden">
 <cfset x.child[2] = structNew()>
 <cfset x.child[2].firstName = "lynn">
 <cfset x.child[2].lastName = "camden">
 
 <cfoutput>
 #deepstructcount(x)#
 </cfoutput>

args:
 - name: myStruct
   desc: The structure to examine.
   req: true


javaDoc: |
 /**
  * Counts the number of keys in a structure of structures.
  * Added missing return statement (rkc)
  * 
  * @param myStruct      The structure to examine. (Required)
  * @return Returns a numeric value. 
  * @author Galen Smallen (galen@oncli.com) 
  * @version 2, August 23, 2002 
  */

code: |
 function deepStructCount(myStruct) {
     var deepCount=0;
     var x = "";
     var i = "";
         
     for (x in myStruct) { 
         if(isArray(myStruct[x])) {
             for(i=1; i lte arrayLen(myStruct[x]); i=i+1) {
                 if(isStruct(myStruct[x][i])) deepCount = deepCount+deepStructCount(myStruct[x][i]);
             }
         } else if (isStruct(myStruct[x])) {
             deepCount=deepCount+deepStructCount(myStruct[x]);
         } else {
             deepCount=deepCount+1;
         }
     }
     return deepCount;
 }

oldId: 600
---

