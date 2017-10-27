---
layout: udf
title:  queryConcat
date:   2006-02-23T12:54:00.000Z
library: DataManipulationLib
argString: "[q1][, q2]"
author: Chris Dary
authorEmail: umbrae@gmail.com
version: 1
cfVersion: CF5
shortDescription: Concatenate two queries together.
tagBased: false
description: |
 Appends queryTwo to queryOne. Sorting is ignored - queryTwo is appended to the end of queryOne. Note that both queries must have the same columns.

returnValue: Returns a query.

example: |
 cols = "sName,sAge";
 heads = "First Name,Age";
 
 q1 = queryNew(cols);
 queryAddRow(q1,2);
 querySetCell(q1,"sName","Joe",1);
 querySetCell(q1,"sAge","25",1);
 querySetCell(q1,"sName","John",2);
 querySetCell(q1,"sAge","30",2);
 
 q2 = queryNew(cols);
 queryAddRow(q2,2);
 querySetCell(q2,"sName","Kassi",1);
 querySetCell(q2,"sAge","19",1);
 querySetCell(q2,"sName","Mary",2);
 querySetCell(q2,"sAge","20",2);
 </cfscript>
 
 <cfdump var="#q1#">
 <cfdump var="#q2#">
 <br><br>
 Resulting query
 <br>
 <cfset resultQuery = queryConcat(q1, q2)>
 <cfdump var="#resultQuery#">

args:
 - name: q1
   desc: First query.
   req: false
 - name: q2
   desc: Second query.
   req: false


javaDoc: |
 /**
  * Concatenate two queries together.
  * 
  * @param q1      First query. (Optional)
  * @param q2      Second query. (Optional)
  * @return Returns a query. 
  * @author Chris Dary (umbrae@gmail.com) 
  * @version 1, February 23, 2006 
  */

code: |
 function queryConcat(q1,q2) {
     var row = "";
     var col = "";
 
     if(q1.columnList NEQ q2.columnList) {
         return q1;
     }
 
     for(row=1; row LTE q2.recordCount; row=row+1) {
      queryAddRow(q1);
      for(col=1; col LTE listLen(q1.columnList); col=col+1)
         querySetCell(q1,ListGetAt(q1.columnList,col), q2[ListGetAt(q1.columnList,col)][row]);
     }
     return q1;
 }

oldId: 1376
---

