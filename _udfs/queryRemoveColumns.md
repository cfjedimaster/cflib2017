---
layout: udf
title:  queryRemoveColumns
date:   2005-03-01T17:37:29.000Z
library: DataManipulationLib
argString: "theQuery, columnsToRemove"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF5
shortDescription: Remove a list of columns from a specified query.
tagBased: true
description: |
 Remove a list of columns from a specified query, using a query of query.

returnValue: Returns a query.

example: |
 <cfset aQuery=QueryNew('first_column,second_column,third_column,fourth_column')>
 <cfset QueryAddRow(aQuery,1)>
 <cfset QuerySetCell(aQuery,'first_column',1)>
 <cfset QuerySetCell(aQuery,'second_column',2)>
 <cfset QuerySetCell(aQuery,'third_column',3)>
 <cfset QuerySetCell(aQuery,'fourth_column',4)>
 
 <cfdump var="#aQuery#">    
 <cfdump var="#queryRemoveColumns(aQuery,'second_column,third_column')#">

args:
 - name: theQuery
   desc: The query to manipulate.
   req: true
 - name: columnsToRemove
   desc: A list of columns to remove.
   req: true


javaDoc: |
 <!---
  Remove a list of columns from a specified query.
  
  @param theQuery      The query to manipulate. (Required)
  @param columnsToRemove      A list of columns to remove. (Required)
  @return Returns a query. 
  @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  @version 1, April 14, 2005 
 --->

code: |
 <cffunction name="queryRemoveColumns" output="false" returntype="query">
     <cfargument name="theQuery" type="query" required="yes">
     <cfargument name="columnsToRemove" type="string" required="yes">
     <cfset var columnList=theQuery.columnList>
     <cfset var columnPosition="">
     <cfset var c="">
     <cfset var newQuery="">
     <cfloop list="#arguments.columnsToRemove#" index="c">
         <cfset columnPosition=ListFindNoCase(columnList,c)>
         <cfif columnPosition NEQ 0>
             <cfset columnList=ListDeleteAt(columnList,columnPosition)>
         </cfif>
     </cfloop>
     <cfquery name="newQuery" dbtype="query">
         SELECT #columnList# FROM theQuery
     </cfquery>
     <cfreturn newQuery>
 </cffunction>

oldId: 1196
---

