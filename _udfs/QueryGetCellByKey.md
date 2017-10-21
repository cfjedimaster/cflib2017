---
layout: udf
title:  QueryGetCellByKey
date:   2002-06-28T13:18:48.000Z
library: DataManipulationLib
argString: "theQuery, keyField, keyFieldValue, columnName"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Provides direct access to query cells by knowing a key field value within the same row.
description: |
 Provides direct access to query cells by knowing the primary key (or any other identifying field value) within the same row. No need to keep track of row numbers. No need to loop through an entire query if you only need to get at a single row. Useful for effectively joining queries which may not be easily joined otherwise, and allows for more effective reuse of existing, cached, and/or server/application scoped queries. Throws an error if keyFieldValue is not found.

returnValue: Returns a string.

example: |
 <CFSET my_query = QueryNew("Username,Name,Age")>
 <CFSET QueryAddRow(my_query, 1)>
 <CFSET QuerySetCell(my_query,"Username", "CUser")>
 <CFSET QuerySetCell(my_query,"Name","Chris User")>
 <CFSET QuerySetCell(my_query,"Age", 30)>
 <CFSET QueryAddRow(my_query, 1)>
 <CFSET QuerySetCell(my_query,"Username", "AUser")>
 <CFSET QuerySetCell(my_query,"Name","Albert User")>
 <CFSET QuerySetCell(my_query,"Age", 10)>
 <CFSET QueryAddRow(my_query, 1)>
 <CFSET QuerySetCell(my_query,"Username", "BUser")>
 <CFSET QuerySetCell(my_query,"Name","Brad User")>
 <CFSET QuerySetCell(my_query,"Age", 20)>
 
 <cfoutput>
 Query:<br>
 <br>
 <CFDUMP VAR="#my_query#">
 <br>
 <br>
 
 Read from the query:<br>
 <br>
 BUser is <b>#QueryGetCellByKey(my_query, "Username", "BUser", "Age")#</b> years old.<br>
 The 10 year old is named <b>#QueryGetCellByKey(my_query, "Age", "10", "Name")#</b>.<br>
 </cfoutput>

args:
 - name: theQuery
   desc: The query to search.
   req: true
 - name: keyField
   desc: The column value to return.
   req: true
 - name: keyFieldValue
   desc: The value to search for in keyFIeld.
   req: true
 - name: columnName
   desc: The column value to return.
   req: true


javaDoc: |
 /**
  * Provides direct access to query cells by knowing a key field value within the same row.
  * 
  * @param theQuery      The query to search. (Required)
  * @param keyField      The column value to return. (Required)
  * @param keyFieldValue      The value to search for in keyFIeld. (Required)
  * @param columnName      The column value to return. (Required)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 28, 2002 
  */

code: |
 function QueryGetCellByKey(theQuery, keyField, keyFieldValue, columnName){
     var key_field_value_list  = Evaluate("ValueList(theQuery.#keyField#)");
     var row_number            = ListFindNoCase(key_field_value_list, keyFieldValue);
 
     return theQuery[columnName][row_number];
 
 }

---

