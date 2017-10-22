---
layout: udf
title:  Dump
date:   2002-10-16T11:21:55.000Z
library: CFMLLib
argString: "var[, expand][, label][, top]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Mimics the cfdump tag.
tagBased: true
description: |
 Mimics the cfdump tag, but adds new &quot;top&quot; attribute.

returnValue: Returns a string.

example: |
 <cfset x = arraynew(1)>
 <cfloop index="y" from=1 to=200>
     <cfset x[y] = randRange(1,1000)>
 </cfloop>
 
 <cfscript>
 dump(var=x,label="The Array X",top=10);
 </cfscript>

args:
 - name: var
   desc: The variable to dump.
   req: true
 - name: expand
   desc: Expand output. Defaults to true.
   req: false
 - name: label
   desc: Label for dump.
   req: false
 - name: top
   desc: Restricts output based on type. If array or query, top will represent the number of rows to show. If structure, will show this many keys.
   req: false


javaDoc: |
 <!---
  Mimics the cfdump tag.
  Updated for final cfmx var scope - also, we only redo var if size bigger than top.
  
  @param var      The variable to dump. (Required)
  @param expand      Expand output. Defaults to true. (Optional)
  @param label      Label for dump. (Optional)
  @param top      Restricts output based on type. If array or query, top will represent the number of rows to show. If structure, will show this many keys. (Optional)
  @return Returns a string. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, October 16, 2002 
 --->

code: |
 <cffunction name="dump" returnType="string">
     <cfargument name="var" type="any" required="true">
     <cfargument name="expand" type="boolean" required="false" default="true">
     <cfargument name="label" type="string" required="false" default="">
     <cfargument name="top" type="numeric" required="false">
     
     <!--- var --->
     <cfset var type = "">
     <cfset var tempArray = arrayNew(1)>
     <cfset var temp_x = 1>
     <cfset var tempStruct = structNew()>
     <cfset var orderedKeys = "">
     <cfset var tempQuery = queryNew("")>
     <cfset var col = "">
     
     <!--- do filtering if top ---->
     <cfif isDefined("top")>
     
         <cfif isArray(var)>
             <cfset type = "array">
         </cfif>
         <cfif isStruct(var)>
             <cfset type="struct">
         </cfif>
         <cfif isQuery(var)>
             <cfset type="query">
         </cfif>
         
         <cfswitch expression="#type#">
         
             <cfcase value="array">
                 <cfif arrayLen(var) gt top>
                     <cfloop index="temp_x" from=1 to="#Min(arrayLen(var),top)#">
                         <cfset tempArray[temp_x] = var[temp_x]>
                     </cfloop>
                     <cfset var = tempArray>
                 </cfif>
             </cfcase>
             
             <cfcase value="struct">
                 <cfif listLen(structKeyList(var)) gt top>
                     <cfset orderedKeys = listSort(structKeyList(var),"text")>
                     <cfloop index="temp_x" from=1 to="#Min(listLen(orderedKeys),top)#">
                         <cfset tempStruct[listGetAt(orderedKeys,temp_x)] = var[listGetAt(orderedKeys,temp_x)]>
                     </cfloop>
                     <cfset var = tempStruct>
                 </cfif>
             </cfcase>
             
             <cfcase value="query">
                 <cfif var.recordCount gt top>
                     <cfset tempQuery = queryNew(var.columnList)>
                     <cfloop index="temp_x" from=1 to="#min(var.recordCount,top)#">
                         <cfset queryAddRow(tempQuery)>
                         <cfloop index="col" list="#var.columnList#">
                             <cfset querySetCell(tempQuery,col,var[col][temp_x])>
                         </cfloop>
                     </cfloop>
                     <cfset var = tempQuery>
                 </cfif>
             </cfcase>
             
         </cfswitch>
         
     </cfif>
     
     <cfdump var="#var#" expand="#expand#" label="#label#">
 </cffunction>

---

