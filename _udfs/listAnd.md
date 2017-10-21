---
layout: udf
title:  listAnd
date:   2013-03-10T15:04:10.000Z
library: StrLib
argString: "list1, list2[, delimiter][, caseSensitive]"
author: Giriraj Kishor Govil
authorEmail: giriraj.govil@gmail.com
version: 1
cfVersion: CF9
shortDescription: Returns a list of all elements that are both in list LST1 and in list LST2
description: |
 Returns a list of all elements that are both in list LST1 and in list LST2

returnValue: A list which is the result of ANDing list1 and list2

example: |
 <cfset list1 = "10,12,15,20">
 <cfset list2 = "12,16,18">
 <!---The output will be 12 as 12 is available in both list --->
 <cfdump var="#ListAnd(list1,list2)#">

args:
 - name: list1
   desc: First list to AND
   req: true
 - name: list2
   desc: Second list to AND
   req: true
 - name: delimiter
   desc: Delimiter lists use
   req: false
 - name: caseSensitive
   desc: Whether AND operation should be case-sensitive
   req: false


javaDoc: |
 /**
  * Returns a list of all elements that are both in list LST1 and in list LST2
  * v0.9 by Giriraj Kishor Govil
  * v1.0 by Adam Cameron (added support for delimiters and case-sensitivity; used clearer argument &amp; variable names; improved logic slightly)
  * 
  * @param list1      First list to AND (Required)
  * @param list2      Second list to AND (Required)
  * @param delimiter      Delimiter lists use (Optional)
  * @param caseSensitive      Whether AND operation should be case-sensitive (Optional)
  * @return A list which is the result of ANDing list1 and list2 
  * @author Giriraj Kishor Govil (giriraj.govil@gmail.com) 
  * @version 1.0, March 10, 2013 
  */

code: |
 string function listAnd(required string list1, required string list2, string delimiter=",", boolean caseSensitive=false){
     // exit early if poss
     
     // are the lists the same (given casing requirements)
     if (
         (caseSensitive && !compare(list1,list2))
         ||
         (!caseSensitive && !compareNoCase(list1,list2))
     ){
         return list1;
     }
 
     // if either is empty, the AND of them will be empty
     if (list1 == "" || list2 == ""){
         return "";    
     }
 
     list2 = delimiter & list2 & delimiter;    // just makes it easier to do the find operation if all elements are wrapped in delimiters
     if (!caseSensitive){
         list2 = ucase(list2);
     }
 
     var result = {};
     for (var element in listToArray(list1, delimiter)){
         var item = delimiter & element & delimiter;
         if (!caseSensitive){
             item = ucase(item);
         }
         if (find(item, list2)){
             result[element] = "";
         }
     }
     return structKeyList(result, delimiter);
 }

---

