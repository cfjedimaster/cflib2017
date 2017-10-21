---
layout: udf
title:  queryColumnTypes
date:   2006-04-11T11:57:55.000Z
library: DataManipulationLib
argString: "dbquery"
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 1
cfVersion: CF6
shortDescription: Returns a list of query column data types.
description: |
 Used in conjuction with QueryColumns(), will return a list of data types such as the following: INTEGER,VARCHAR,CHAR,TIMESTAMP. This can be done in CFMX using getMetaData on the query.

returnValue: Returns a list.

example: |
 <cfquery name="foo" datasource="galaga">
 select *
 from users
 </cfquery>
 
 <cfdump var="#queryColumnTypes(foo)#">

args:
 - name: dbquery
   desc: Query to analyze.
   req: true


javaDoc: |
 /**
  * Returns a list of query column data types.
  * 
  * @param dbquery      Query to analyze. (Required)
  * @return Returns a list. 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 1, April 11, 2006 
  */

code: |
 function queryColumnTypes(dbquery) {
     var columnTypes="";
     var metadata=dbquery.getMetadata();
     var i=0;
     var column="";
 
     for (i=1; i lte metadata.getColumnCount(); i=i+1) {
         column = metadata.getColumnLabel(javaCast("int",i));
         columnTypes = listAppend(columnTypes,dbquery.getColumnTypeName(metadata.getColumnType(dbquery.findColumn(column))));
     }
 
     return columnTypes;
 }

---

