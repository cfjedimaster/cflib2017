---
layout: udf
title:  QuerySlice
date:   2005-05-23T22:46:05.000Z
library: DataManipulationLib
argString: "theQuery, StartRow, NumberOfRows[, ColumnList]"
author: Kevin Bridges
authorEmail: cyberswat@orlandoartistry.com
version: 2
cfVersion: CF6
shortDescription: Returns specific number of records starting with a specific row.
tagBased: true
description: |
 Pass this function a query and tell it what row to start with and how many rows to return.  Good beginning for previous/next functionality.

returnValue: Returns a query.

example: |
 <CFSET Foo = QueryNew("name,age,rank")>
 <CFLOOP INDEX="X" FROM=1 TO=10>
     <CFSET QueryAddRow(Foo)>
     <CFSET QuerySetCell(Foo,"name","Random Name #X#")>
     <CFSET QuerySetCell(Foo,"age",RandRange(20,50))>
     <CFSET QuerySetCell(Foo,"rank",RandRange(1,10))>
 </CFLOOP>
 <CFOUTPUT>Original...</CFOUTPUT>
 <CFDUMP VAR="#Foo#">
 <CFSET Shorter = QuerySlice(Duplicate(Foo), 2, 5)>
 <CFOUTPUT>Shorter...</CFOUTPUT>
 <CFDUMP VAR="#Shorter#">

args:
 - name: theQuery
   desc: The query to work with.
   req: true
 - name: StartRow
   desc: The row to start on.
   req: true
 - name: NumberOfRows
   desc: The number of rows to return.
   req: true
 - name: ColumnList
   desc: List of columns to return. Defaults to all the columns.
   req: false


javaDoc: |
 <!---
  Returns specific number of records starting with a specific row.
  Renamed by RCamden
  Version 2 with column name support by Christopher Bradford, christopher.bradford@aliveonline.com
  
  @param theQuery      The query to work with. (Required)
  @param StartRow      The row to start on. (Required)
  @param NumberOfRows      The number of rows to return. (Required)
  @param ColumnList      List of columns to return. Defaults to all the columns. (Optional)
  @return Returns a query. 
  @author Kevin Bridges (cyberswat@orlandoartistry.com) 
  @version 2, May 23, 2005 
 --->

code: |
 <cffunction name="QuerySliceAndDice" returntype="query" output="false">
     <cfargument name="theQuery" type="query" required="true" />
     <cfargument name="StartRow" type="numeric" required="true" />
     <cfargument name="NumberOfRows" type="numeric" required="true" />
     <cfargument name="ColumnList" type="string" required="false" default="" />
     
     <cfscript>
         var FinalQuery = "";
         var EndRow = StartRow + NumberOfRows;
         var counter = 1;
         var x = "";
         var y = "";
     
         if (arguments.ColumnList IS "") {
             arguments.ColumnList = theQuery.ColumnList;
         }
         FinalQuery = QueryNew(arguments.ColumnList);
             
         if(EndRow GT theQuery.recordcount) {
             EndRow = theQuery.recordcount+1;
         }
         
         QueryAddRow(FinalQuery,EndRow - StartRow);
         
         for(x = 1; x LTE theQuery.recordcount; x = x + 1){
             if(x GTE StartRow AND x LT EndRow) {
                 for(y = 1; y LTE ListLen(arguments.ColumnList); y = y + 1) {
                     QuerySetCell(FinalQuery, ListGetAt(arguments.ColumnList, y), theQuery[ListGetAt(arguments.ColumnList, y)][x],counter);
                 }
                 counter = counter + 1;
             }
         }
             
         return FinalQuery;
     </cfscript>
     
 </cffunction>

---

