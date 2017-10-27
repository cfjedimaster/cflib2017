---
layout: udf
title:  QuerySetCellByKey
date:   2002-06-28T13:21:49.000Z
library: DataManipulationLib
argString: "theQuery, keyField, keyFieldValue, columnName, newValue"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Allows changing of a query cell by knowing a key field value within the same row.
tagBased: false
description: |
 Allows changing of a query cell by knowing the primary key (or any other identifying field value) within the same row. This is useful for altering existing queries without having to keep track of (or manually finding) the respective row number. Throws an error if keyFieldValue is not found.

returnValue: Returns a query.

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
 
 Modify with QuerySetCellByKey(my_query, "Username", "CUser", "Age", "31"):<br>
 <br>
 <cfset QuerySetCellByKey(my_query, "Username", "CUser", "Age", "31")>
 <CFDUMP VAR="#my_query#">
 </cfoutput>

args:
 - name: theQuery
   desc: The query to modify.
   req: true
 - name: keyField
   desc: The column to search against.
   req: true
 - name: keyFieldValue
   desc: The value to search for.
   req: true
 - name: columnName
   desc: The column to modify.
   req: true
 - name: newValue
   desc: The value to set.
   req: true


javaDoc: |
 /**
  * Allows changing of a query cell by knowing a key field value within the same row.
  * 
  * @param theQuery      The query to modify. (Required)
  * @param keyField      The column to search against. (Required)
  * @param keyFieldValue      The value to search for. (Required)
  * @param columnName      The column to modify. (Required)
  * @param newValue      The value to set. (Required)
  * @return Returns a query. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 28, 2002 
  */

code: |
 function QuerySetCellByKey(theQuery, keyField, keyFieldValue, columnName, newValue){
     var key_field_value_list  = Evaluate("ValueList(theQuery.#keyField#)");
     var row_number            = ListFindNoCase(key_field_value_list, keyFieldValue);
     querysetCell(theQuery,columnName,newValue,row_number);
 }

oldId: 588
---

