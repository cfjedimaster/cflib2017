---
layout: udf
title:  querySetRow
date:   2005-10-19T03:53:11.000Z
library: DataManipulationLib
argString: "query, columnlist, valuelist[, rownumber][, delimiter][, trimElements]"
author: Ell Cord
authorEmail: lunareclipse13@earthlink.net
version: 1
cfVersion: CF6
shortDescription: Sets the values for one or more columns in the specified query row.
description: |
 This function allows you to set the values for multiple columns in the specified query row, with a single function call.  If a row number is not specified, the column values will be appended to the end of the query as a new row.  Useful for development.  Similar to using QueryAddRow() plus multiple QuerySetCell() calls.

returnValue: Returns void..

example: |
 <!--- add (3) new rows to a query --->
 <cfset myQuery = QueryNew("UserID,FirstName,LastName,UserName")>
 <cfset QuerySetRow(myQuery, "UserID,FirstName,LastName,UserName", "1,Amelia,Jones,ajones")>
 <cfset QuerySetRow(myQuery, "UserID,FirstName,LastName,UserName", "2,Roberta,Freeman,rfreeman")>
 <cfset QuerySetRow(myQuery, "UserID,FirstName,LastName,UserName", "3,Harriet, Adams ,hadams")>
 <cfdump var="#myQuery#">
 
 <!--- update the column values for row number (2) --->
 <cfset QuerySetRow(myQuery, "FirstName,UserName", "Alfred,AAfreeman", 2)>
 <cfdump var="#myQuery#">

args:
 - name: query
   desc: Query to manipulate.
   req: true
 - name: columnlist
   desc: List of columns to update.
   req: true
 - name: valuelist
   desc: Values for the new data.
   req: true
 - name: rownumber
   desc: Row number to modify. If not specified, row is added to end of query.
   req: false
 - name: delimiter
   desc: Delimiter for columnlist and valuelist. Defaults to a comma.
   req: false
 - name: trimElements
   desc: If true, trims all values. Defaults to true.
   req: false


javaDoc: |
 <!---
  Sets the values for one or more columns in the specified query row.
  
  @param query      Query to manipulate. (Required)
  @param columnlist      List of columns to update. (Required)
  @param valuelist      Values for the new data. (Required)
  @param rownumber      Row number to modify. If not specified, row is added to end of query. (Optional)
  @param delimiter      Delimiter for columnlist and valuelist. Defaults to a comma. (Optional)
  @param trimElements      If true, trims all values. Defaults to true. (Optional)
  @return Returns void.. 
  @author Ell Cord (lunareclipse13@earthlink.net) 
  @version 1, October 18, 2005 
 --->

code: |
 <cffunction name="querySetRow" returntype="void" output="false">
     <cfargument name="query" type="query" required="true" />
     <cfargument name="columnList" type="string" required="true" />
     <cfargument name="valuesList" type="string" required="true" />
     <cfargument name="rowNumber" type="numeric" required="false" default="0" />
     <cfargument name="delimiter" type="string" required="false"  default="," />
     <cfargument name="trimElements" type="boolean" required="false"  default="true" />
     
     <cfset var i            = 0>
     <cfset var col           = "">
     <cfset var value    = "">
     
     <cfif arguments.rowNumber gt 0 and arguments.rowNumber gt arguments.query.recordCount>
         <cfthrow type="InvalidArgument" message="Invalid rowNumber [#arguments.rowNumber#]. The specified query contains [#arguments.query.RecordCount#] records.">
     </cfif>    
     <cfif ListLen(arguments.columnList, arguments.delimiter) NEQ ListLen(arguments.valuesList, arguments.delimiter)>
         <cfthrow type="InvalidArgument" message="[columnList] and [valuesList] do not contain the same number of elements.">
     </cfif>    
     
     <cfscript>
         //by default, append new row to end of query
         if (val(arguments.rowNumber) lt 1) {
             QueryAddRow(arguments.query, 1);
             rowNumber = arguments.query.recordCount;
         }
         
         //set values for each column
         for (i = 1; i lte ListLen(arguments.columnList, arguments.delimiter); i = i + 1) {
             if (arguments.trimElements) {    
                 col   = Trim(ListGetAt(arguments.columnList, i, arguments.delimiter));    
                 value = Trim(ListGetAt(arguments.valuesList, i, arguments.delimiter));    
             }
             else {
                 col   = ListGetAt(arguments.columnList, i, arguments.delimiter);    
                 value = ListGetAt(arguments.valuesList, i, arguments.delimiter);    
             }
             query[col][arguments.rowNumber] = value;
         }
     </cfscript>
 </cffunction>

---

