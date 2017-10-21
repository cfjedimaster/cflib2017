---
layout: udf
title:  QuerySort
date:   2002-10-15T13:24:42.000Z
library: DataManipulationLib
argString: "query, column[, sortDir ]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Sorts a query using Query of Query.
description: |
 Sorts a query using Query of Query.

returnValue: Returns a query.

example: |
 <cfquery name="getit" datasource="cflib" maxrows=4>
     select name,id from tblUDFs
     order by id desc
 </cfquery>
 <cfdump var="#getIt#" label="Before Sort">
 <cfdump var="#querySort(getit,"name")#" label="After Sort">

args:
 - name: query
   desc: The query to sort.
   req: true
 - name: column
   desc: The column to sort on.
   req: true
 - name: sortDir 
   desc: The direction of the sort. Default is "ASC."
   req: false


javaDoc: |
 <!---
  Sorts a query using Query of Query.
  Updated for CFMX var syntax.
  
  @param query      The query to sort. (Required)
  @param column      The column to sort on. (Required)
  @param sortDir       The direction of the sort. Default is "ASC." (Optional)
  @return Returns a query. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, October 15, 2002 
 --->

code: |
 <cffunction name="QuerySort" output="no" returnType="query">
     <cfargument name="query" type="query" required="true">
     <cfargument name="column" type="string" required="true">
     <cfargument name="sortDir" type="string" required="false" default="asc">
 
     <cfset var newQuery = "">
     
     <cfquery name="newQuery" dbType="query">
         select * from query
         order by #column# #sortDir#
     </cfquery>
     
     <cfreturn newQuery>
     
 </cffunction>

---

