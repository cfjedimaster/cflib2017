---
layout: udf
title:  arrayOfStructsToStructsOfStructs
date:   2009-06-11T23:27:25.000Z
library: DataManipulationLib
argString: "array, key"
author: Tayo Akinmade
authorEmail: olusina@hotmail.com
version: 0
cfVersion: CF6
shortDescription: Converts an array of structures to an structure of structures,
tagBased: true
description: |
 This UDF accepts an array of structures and converts it to a structure of structures.
 
 It accepts an array of structures and a key as mandatory arguments. The key must exist in all structures in the array

returnValue: Returns a struct.

example: |
 <cfset aArray = arrayNew(1)>
 
 <cfset stStruct1 = structNew()>
 <cfset stStruct1.name = "Micheal">
 <cfset stStruct1.age = 20>
 
 <cfset stStruct2 = structNew()>
 <cfset stStruct2.name = "Smidt">
 <cfset stStruct2.age = 25>
 
 <cfset aArray[1] = stStruct1>
 <cfset aArray[2] = stStruct2>
 
 <cfset stStructOfStructs = ArrayOfStructsToStructsOfStructs(array=aArray,key="name"))>
 <cfdump var="#stStructofStructs#">

args:
 - name: array
   desc: An array of structs.
   req: true
 - name: key
   desc: A key value to use for the new structure. Must exist in all structs in the array.
   req: true


javaDoc: |
 <!---
  Converts an array of structures to an structure of structures,
  
  @param array      An array of structs. (Required)
  @param key      A key value to use for the new structure. Must exist in all structs in the array. (Required)
  @return Returns a struct. 
  @author Tayo Akinmade (olusina@hotmail.com) 
  @version 0, June 11, 2009 
 --->

code: |
 <cffunction name="ArrayOfStructsToStructsOfStructs" access="public" output="false" returntype="struct" hint="Converts an array of structs to an struct of structs">
         <cfargument name="array" type="array" required="true" hint="An array of structures">
         <cfargument name="key" type="string" required="true" hint="Key to use">
         
         <cfscript>
             var stStructOfStructs = structNew();
             var i = 0;
             
             // loop over array
             for(i=1;i lte arrayLen(arguments.array);i=i+1){
                 stStructOfStructs[arguments.array[i][arguments.key]] = arguments.array[i];
             }
             
             return stStructOfStructs;
             
         </cfscript>        
     </cffunction>

oldId: 1929
---

