---
layout: udf
title:  castQueryColumn
date:   2011-06-14T12:30:05.000Z
library: CFMLLib
argString: "qry, column, datatype"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF9
shortDescription: Will recast a query column to a different datatype.
description: |
 When using CFSpreadsheet or CFHTTP to import numeric data, all numeric and data values are imported as &quot;VarChar&quot;.  This script will change the datatype of the query so that you can perform Query-of-Query transactions on properly typed datatypes.

returnValue: Returns a query.

example: |
 <CFSET TestQry = queryNew("id,date2,test", "varchar,varchar,varchar")>
 <CFSET queryaddrow(TestQry, 3)>
 <CFSET QuerySetCell(TestQry, "id", 1, 1)>
 <CFSET QuerySetCell(TestQry, "id", 2, 2)>
 <CFSET QuerySetCell(TestQry, "id", 3, 3)>
 <CFSET QuerySetCell(TestQry, "date2", "1/1/2011", 1)>
 <CFSET QuerySetCell(TestQry, "date2", "2/1/2011", 2)>
 <CFSET QuerySetCell(TestQry, "date2", "3/1/2011", 3)>
 <CFSET QuerySetCell(TestQry, "test", "this is test", 1)>
 <CFSET QuerySetCell(TestQry, "test", "4/1/2011", 2)>
 <CFSET QuerySetCell(TestQry, "test", "15", 3)>
 
 <!--- Test Date --->
 <CFSET TestQry = castQueryColumn(TestQry, "date2", "date")>
 <CFQUERY NAME="Test" dbtype="query">SELECT * FROM TestQry ORDER BY date2 DESC</CFQUERY>
 <CFDUMP VAR="#Test#">
 <CFQUERY NAME="Test" dbtype="query">SELECT * FROM TestQry WHERE date2 < <cfqueryparam value="1/15/2011" cfsqltype="CF_SQL_DATE"></CFQUERY>
 <CFDUMP VAR="#Test#">
 
 <!--- Test integer --->
 <CFSET TestQry = castQueryColumn(TestQry, "id", "integer")>
 <CFQUERY NAME="Test" dbtype="query">SELECT * FROM TestQry ORDER BY ID DESC</CFQUERY>
 <CFDUMP VAR="#Test#">
 <CFQUERY NAME="Test" dbtype="query">SELECT sum(ID) AS TheTotal FROM TestQry</CFQUERY>
 <CFDUMP VAR="#Test#">

args:
 - name: qry
   desc: Query to modify.
   req: true
 - name: column
   desc: Column to modify.
   req: true
 - name: datatype
   desc: Data type to convert to.
   req: true


javaDoc: |
 /**
  * Will recast a query column to a different datatype.
  * 
  * @param qry      Query to modify. (Required)
  * @param column      Column to modify. (Required)
  * @param datatype      Data type to convert to. (Required)
  * @return Returns a query. 
  * @author James Moberg (james@ssmedia.com) 
  * @version 1, June 14, 2011 
  */

code: |
 function castQueryColumn(qry, column, datatype) {
     var columnData = arrayNew(1);
     var ii = "";
     var loop_len = arguments.qry.recordcount;
     var columnNames = arraytoList(arguments.qry.getMetaData().getColumnLabels());
     var qoq = new Query();
     var newQry = new Query();
     var javatype = '';
     
     datatype = lcase(datatype);
 
     if (Listfindnocase(columnNames, arguments.column) IS 0) {return arguments.qry;}
 
     switch(datatype){
         case "integer": {javatype = "int"; break;}
         case "bigint": {javatype = "long"; break;}
         case "decimal": {javatype = "BigDecimal"; break;}
         case "varchar": {javatype = "string"; break;}
         case "binary": {javatype = "byte"; break;}
         case "bit": {javatype = "boolean"; break;}
         default: {javatype = "string"; break;}
     }
 
     for (ii=1; ii lte loop_len; ii=ii+1) {
         if (isNull(arguments.qry[arguments.column][ii])) {
             arrayAppend(columnData, arguments.qry[arguments.column][ii]);
         } else if (listfindnocase("date,time", datatype) AND ISDate(arguments.qry[arguments.column][ii])) {    
             arrayAppend(columnData, parsedatetime(arguments.qry[arguments.column][ii]));    
         } else if (listfind("int,long,float,BigDecimal,string,byte,boolean", javatype)){
             arrayAppend(columnData, JavaCast(javatype, arguments.qry[arguments.column][ii]));    
         } else {
             arrayAppend(columnData, arguments.qry[arguments.column][ii]);    
         }
     }
 
   columnNames = ListDeleteAt(columnNames, Listfindnocase(columnNames, column));
   qoq.setAttributes(QoQsrcTable = arguments.qry);
   newQry = qoq.execute(sql="select #columnNames# from QoQsrcTable", dbtype="query");
   newQry = newQry.getResult();
 
   QueryAddColumn(newQry, column, datatype, columnData);
 
   return newQry;
 
 }

---

