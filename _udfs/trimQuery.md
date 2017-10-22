---
layout: udf
title:  trimQuery
date:   2004-02-26T18:35:28.000Z
library: DataManipulationLib
argString: "qry"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF5
shortDescription: Trim spaces from all records in a query.
tagBased: false
description: |
 Trims spaces from all recordset in a query. Useful for databases that retrieve varchars values with extra spaces (as SQL Server). 
 
 Note - it is preferable to have the database do your trim for you. SQL Server for example can easily trim the data returned.

returnValue: Returns a query.

example: |
 <cfset qryFoo = queryNew('FirstName,LastName')>
 <cfset queryAddRow(qryFoo, 3)>
 <cfset querySetCell(qryFoo, 'FirstName', '  Ben   ', 1)>
 <cfset querySetCell(qryFoo, 'LastName', '  Forta        ', 1)>
 <cfset querySetCell(qryFoo, 'FirstName', 'Massimo   ', 2)>
 <cfset querySetCell(qryFoo, 'LastName', 'Foti       ', 2)>
 <cfset querySetCell(qryFoo, 'FirstName', '    Ju', 3)>
 <cfset querySetCell(qryFoo, 'LastName', 'Ratto       ', 3)>
 <pre>
 <strong>Not Trimmed</strong>:
 <cfoutput query="qryFoo">#qryFoo.FirstName# #qryFoo.LastName#<br></cfoutput>
 <cfset qryFoo=TrimQuery(qryFoo)>
 <strong>Trimmed</strong>:
 <cfoutput query="qryFoo">#qryFoo.FirstName# #qryFoo.LastName#<br></cfoutput>
 </pre>

args:
 - name: qry
   desc: The query to trim.
   req: true


javaDoc: |
 /**
  * Trim spaces from all records in a query.
  * 
  * @param qry      The query to trim. (Required)
  * @return Returns a query. 
  * @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  * @version 1, February 26, 2004 
  */

code: |
 function trimQuery(qry) {
     var col="";
     var i=1;
     var j=1;
     for(;i lte qry.recordCount;i=i+1) {
         for(j=1;j lte listLen(qry.columnList);j=j+1) {
             col=listGetAt(qry.columnList,j);
             querySetCell(qry,col,trim(qry[col][i]),i);
         }
     }
     return qry;
 }

---

