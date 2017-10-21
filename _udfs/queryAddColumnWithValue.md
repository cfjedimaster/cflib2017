---
layout: udf
title:  queryAddColumnWithValue
date:   2005-12-13T16:42:23.000Z
library: DataManipulationLib
argString: "query, column_name[, value]"
author: Gabriele Bernuzzi
authorEmail: gabriele.bernuzzi@gruppotesi.com
version: 3
cfVersion: CF6
shortDescription: Adds a column filled with a value to a query object.
description: |
 Adds a column filled with a value to a query object.

returnValue: Returns a boolean.

example: |
 <cfset foo = queryNew("name")>
 <cfloop index="x" from="1" to="10">
     <cfset queryAddRow(foo)>
     <cfset querySetCell(foo, "name", "Name #x#")>
 </cfloop>
 
 <cfset queryAddColumnWithValue(foo, "age", "20")>
 
 <cfdump var="#foo#">

args:
 - name: query
   desc: Query to manipulate.
   req: true
 - name: column_name
   desc: Name of new column.
   req: true
 - name: value
   desc: Value to use. Defaults to nothing.
   req: false


javaDoc: |
 <!---
  Adds a column filled with a value to a query object.
  V2 by Raymond Camden
  v3 by author
  
  @param query      Query to manipulate. (Required)
  @param column_name      Name of new column. (Required)
  @param value      Value to use. Defaults to nothing. (Optional)
  @return Returns a boolean. 
  @author Gabriele Bernuzzi (gabriele.bernuzzi@gruppotesi.com) 
  @version 3, December 13, 2005 
 --->

code: |
 <cffunction name="queryAddColumnWithValue" returntype="boolean" output="false">
     <cfargument name="query" type="query" required="true" />
     <cfargument name="column_name" type="string" required="true" />
     <cfargument name="value" type="string" required="false" default="" />
     <cfset var arr=arrayNew(1) />
     
     <cfscript>
         arraySet(arr,1,arguments.query.recordCount,arguments.value);
         queryAddColumn(arguments.query, arguments.column_name, arr);
     </cfscript>
 
     <cfreturn true>
 </cffunction>

---

