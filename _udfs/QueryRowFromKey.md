---
layout: udf
title:  QueryRowFromKey
date:   2002-06-28T13:17:37.000Z
library: DataManipulationLib
argString: "theQuery, keyField, keyFieldValue"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the first query row number that contains the specified key value.
description: |
 Returns the first query row number that contains the specified key value. Useful when using functions that require a query's row number ... but you only have its primary key (or any other value that identifies the record). Returns zero if no matching keyFieldValue is found.

returnValue: Returns a numeric value.

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
 Row number with username of "AUser" = <b>#QueryRowFromKey(my_query, "Username", "AUser")#</b>
 </cfoutput>

args:
 - name: theQuery
   desc: The query to search.
   req: true
 - name: keyField
   desc: The column to search.
   req: true
 - name: keyFieldValue
   desc: The value to search for.
   req: true


javaDoc: |
 /**
  * Returns the first query row number that contains the specified key value.
  * 
  * @param theQuery      The query to search. (Required)
  * @param keyField      The column to search. (Required)
  * @param keyFieldValue      The value to search for. (Required)
  * @return Returns a numeric value. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 28, 2002 
  */

code: |
 function QueryRowFromKey(theQuery, keyField, keyFieldValue){
     var key_field_value_list = Evaluate("ValueList(theQuery.#keyField#)");
     return ListFindNoCase(key_field_value_list, keyFieldValue);
 }

---

