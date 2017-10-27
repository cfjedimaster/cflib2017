---
layout: udf
title:  arrayCompare
date:   2004-09-23T10:17:14.000Z
library: DataManipulationLib
argString: "LeftArray, RightArray"
author: Ja Carter
authorEmail: ja@nuorbit.com
version: 1
cfVersion: CF5
shortDescription: Recursive functions to compare arrays and nested structures.
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
 - name: LeftArray
   desc: The first array.
   req: true
 - name: RightArray
   desc: The second array.
   req: true


javaDoc: |
 /**
  * Recursive functions to compare arrays and nested structures.
  * 
  * @param LeftArray      The first array. (Required)
  * @param RightArray      The second array. (Required)
  * @return Returns a boolean. 
  * @author Ja Carter (ja@nuorbit.com) 
  * @version 1, September 23, 2004 
  */

code: |
 function arrayCompare(LeftArray,RightArray) {
     var result = true;
     var i = "";
     
     //Make sure both params are arrays
     if (NOT (isArray(LeftArray) AND isArray(RightArray))) return false;
     
     //Make sure both arrays have the same length
     if (NOT arrayLen(LeftArray) EQ arrayLen(RightArray)) return false;
     
     // Loop through the elements and compare them one at a time
     for (i=1;i lte arrayLen(LeftArray); i = i+1) {
         //elements is a structure, call structCompare()
         if (isStruct(LeftArray[i])){
             result = structCompare(LeftArray[i],RightArray[i]);
             if (NOT result) return false;
         //elements is an array, call arrayCompare()
         } else if (isArray(LeftArray[i])){
             result = arrayCompare(LeftArray[i],RightArray[i]);
             if (NOT result) return false;
         //A simple type comparison here
         } else {
             if(LeftArray[i] IS NOT RightArray[i]) return false;
         }
     }
     
     return true;
 }

oldId: 1210
---

