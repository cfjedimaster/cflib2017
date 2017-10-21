---
layout: udf
title:  getQueryColumns
date:   2011-01-12T05:24:04.000Z
library: DatabaseLib
argString: "theQuery"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF6
shortDescription: Returns list of query columns in order as defined by SQL query.
description: |
 Retrieve a list of column names in the order as defined by SQL for use with CFSpreadsheet (generating a header row) and other loop functions.

returnValue: Returns a list.

example: |
 <cfquery name="GetOrders">
 SELECT orderid, customerfirstname, customerlastname, total
 FROM orders
 ORDER BY orderid
 </cfquery>
 
 <CFSET ColumnList = getQueryColumns(GetOrders)>

args:
 - name: theQuery
   desc: Query object to examine.
   req: true


javaDoc: |
 /**
  * Returns list of query columns in order as defined by SQL query.
  * 
  * @param theQuery      Query object to examine. (Required)
  * @return Returns a list. 
  * @author James Moberg (james@ssmedia.com) 
  * @version 1, January 11, 2011 
  */

code: |
 function getQueryColumns(theQuery){
     if(isQuery(theQuery)) return arraytoList(theQuery.getMeta().getColumnLabels());
     else return '';
 }

---

