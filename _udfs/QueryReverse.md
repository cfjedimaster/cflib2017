---
layout: udf
title:  QueryReverse
date:   2002-06-27T13:58:20.000Z
library: DataManipulationLib
argString: "qryOriginal"
author: David Whiterod
authorEmail: whiterod.david@saugov.sa.gov.au
version: 1
cfVersion: CF5
shortDescription: Reverse the order of a query.
description: |
 Pass this function a query it will return a new one in reverse order (make first row the last and last row the first - in a new query).

returnValue: Returns a query object.

example: |
 <CFSET Foo = QueryNew("name,age,rank")>
 <CFLOOP INDEX="X" FROM=1 TO=10>
   <CFSET QueryAddRow(Foo)>
   <CFSET QuerySetCell(Foo,"name","Random Name #X#")>
   <CFSET QuerySetCell(Foo,"age",RandRange(20,50))>
   <CFSET QuerySetCell(Foo,"rank",RandRange(1,10))>
 </CFLOOP>
 
 Original...<BR>
 <CFDUMP VAR="#Foo#">
 <P>
 <CFSET Reverse = QueryReverse(Foo)>
 Reverse...<BR>
 <CFDUMP VAR="#Reverse#">

args:
 - name: qryOriginal
   desc: Name of the query you want to reverse
   req: true


javaDoc: |
 /**
  * Reverse the order of a query.
  * 
  * @param qryOriginal      Name of the query you want to reverse (Required)
  * @return Returns a query object. 
  * @author David Whiterod (whiterod.david@saugov.sa.gov.au) 
  * @version 1, June 27, 2002 
  */

code: |
 function QueryReverse (qryOriginal) {
     
   // Reverse the order of qryOriginal
   // Make a new query using the same columns as qryOriginal
   var qryNew = QueryNew(qryOriginal.ColumnList);
   var row = 1;
   var column = 1;
   //Loop through qryOriginal in reverse order (last becomes first)
   for(row=qryOriginal.recordCount;row gte 1; row=row-1) {
     //Add a new row in the new query
     QueryAddRow(qryNew,1);
     //Get the values for each column in qryOriginal
     for(column=1;column lte ListLen(qryOriginal.ColumnList);column=column+1) {
       QuerySetCell(qryNew, ListGetAt(qryOriginal.ColumnList,column), qryOriginal[ListGetAt(qryOriginal.ColumnList,column)][row]);
     }
   }
   
   return qryNew;
   
 }

---

