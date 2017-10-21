---
layout: udf
title:  QueryTranspose
date:   2005-08-24T14:39:36.000Z
library: DataManipulationLib
argString: "inputQuery[, includeHeaders]"
author: Glenn Buteau
authorEmail: glenn.buteau@rogers.com
version: 1
cfVersion: CF6
shortDescription: Transpose a query.
description: |
 Transpose a 2D query, turning rows into columns and columns into rows. Original column headers can be turned on or off.

returnValue: Returns a query.

example: |
 <cfset myQuery = QueryTranspose(myQuery)>

args:
 - name: inputQuery
   desc: The query to transpose.
   req: true
 - name: includeHeaders
   desc: Determines if headers should be included as a column. Defaults to true.
   req: false


javaDoc: |
 <!---
  Transpose a query.
  
  @param inputQuery      The query to transpose. (Required)
  @param includeHeaders      Determines if headers should be included as a column. Defaults to true. (Optional)
  @return Returns a query. 
  @author Glenn Buteau (glenn.buteau@rogers.com) 
  @version 1, August 24, 2005 
 --->

code: |
 <cffunction name="queryTranspose" returntype="query">
     <cfargument name="inputQuery" type="query" required="true">
     <cfargument name="includeHeaders" type="boolean" default="true" required="false">
         
     <cfset var outputQuery = QueryNew("")>
     <cfset var columnsList = inputQuery.ColumnList>
     <cfset var newColumn = ArrayNew(1)>
     <cfset var row = 1>
     <cfset var zeroString = "000000">
     <cfset var padFactor = int(log10(inputQuery.recordcount)) + 1 >
     <cfset var i = "">
         
     <cfif includeHeaders>
         <cfset queryAddColumn(OutputQuery,"col_#right(zeroString & row, padFactor)#",listToArray(ColumnsList))>
         <cfset row = row + 1>
     </cfif>    
 
     <cfloop query="inputQuery">
         <cfloop index="i" from="1" to="#listlen(columnsList)#">
             <cfset newColumn[i] = inputQuery[ListGetAt(columnsList, i)][currentRow]>
         </cfloop>
         <cfset queryAddColumn(outputQuery,"col_#right(zeroString & row, padFactor)#",newColumn)>
         <cfset row = row + 1>
     </cfloop>
     
     <cfreturn outputQuery>
 </cffunction>

---

