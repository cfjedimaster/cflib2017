---
layout: udf
title:  getRowFromQuery
date:   2014-06-21T23:19:53.000Z
library: DataManipulationLib
argString: "qry, row"
author: Tony Felice
authorEmail: tfelice@reddoor.biz
version: 1
cfVersion: CF5
shortDescription: Return a single row from a query.
description: |
 Given a numeric row id, this function will return the single row as a query object.

returnValue: Returns a query.

example: |
 <cfset myQuery = QueryNew("Name, Time, Advanced", "VarChar, Time, Bit")>
 <cfset newRow = QueryAddRow(MyQuery, 2)>
 <cfset QuerySetCell(myQuery, "Name", "The Wonderful World of CMFL", 1)>
 <cfset QuerySetCell(myQuery, "Time", "9:15 AM", 1)>
 <cfset QuerySetCell(myQuery, "Advanced", False, 1)>
 <cfset QuerySetCell(myQuery, "Name", "CFCs for Enterprise Applications", 2)>
 <cfset QuerySetCell(myQuery, "Time", "12:15 PM", 2)>
 <cfset QuerySetCell(myQuery, "Advanced", True, 2)>
 
 The second row of the query is: <cfdump var="#getRowFromQuery(myQuery,2)#">

args:
 - name: qry
   desc: Query to inspect.
   req: true
 - name: row
   desc: Numeric row to retrieve.
   req: true


javaDoc: |
 /**
  * Return a single row from a query.
  * v1.0 by Tony Felice
  * v1.1 by Adam Cameron (changing name so as to not conflict with current CFML)
  * 
  * @param qry      Query to inspect. (Required)
  * @param row      Numeric row to retrieve. (Required)
  * @return Returns a query. 
  * @author Tony Felice (tfelice@reddoor.biz) 
  * @version 1.10, June 21, 2014 
  */

code: |
 function getRowFromQuery(qry,row){
     var result = queryNew('');
     var cols = listToArray(arguments.qry.columnList);
     var i = '';
 
     for(i=1; i lte arrayLen(cols); i=i+1){
         queryAddColumn(result, cols[i], listToArray(arguments.qry[cols[i]][arguments.row]));
     }
 
     return result;
 }

---

