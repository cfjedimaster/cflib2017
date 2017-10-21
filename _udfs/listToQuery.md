---
layout: udf
title:  listToQuery
date:   2009-09-09T22:32:44.000Z
library: DataManipulationLib
argString: "list[, delimiters][, column_name]"
author: Russ Spivey
authorEmail: russellspivey@gmail.com
version: 0
cfVersion: CF6
shortDescription: Converts a list to a single-column query.
description: |
 Converts a list to a single-column query.

returnValue: Returns a query.

example: |
 <cfset my_list = 'one,two'>
 <cfset my_query = listToQuery(my_list)>
 <cfdump var="#my_query#">

args:
 - name: list
   desc: List of items.
   req: true
 - name: delimiters
   desc: List delimiters. Defaults to a comma.
   req: false
 - name: column_name
   desc: Name to use for column. Defaults to column.
   req: false


javaDoc: |
 <!---
  Converts a list to a single-column query.
  
  @param list      List of items. (Required)
  @param delimiters      List delimiters. Defaults to a comma. (Optional)
  @param column_name      Name to use for column. Defaults to column. (Optional)
  @return Returns a query. 
  @author Russ Spivey (russellspivey@gmail.com) 
  @version 0, September 9, 2009 
 --->

code: |
 <cffunction name="listToQuery" access="public" returntype="query" output="false" 
     hint="Converts a list to a single-column query.">
     <cfargument name="list" type="string" required="yes" hint="List to convert.">
     <cfargument name="delimiters" type="string" required="no" default="," hint="Things that separate list elements.">
     <cfargument name="column_name" type="string" required="no" default="column" hint="Name to give query column.">
     
     <cfset var query = queryNew(arguments.column_name)>
     <cfset var index = ''>
     
     <cfloop list="#arguments.list#" index="index" delimiters="#arguments.delimiters#">
         <cfset queryAddRow(query)>
         <cfset querySetCell(query,arguments.column_name,index)>
     </cfloop>
     
     <cfreturn query>
 </cffunction>

---

