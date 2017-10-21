---
layout: udf
title:  saTOss
date:   2003-06-12T18:14:33.000Z
library: DataManipulationLib
argString: "struct, theKey[, cols]"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure of arrays into a name/key style structure.
description: |
 Converts a structure of arrays into a name/key style structure. For example, if the structure contains three keys, each arrays, named age, ID, and name, you can ask this UDF to return a new structure where the keys are based on ID. Each item in the ID array will be a key of the new struct. Each key will be a struct containing each of the keys from the previous structure, along with the corresponding data. In other words, oldStruct.name[X] will equal newStruct[id].name.
  Optional param to specify which columns each keyed structure will contain.

returnValue: Returns a structure.

example: |
 <cfscript>
 mystruct = structnew();
 mystruct.ID = listtoarray("400,100,500");
 mystruct.Name = listtoarray("Joe,John,Jake");
 mystruct.Age = listtoarray("35,25,29");
 </cfscript>
 <cfset myStruct = saTOss(mystruct,"ID")>
 <cfdump var="#myStruct#">

args:
 - name: struct
   desc: Structure to convert.
   req: true
 - name: theKey
   desc: Struct key used to define new struct.
   req: true
 - name: cols
   desc: Keys to include in new structure.
   req: false


javaDoc: |
 /**
  * Converts a structure of arrays into a name/key style structure.
  * 
  * @param struct      Structure to convert. (Required)
  * @param theKey      Struct key used to define new struct. (Required)
  * @param cols      Keys to include in new structure. (Optional)
  * @return Returns a structure. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, June 12, 2003 
  */

code: |
 function saTOss(struct,thekey){
     var x = "";
     var i = ""; 
     var ii = ""; 
     var new = structnew();
     var cols = structkeyarray(Struct); 
 
     if(arrayLen(arguments) GT 2) cols = listToArray(arguments[3]);
     
     for(i = 1; i lte arraylen(Struct[thekey]); i = i + 1){
         new[Struct[thekey][i]] = structnew();
         for(ii = 1; ii lte arraylen(cols); ii = ii + 1){
             new[Struct[thekey][i]][cols[ii]] = Struct[cols[ii]][i];
         }
     }
     return new;
 }

---

