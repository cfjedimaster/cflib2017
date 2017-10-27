---
layout: udf
title:  cfquery
date:   2004-09-21T18:23:33.000Z
library: DataManipulationLib
argString: "dsn, col, sql"
author: Joe Nicora
authorEmail: joe@seemecreate.com
version: 1
cfVersion: CF5
shortDescription: Mocks the CFQUERY tag.
tagBased: false
description: |
 Allows for the use of a function for a database return rather than th CFQUERY tag.

returnValue: Returns a query.

example: |
 <cfscript>
     qry = cfquery("accessblogdev","id,title","SELECT TOP 100 id,title from tblblogentries");
 </cfscript>
 
 <cfdump var="#qry#">

args:
 - name: dsn
   desc: Datasource. Must be registered in the ODBC Control Panel.
   req: true
 - name: col
   desc: List of columns.
   req: true
 - name: sql
   desc: Sql to use.
   req: true


javaDoc: |
 /**
  * Mocks the CFQUERY tag.
  * 
  * @param dsn      Datasource. Must be registered in the ODBC Control Panel. (Required)
  * @param col      List of columns. (Required)
  * @param sql      Sql to use. (Required)
  * @return Returns a query. 
  * @author Joe Nicora (joe@seemecreate.com) 
  * @version 1, September 21, 2004 
  */

code: |
 function cfquery(dsn,col,sql) {
     var datasource = dsn;    
     var userName = "";
     var password = "";
     var adOpenStatic = 3;
     var adLockReadOnly=1;
     var adCmdTxt = 1;
     var adGetRowsRest = -1;
     var columns = listToArray(col); 
     var strSQL = sql;
     var objDataConn = CreateObject("COM", "ADODB.Connection");
     var objDataRst = "";
     var intRecordCount = "";
     var arrRst = "";
     var qry = queryNew(arrayToList(columns));
     var thisCol = "";
     var thisRow = "";
 
     objDataConn.Open(Datasource, userName, password, -1);
     objDataRst = CreateObject("COM", "ADODB.Recordset");
     objDataRst.open(strSQL, objDataConn, adOpenStatic, adLockReadOnly, adCmdTxt);  
     intRecordCount = objDataRst.RecordCount;
     arrRst = objDataRst.GetRows(adGetRowsRest);
     
     queryAddRow(qry,intRecordCount);
     for (thisCol=1; thisCol LTE arrayLen(columns); thisCol=thisCol+1) {
         for (thisRow=1; thisRow LTE arrayLen(arrRst[thisCol]); thisRow=thisRow+1) {
         querySetCell(qry,columns[thisCol],arrRst[thisCol][thisRow],thisRow);
     }
     }
     objDataRST.close();
     objDataConn.close();
     return qry;
 }

oldId: 1120
---

