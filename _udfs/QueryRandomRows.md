---
layout: udf
title:  QueryRandomRows
date:   2002-07-10T16:36:09.000Z
library: DataManipulationLib
argString: "theQuery, NumberOfRows"
author: James Moberg
authorEmail: james@sunstarmedia.com
version: 2
cfVersion: CF10
shortDescription: Returns specified number of random records.
tagBased: false
description: |
 Returns a query object with a specified number of random records from the passed query. Some code based on QuerySlice() by Kevin Bridges (cyberswat@orlandoartistry.com)
 

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
  * @author James Moberg (james@sunstarmedia.com)
  * @version 1, July 10, 2002 
  * @version 2, January 16, 2018 by James Moberg (sunstarmedia.com)
    Update to CFFunction to avoid older Q-of-Q bugs. Dupe query, add temporary & random column value and requery w/max rows 
  */

code: |
 <CFFUNCTION NAME="QueryRandomRows" returntype="query" output="false" hint="Returns a randomized query">
     <CFARGUMENT NAME="theQuery" TYPE="query" REQUIRED="yes" HINT="database query">
     <CFARGUMENT NAME="NumberOfRows" TYPE="numeric" DEFAULT="5" REQUIRED="yes" HINT="maximum number of records to return">
     <CFSET var Temp = {
         FinalQuery = Duplicate(Arguments.theQuery),
         RandomColName = "Random#GetTickCount()#",
         thisRow = 0,
         MaxRows = VAL(Arguments.NumberOfRows),
         RandomPositions = []
     }>
     <CFIF Temp.FinalQuery.RecordCount LT Temp.MaxRows>
         <CFSET Temp.MaxRows = Temp.FinalQuery.RecordCount>
     </CFIF>
     <CFIF Temp.FinalQuery.RecordCount GT 1>
         <!--- Pick Random Position; generate array w/indexes, shuffle, the pick first X array items --->
         <CFLOOP FROM="1" TO="#Temp.FinalQuery.RecordCount#" INDEX="Temp.thisRow">
             <CFSET ArrayAppend(Temp.RandomPositions, JavaCast("int", Temp.thisRow))>
         </CFLOOP>
         <CFSET CreateObject("java", "java.util.Collections").Shuffle(Temp.RandomPositions)>
         <CFSET Temp.RandomPositions = Temp.RandomPositions.subList(0, Temp.MaxRows)>
         <!--- Add RandomX column to selected query rows, insert random values, requery & remove randomX column --->
         <CFSET QueryAddColumn(Temp.FinalQuery, Temp.RandomColName, "INTEGER", ArrayNew(1))>
         <CFLOOP ARRAY="#Temp.RandomPositions#" INDEX="Temp.thisRow">
             <CFSET Temp.FinalQuery[Temp.RandomColName][Temp.ThisRow] = javacast("int", RandRange(1, 2147483647, "SHA1PRNG"))>
         </CFLOOP>
         <CFQUERY NAME="Temp.FinalQuery" DBTYPE="query" MAXROWS="#Temp.MaxRows#">SELECT #Arguments.theQuery.ColumnList#
         FROM Temp.FinalQuery
         ORDER BY #Temp.RandomColName# DESC</CFQUERY>
     </CFIF>
     <CFReturn Temp.FinalQuery>
 </CFFUNCTION>

oldId: 524
---

