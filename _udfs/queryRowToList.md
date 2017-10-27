---
layout: udf
title:  queryRowToList
date:   2004-08-06T10:10:11.000Z
library: DataManipulationLib
argString: "query[, queryrow][, delim]"
author: Tim Sloan
authorEmail: tim@sloanconsulting.com
version: 1
cfVersion: CF5
shortDescription: Function to take a single row from a query and generate a list.
tagBased: false
description: |
 Use this function to take row of data from a query and create a simple list from that row. Useful when you are querying a text file as a datasource and the columns are listed in the first row.

returnValue: Returns a string.

example: |
 ... any cfquery here name="qryExample" ...
 
 <cfset listOfData = queryRowToList(qryExample)>
 <cfset listOfData = queryRowToList(qryExample, 100)>
 <cfset listOfData = queryRowToList(qryExample, 1000, "|")>

args:
 - name: query
   desc: The query to examine.
   req: true
 - name: queryrow
   desc: Row to use.
   req: false
 - name: delim
   desc: Delimiter to use.
   req: false


javaDoc: |
 /**
  * Function to take a single row from a query and generate a list.
  * 
  * @param query      The query to examine. (Required)
  * @param queryrow      Row to use. (Optional)
  * @param delim      Delimiter to use. (Optional)
  * @return Returns a string. 
  * @author Tim Sloan (tim@sloanconsulting.com) 
  * @version 1, August 6, 2004 
  */

code: |
 function queryRowToList(query){
     var queryrow = 1;
     var j = 1;
     var querycols = listToArray(query.columnList);
     var delim = ",";
     var listReturn = "";
     if(arrayLen(arguments) GT 1) queryrow = arguments[2];
     if(arrayLen(arguments) GT 2) delim = arguments[3];
     for(j = 1; j lte arraylen(querycols); j = j + 1){
         listReturn = ListAppend(listReturn, query[querycols[j]][queryrow], delim);
     }        
     return listReturn;
 }

oldId: 1101
---

