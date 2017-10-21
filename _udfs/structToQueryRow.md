---
layout: udf
title:  structToQueryRow
date:   2008-04-25T17:03:59.000Z
library: DataManipulationLib
argString: "query, struct"
author: Brian Rinaldi
authorEmail: brian.rinaldi@gmail.com
version: 1
cfVersion: CF6
shortDescription: Adds a row to a query object and populates it with the values of a structure.
description: |
 Adds a row to a query object and populates it with the values of a structure.

returnValue: returns the query with the added row

example: |
 <cfset qry = queryNew("my,column,names") />
 
 <cfset s = structNew() />
 <cfset s.my = "foo" />
 <cfset s.column = "bar" />
 <cfset s.names = "goo" />
 
 <cfset q = structToQueryRow(qry ,s) />
 <cfdump var="#q#">

args:
 - name: query
   desc: the query to which the struct should be added as a row to
   req: true
 - name: struct
   desc: the struct that will be added to the query as a query row
   req: true


javaDoc: |
 <!---
  Adds a row to a query object and populates it with the values of a structure.
  
  @param query      the query to which the struct should be added as a row to (Required)
  @param struct      the struct that will be added to the query as a query row (Required)
  @return returns the query with the added row 
  @author Brian Rinaldi (brian.rinaldi@gmail.com) 
  @version 1, April 25, 2008 
 --->

code: |
 <cffunction name="structToQueryRow" output="false" access="public" returntype="query">
     <cfargument name="query" required="true" type="query" />
     <cfargument name="struct" required="true" type="struct" />
     <cfset var item = "" />
     <cfset var returnQ = arguments.query />
 
     <cfset queryAddRow(arguments.query) />
     
     <cfloop collection="#arguments.struct#" item="item">
         <cfif listFindNoCase(returnQ.columnList,item)>
             <cfset querySetCell(returnQ,item,arguments.struct[item]) />
         </cfif>
     </cfloop>
     
     <cfreturn returnQ />
 </cffunction>

---

