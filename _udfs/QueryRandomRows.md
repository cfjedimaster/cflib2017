---
layout: udf
title:  QueryRandomRows
date:   2002-07-10T16:36:09.000Z
library: DataManipulationLib
argString: "theQuery, NumberOfRows"
author: Shawn Seley and John King
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns specified number of random records.
tagBased: false
description: |
 Returns a query object with a specified number of random records from the passed query. Some code based on QuerySlice() by Kevin Bridges (cyberswat@orlandoartistry.com)
 
 Please note that results below will not be random due to caching at cflib.org.

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
 <CFSET Shorter = QueryRandomRows(Duplicate(Foo), 3)>
 <br>
 <CFOUTPUT>3 Random Rows...</CFOUTPUT>
 <CFDUMP VAR="#Shorter#">

args:
 - name: theQuery
   desc: The query to return random records from.
   req: true
 - name: NumberOfRows
   desc: The number of random records to return.
   req: true


javaDoc: |
 /**
  * Returns specified number of random records.
  * 
  * @param theQuery      The query to return random records from. (Required)
  * @param NumberOfRows      The number of random records to return. (Required)
  * @return Returns a query. 
  * @author Shawn Seley and John King (shawnse@aol.com) 
  * @version 1, July 10, 2002 
  */

code: |
 function QueryRandomRows(theQuery, NumberOfRows) {
     var FinalQuery      = QueryNew(theQuery.ColumnList);
     var x                = 0;
     var y               = 0;
     var i               = 0;
     var random_element  = 0;
     var random_row      = 0;
     var row_list        = "";
 
     if(NumberOfRows GT theQuery.recordcount) NumberOfRows = theQuery.recordcount;
 
     QueryAddRow(FinalQuery, NumberOfRows);
 
     // build a list of rows from which we will "scratch off" the randomly selected values in order to avoid repeats
     for (i=1; i LTE theQuery.RecordCount; i=i+1) row_list = row_list & i & ",";
 
     // Build the new query
     for(x=1; x LTE NumberOfRows; x=x+1){
         // pick a random_row from row_list and delete that element from row_list (to prevent duplicates)
         random_element  = RandRange(1, ListLen(row_list));          // pick a random list element
         random_row      = ListGetAt(row_list, random_element);      // get the corresponding query row number
         row_list        = ListDeleteAt(row_list, random_element);   // delete the used element from the list
         for(y=1; y LTE ListLen(theQuery.ColumnList); y=y+1) {
             QuerySetCell(FinalQuery, ListGetAt(theQuery.ColumnList, y), theQuery[ListGetAt(theQuery.ColumnList, y)][random_row],x);
         }
     }
 
     return FinalQuery;
 }

---

