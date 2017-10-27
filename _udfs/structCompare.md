---
layout: udf
title:  structCompare
date:   2005-10-14T22:18:14.000Z
library: DataManipulationLib
argString: "LeftStruct, RightStruct"
author: Ja Carter
authorEmail: ja@nuorbit.com
version: 2
cfVersion: CF5
shortDescription: Recursive functions to compare structures and arrays.
tagBased: false
description: |
 Recursive functions to compare structures and arrays. The root structure or array may contain nested structures and arrays.

returnValue: Returns a boolean.

example: |
 <cfset LeftStruct = structNew()>
 <cfset LeftStruct.Email = "test@Test.com">
 <cfset LeftStruct.Name = "test">
 <cfset LeftStruct.Struct = structNew()>
 <cfset LeftStruct.Struct.keys = arrayNew(1)>
 <cfset LeftStruct.Struct.keys[1] = "1">
 <cfset LeftStruct.Struct.keys[2] = "2">
 <cfset LeftStruct.Array = arrayNew(1)>
 <cfset LeftStruct.Array[1] = structNew()>
 <cfset LeftStruct.Array[1].id = "1">
 <cfset LeftStruct.Array[1].name = "test">
 <cfset LeftStruct.Array[2] = "321">
 
 <cfset RightStruct = structNew()>
 <cfset RightStruct.Name = "test">
 <cfset RightStruct.Email = "test@Test.com">
 <cfset RightStruct.Struct = structNew()>
 <cfset RightStruct.Struct.keys = arrayNew(1)>
 <cfset RightStruct.Struct.keys[1] = "1">
 <cfset RightStruct.Struct.keys[2] = "2">
 <cfset RightStruct.Array = arrayNew(1)>
 <cfset RightStruct.Array[1] = structNew()>
 <cfset RightStruct.Array[1].id = "1">
 <cfset RightStruct.Array[1].name = "test">
 <cfset RightStruct.Array[2] = "321">
 
 <cfdump var="#LeftStruct#">
 <cfdump var="#RightStruct#">
 <cfoutput>#structCompare(LeftStruct,RightStruct)#</cfoutput>

args:
 - name: LeftStruct
   desc: The first struct.
   req: true
 - name: RightStruct
   desc: The second structure.
   req: true


javaDoc: |
 /**
  * Recursive functions to compare structures and arrays.
  * Fix by Jose Alfonso.
  * 
  * @param LeftStruct      The first struct. (Required)
  * @param RightStruct      The second structure. (Required)
  * @return Returns a boolean. 
  * @author Ja Carter (ja@nuorbit.com) 
  * @version 2, October 14, 2005 
  */

code: |
 function structCompare(LeftStruct,RightStruct) {
     var result = true;
     var LeftStructKeys = "";
     var RightStructKeys = "";
     var key = "";
     
     //Make sure both params are structures
     if (NOT (isStruct(LeftStruct) AND isStruct(RightStruct))) return false;
 
     //Make sure both structures have the same keys
     LeftStructKeys = ListSort(StructKeyList(LeftStruct),"TextNoCase","ASC");
     RightStructKeys = ListSort(StructKeyList(RightStruct),"TextNoCase","ASC");
     if(LeftStructKeys neq RightStructKeys) return false;    
     
     // Loop through the keys and compare them one at a time
     for (key in LeftStruct) {
         //Key is a structure, call structCompare()
         if (isStruct(LeftStruct[key])){
             result = structCompare(LeftStruct[key],RightStruct[key]);
             if (NOT result) return false;
         //Key is an array, call arrayCompare()
         } else if (isArray(LeftStruct[key])){
             result = arrayCompare(LeftStruct[key],RightStruct[key]);
             if (NOT result) return false;
         // A simple type comparison here
         } else {
             if(LeftStruct[key] IS NOT RightStruct[key]) return false;
         }
     }
     return true;
 }

oldId: 1136
---

