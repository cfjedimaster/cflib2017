---
layout: udf
title:  qryOrderToTable
date:   2010-03-07T03:39:39.000Z
library: DatabaseLib
argString: "theQuery[, tableCols]"
author: Jose Alberto Guerra
authorEmail: cheveguerra@gmail.com
version: 0
cfVersion: CF5
shortDescription: Change query order from horizontal to vertical to display in a HTML table
description: |
 When filling an HTML table with a query result, it will display the query horizontally (cell, cell, next_row, cell cell ...), this UDF will change the order of the query to display vertically (row, row, row, next_column, row, row ...)

returnValue: Returns a query.

example: |
 <cfset tempQry=QueryNew("x")>
 <cfset temp = QueryAddRow(tempQry, 60)>
 <cfloop index="i" from="1" to="60"><cfset temp = QuerySetCell(tempQry, "x", i, i)></cfloop>
 <cfset qryNew=qryOrderToTable(tempQry, 4)>
 <cfoutput>
     <table border><cfset cont=0>
         <tr><cfloop query="qryNew"><cfset cont=cont+1><td>#x#</td><cfif cont eq 4></tr><tr><cfset cont=0></cfif></cfloop></tr>
     </table>
 </cfoutput>

args:
 - name: theQuery
   desc: cfquery object to "rotate"
   req: true
 - name: tableCols
   desc: Number of columns to output
   req: false


javaDoc: |
 <!---
  Change query order from horizontal to vertical to display in a HTML table
  
  @param theQuery      cfquery object to "rotate" (Required)
  @param tableCols      Number of columns to output (Optional)
  @return Returns a query. 
  @author Jose Alberto Guerra (cheveguerra@gmail.com) 
  @version 0, March 6, 2010 
 --->

code: |
 <cffunction name="qryOrderToTable" returntype="query" hint="Changes horizontal order to vertical in a query to display in a HTML table" output="no">
     <cfargument name="theQuery" type="query" required="yes">
     <cfargument name="tableCols" type="numeric" default="2">
     <cfset var change=ceiling(theQuery.recordCount/tableCols)>
     <cfset var column=0>
     <cfset var newQry=QueryNew("#theQuery.columnList#")>
     <cfset var temp = QueryAddRow(newQry, theQuery.recordCount)>
     <cfset var thisRow=0>
     <cfset var c=0>
     <cfset var newPos=0>
     <cfset var thisCol=0>
 
     <cfoutput query="theQuery">
         <cfset thisRow=currentRow>
         <cfloop index="c" from="1" to="#tableCols#">
             <cfif currentRow gt (change*c)><cfset column=c><cfset thisRow=currentRow-(change*c)></cfif>
         </cfloop>
         <cfset newPos=thisRow+column+((thisRow-1)*(tableCols-1))>
         <cfloop index="thisCol" list="#theQuery.columnList#">
             <cfset temp = QuerySetCell(newQry, thisCol, evaluate(thisCol), newPos)>
         </cfloop>
     </cfoutput>
     <cfreturn newQry>
 </cffunction>

---

