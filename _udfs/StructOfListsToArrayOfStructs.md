---
layout: udf
title:  StructOfListsToArrayOfStructs
date:   2003-08-02T11:39:42.000Z
library: DataManipulationLib
argString: "struct[, delim][, cols]"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure of Lists to an Array of structures.
description: |
 Converts a structure of Lists to an Array of structures.

returnValue: Returns an array.

example: |
 <cfscript>
   mystruct = structnew();
   mystruct.name = "Joe,Bob,Jim";
   mystruct.weight = "140,180,160";
   mystruct.Age = "25,40,33";
 </cfscript>
 
 <cfset aos = StructOfListsToArrayOfStructs(mystruct)>
 <cfdump var="#aos#">
 
 <cfset aos = StructOfListsToArrayOfStructs(mystruct,",","weight,age")>
 <cfdump var="#aos#">

args:
 - name: struct
   desc: Struct of lists.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false
 - name: cols
   desc: Struct keys to use. Defaults to all.
   req: false


javaDoc: |
 /**
  * Converts a structure of Lists to an Array of structures.
  * 
  * @param struct      Struct of lists. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @param cols      Struct keys to use. Defaults to all. (Optional)
  * @return Returns an array. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, August 2, 2003 
  */

code: |
 function StructOfListsToArrayOfStructs(Struct){
    var delim = ",";
    var theArray = arraynew(1);
    var row = 1;
    var i = ""; 
    var cols = structkeyarray(Struct);
    var count = 0;
    var value = ""; 
    var strow = "";
 
    if(arrayLen(arguments) GT 1) delim = arguments[2];
    if(arrayLen(arguments) GT 2) cols = listToArray(arguments[3]);
    count = listlen(struct[cols[1]],delim);
    if(arraylen(cols) gt 0) {
       for(row=1; row LTE count; row = row + 1){
       strow = structnew();
       for(i=1; i lte arraylen(cols); i=i+1) {
          if(structKeyExists(Struct,cols[i])){
             if(listlen(Struct[cols[i]],delim) gte row){
                value = listgetat(Struct[cols[i]],row,delim);
             }else{
                value = "";
             }
          }else{
             value = "";
          }
          strow[cols[i]] = value;
       }
       arrayAppend(theArray,strow);
       }
    }
    return theArray;
 }

---

