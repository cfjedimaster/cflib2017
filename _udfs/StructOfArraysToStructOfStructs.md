---
layout: udf
title:  StructOfArraysToStructOfStructs
date:   2003-08-02T11:44:10.000Z
library: DataManipulationLib
argString: "struct, theKey[, cols]"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure of arrays to a keyed structure of structs.
description: |
 Converts a structure of arrays to a keyed structure of structs. In other words - taking a struct where each key is an array, it converts the struct into a struct of structs, where a particular key is used as the root key.

returnValue: Returns a struct.

example: |
 <cfscript>
   mystruct = structnew();
   mystruct.name   = listtoarray("Joe,Bob,Jim");
   mystruct.weight = listtoarray("140,180,160");
   mystruct.Age    = listtoarray("25,40,33");
   mystruct.ID    = listtoarray("1,2,3");
 </cfscript>
 
 Original:
 <cfdump var="#mystruct#">
 
 <p>
 New Structure:
 <cfset new = StructOfArraysToStructOfStructs(mystruct,"ID")>
 <cfdump var="#new#">

args:
 - name: struct
   desc: Struct to examine.
   req: true
 - name: theKey
   desc: Key in structure to use as new primary key.
   req: true
 - name: cols
   desc: Keys from original structure to use. Defaults to all.
   req: false


javaDoc: |
 /**
  * Converts a structure of arrays to a keyed structure of structs.
  * 
  * @param struct      Struct to examine. (Required)
  * @param theKey      Key in structure to use as new primary key. (Required)
  * @param cols      Keys from original structure to use. Defaults to all. (Optional)
  * @return Returns a struct. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, August 2, 2003 
  */

code: |
 function StructOfArraysToStructOfStructs(struct,thekey){ 
    var i = ""; 
    var ii = ""; 
    var new = structNew();
    var value = ""; 
    var cols = "";
 
    if(arrayLen(arguments) GT 2) cols = listToArray(arguments[3]);
    else cols = structkeyarray(struct); 
 
    for(i = 1; i lte arraylen(struct[thekey]); i = i + 1){
       new[struct[thekey][i]] = structNew();
       for(ii = 1; ii lte arraylen(cols); ii = ii + 1){
       if(structKeyExists(struct,cols[ii])){
          value = struct[cols[ii]][i];
       }else{
          value = "";
       }
       new[struct[thekey][i]][cols[ii]] = value;
       }
    }
    return new;
 }

---

