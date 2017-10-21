---
layout: udf
title:  queryColumns
date:   2006-03-17T13:05:38.000Z
library: DataManipulationLib
argString: "dbquery"
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 1
cfVersion: CF6
shortDescription: Returns query column list.
description: |
 Returns the columns in a query in the same order and case returned by the database. Note that you can get the same information in CFMX7 using the result attribute for cfquery.

returnValue: Returns a list.

example: |
 <cfquery name="foo" datasource="cflib">
 select id, Description, name
 from tbludfs
 </cfquery>
 
 <cfoutput>
 #querycolumns(foo)#
 </cfoutput>

args:
 - name: dbquery
   desc: Query to examine.
   req: true


javaDoc: |
 /**
  * Returns query column list.
  * 
  * @param dbquery      Query to examine. (Required)
  * @return Returns a list. 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 1, March 17, 2006 
  */

code: |
 function queryColumns(dbquery) {
     var queryFields = "";
     var metadata = dbquery.getMetadata();
     var i = 0;
     var col = "";
     
     for (i = 1; i lte metadata.getColumnCount(); i = i+1) {
         col = metadata.getColumnLabel(javaCast("int", i));
         queryFields = listAppend(queryFields,col);
     }
 
     return queryFields;
 }

---

