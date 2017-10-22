---
layout: udf
title:  QueryDeleteRows
date:   2001-10-11T11:09:58.000Z
library: DataManipulationLib
argString: "Query, Rows"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF5
shortDescription: Removes rows from a query.
tagBased: false
description: |
 This function will allow you to remove rows from a query. You can either remove one row or a list of rows.

returnValue: This function returns a query.

example: |
 <CFSET Query = QueryNew("id,name,age")>
 <CFLOOP INDEX="X" FROM=1 TO=8>
 <CFSET QueryAddRow(Query,1)>
 <CFSET QuerySetCell(Query,"ID",X,X)>
 <CFSET QuerySetCell(Query,"Name","Name #X#",X)>
 <CFSET QuerySetCell(Query,"Age",X+15,X)>
 </CFLOOP>
 Before deleting<BR>
 <CFDUMP VAR="#Query#">
 <CFSET Query = QueryDeleteRows(Query,"1,3")>
 <P>After removing rows 1 and 3<BR>
 <CFDUMP VAR="#Query#">
 <P>After removing row 3<BR>
 <CFSET Query = QueryDeleteRows(Query,3)>
 <CFDUMP VAR="#Query#">

args:
 - name: Query
   desc: Query to be modified
   req: true
 - name: Rows
   desc: Either a number or a list of numbers
   req: true


javaDoc: |
 /**
  * Removes rows from a query.
  * Added var col = "";
  * No longer using Evaluate. Function is MUCH smaller now.
  * 
  * @param Query      Query to be modified 
  * @param Rows      Either a number or a list of numbers 
  * @return This function returns a query. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 2, October 11, 2001 
  */

code: |
 function QueryDeleteRows(Query,Rows) {
     var tmp = QueryNew(Query.ColumnList);
     var i = 1;
     var x = 1;
 
     for(i=1;i lte Query.recordCount; i=i+1) {
         if(not ListFind(Rows,i)) {
             QueryAddRow(tmp,1);
             for(x=1;x lte ListLen(tmp.ColumnList);x=x+1) {
                 QuerySetCell(tmp, ListGetAt(tmp.ColumnList,x), query[ListGetAt(tmp.ColumnList,x)][i]);
             }
         }
     }
     return tmp;
 }

---

