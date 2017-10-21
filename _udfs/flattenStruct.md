---
layout: udf
title:  flattenStruct
date:   2011-09-02T19:18:24.000Z
library: DataManipulationLib
argString: "stObject[, delimiter][, prefix][, stResult][, addPrefix]"
author: Tom de Manincor
authorEmail: tomdeman@gmail.com
version: 2
cfVersion: CF6
shortDescription: Builds nested structs into a single struct.
description: |
 Recursively loops through a structure with nested structures and builds nested keys and values into a single struct.
 
 http://tomdeman.com/blog/UDFs

returnValue: Returns a structure.

example: |
 <cfscript>
     stTest = structNew();
     stTest['test_root_val'] = 1;
     stTest['EC'] = structNew();
     stTest['EC'].bCreateBeanFile = true;
     stTest['EC'].bCreateColdSpringFile = true;
     stTest['EC'].sConfigBeanObjPath = 'models.GlobalConfig';
     stTest['EC'].sColdSpringDefFilePath = '/config/GlobalConfigColdspring.xml.cfm';
     stTest['EC'].sECDefinitionFilePath = '/config/environment.xml.cfm';
     stTest['EC'].sub = structNew();
     stTest['EC']['sub'].test_sub_val = 'test';
 </cfscript>
 
 <cfdump var="#flattenStruct(stTest)#" label="result">

args:
 - name: stObject
   desc: Structure to flatten.
   req: true
 - name: delimiter
   desc: Value to use in new keys. Defaults to a period.
   req: false
 - name: prefix
   desc: Value placed in front of flattened keys. Defaults to nothing.
   req: false
 - name: stResult
   desc: Structure containing result.
   req: false
 - name: addPrefix
   desc: Boolean value that determines if prefix should be used. Defaults to true.
   req: false


javaDoc: |
 <!---
  Builds nested structs into a single struct.
  Updated v2 by author Simeon Cheeseman.
  
  @param stObject      Structure to flatten. (Required)
  @param delimiter      Value to use in new keys. Defaults to a period. (Optional)
  @param prefix      Value placed in front of flattened keys. Defaults to nothing. (Optional)
  @param stResult      Structure containing result. (Optional)
  @param addPrefix      Boolean value that determines if prefix should be used. Defaults to true. (Optional)
  @return Returns a structure. 
  @author Tom de Manincor (tomdeman@gmail.com) 
  @version 2, September 2, 2011 
 --->

code: |
 <cffunction name="flattenStruct" access="public" output="false" returntype="struct">
     <cfargument name="original" type="struct" required="true"><!--- struct to flatten --->
     <cfargument name="delimiter" required="false" type="string" default="." />
     <cfargument name="flattened" type="struct" default="#StructNew()#" required="false"><!--- result struct, returned at the end --->
     <cfargument name="prefix_string" type="string" default="" required="false"><!--- used in the processing, stores the preceding struct names in the current branch, ends in a delimeter --->
     
     <!--- get this level's elements --->
     <cfset var names = StructKeyArray(original)>
     <cfset var name = "">
     
     <cfloop array="#names#" index="name">
         <!--- add name --->
         <cfif IsStruct(original[name])>
             <cfset flattened = flattenStruct(original[name], delimiter, flattened, prefix_string & name & delimiter)>
         <cfelse>
             <cfset flattened[prefix_string & name] = original[name]>
         </cfif>
     </cfloop>
     
     <cfreturn flattened>
 </cffunction>

---

