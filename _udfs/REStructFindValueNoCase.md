---
layout: udf
title:  REStructFindValueNoCase
date:   2009-07-12T19:05:54.000Z
library: DataManipulationLib
argString: "top, reg_expression[, scope][, owner][, path][, results]"
author: Nathan Mische
authorEmail: nmische@gmail.com
version: 0
cfVersion: CF7
shortDescription: Searches recursively through a substructure of nested arrays, structures, and other elements for structures with values that match the search .pattern in the reg_expression parameter.
tagBased: true
description: |
 Searches recursively through a substructure of nested arrays, structures, and other elements for structures with values that match the search pattern in the reg_expression parameter. The search is case-insensitive.

returnValue: Returns an array.

example: |
 <cfscript>
 testStruct = StructNew();
 testStruct.key1 = "This is a test.";
 testStruct.key2 = ArrayNew(1);
 testStruct.key2[1] = StructNew();
 testStruct.key2[1].key1 =  "This is not a test.";
 testStruct.key2[1].key2 = "This is not a test";
 testStruct.key3 = ArrayNew(1);
 testStruct.key3[1] = "This is not a test";
 result = REStructFindValueNoCase(testStruct,'not a test$');
 </cfscript>
 <cfdump var="#result#">

args:
 - name: top
   desc: Top level structure to search.
   req: true
 - name: reg_expression
   desc: Regular expression used for search.
   req: true
 - name: scope
   desc: Scope to use for search. If one, finds the first result, otherwise returns all results. Defaults to one.
   req: false
 - name: owner
   desc: Pointer to item searched. Normally not passed. Defaults to top.
   req: false
 - name: path
   desc: Path to search for within the data. Again, normally not passed.
   req: false
 - name: results
   desc: Carries the results value and used recursively. 
   req: false


javaDoc: |
 <!---
  Searches recursively through a substructure of nested arrays, structures, and other elements for structures with values that match the search .pattern in the reg_expression parameter.
  
  @param top      Top level structure to search. (Required)
  @param reg_expression      Regular expression used for search. (Required)
  @param scope      Scope to use for search. If one, finds the first result, otherwise returns all results. Defaults to one. (Optional)
  @param owner      Pointer to item searched. Normally not passed. Defaults to top. (Optional)
  @param path      Path to search for within the data. Again, normally not passed. (Optional)
  @param results      Carries the results value and used recursively.  (Optional)
  @return Returns an array. 
  @author Nathan Mische (nmische@gmail.com) 
  @version 0, July 12, 2009 
 --->

code: |
 <cffunction name="REStructFindValueNoCase" returntype="array" output="false">
     <cfargument name="top" type="any" required="true">
     <cfargument name="reg_expression" type="string" required="true">
     <cfargument name="scope" type="string" required="false">
     <cfargument name="owner" type="any" required="false">
     <cfargument name="path" type="string" required="false">
     <cfargument name="results" type="any" required="false">
     
     <cfset var key = "">
     <cfset var i = "">
     <cfset var result="">    
     
     <!--- set default values --->
     <cfif not StructKeyExists(arguments,"scope")>
         <cfset arguments.scope = "one">
     </cfif>
     
     <cfif not StructKeyExists(arguments,"owner")>
         <cfset arguments.owner = arguments.top>
     </cfif>
     
     <cfif not StructKeyExists(arguments,"path")>
         <cfset arguments.path = "">
     </cfif>
     
     <cfif not StructKeyExists(arguments,"results")>
         <cfset arguments.results = CreateObject("java","java.util.ArrayList").init()>
     </cfif>
     
     <!--- exit if scope is "one" and we have a result --->
     <cfif CompareNoCase(arguments.scope,"one") eq 0
         and ArrayLen(arguments.results) eq 1>
                 
         <cfreturn arguments.results>
         
     </cfif>
         
     <!--- recurse or do test depending on type --->
     <cfif IsStruct(arguments.top)>    
     
         <cfloop collection="#arguments.top#" item="key">    
             <cfset REStructFindValueNoCase(arguments.top[key],arguments.reg_expression,arguments.scope,arguments.top,"#arguments.path#.#key#",arguments.results)>
         </cfloop>        
         
     <cfelseif IsArray(arguments.top)>
     
         <cfloop from="1" to="#ArrayLen(arguments.top)#" index="i">    
             <cfset REStructFindValueNoCase(arguments.top[i],arguments.reg_expression,arguments.scope,arguments.top,"#path#[#i#]",arguments.results)>
         </cfloop>
         
     <cfelseif IsSimpleValue(arguments.top)
         and IsStruct(arguments.owner)
         and REFindNoCase(arguments.reg_expression,arguments.top)>            
             
         <cfset result = StructNew()>
         <cfset result["key"] = ListLast(arguments.path,".")>
         <cfset result["owner"] = arguments.owner>
         <cfset result["path"] = arguments.path>        
         <cfset ArrayAppend(arguments.results,result)>
         
     </cfif>
         
     <cfreturn arguments.results>
             
 </cffunction>

oldId: 1994
---

