---
layout: udf
title:  DynamicValueList
date:   2002-08-14T10:24:37.000Z
library: DataManipulationLib
argString: "query, col[, delim]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns a value list from a dynamic column of a query.
tagBased: false
description: |
 The CFML function, ValueList, does not allow you to grab a column dynamically unless you use the evaluate function. This UDF allows you to grab a list of values from one particular column.

returnValue: Returns a list.

example: |
 <cfset test = queryNew("name,age")>
 <cfloop index="x" from=1 to=5>
     <cfset queryAddRow(test)>
     <cfset querySetCell(test,"name","Random Name #randRange(1,10000)#")>
     <cfset querySetCell(test,"age","#randRange(1,100)#")>
 </cfloop>
 <cfdump var="#test#">
 <cfdump var="#DynamicValueList(test,"name")#">

args:
 - name: query
   desc: The query to examine.
   req: true
 - name: col
   desc: The column to return values for.
   req: true
 - name: delim
   desc: Delimiter. Defaults to comma.
   req: false


javaDoc: |
 /**
  * Returns a value list from a dynamic column of a query.
  * 
  * @param query      The query to examine. (Required)
  * @param col      The column to return values for. (Required)
  * @param delim      Delimiter. Defaults to comma. (Optional)
  * @return Returns a list. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, August 14, 2002 
  */

code: |
 function DynamicValueList(query,col) {
     var delim = ",";
     if(arrayLen(arguments) gte 3) delim = arguments[3];
     return arrayToList(query[col],delim);
 }

oldId: 745
---

