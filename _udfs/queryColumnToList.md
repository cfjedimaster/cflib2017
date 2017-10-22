---
layout: udf
title:  queryColumnToList
date:   2007-01-04T23:23:27.000Z
library: StrLib
argString: "qry, column[, delim]"
author: Randy Johnson
authorEmail: randy@cfedge.com
version: 1
cfVersion: CF5
shortDescription: Takes a selected column of data from a query and converts it into a list.
tagBased: false
description: |
 The function was inspired by the queryColumnToArray.  It takes a query and a column as arguments and returns a list.

returnValue: Returns a list.

example: |
 <cfset qry = QueryNew("Column1,Column2") />
 <cfset queryAddRow(qry)>
 <cfset QuerySetCell(qry,"Column1", "A") />
 <cfset QuerySetCell(qry,"Column2", "A1") />
 <cfset queryAddRow(qry)>
 <cfset QuerySetCell(qry,"Column1", "B") />
 <cfset QuerySetCell(qry,"Column2", "B2") />
 <cfset queryAddRow(qry)>
 <cfset QuerySetCell(qry,"Column1", "C") />
 <cfset QuerySetCell(qry,"Column2", "C3") />
 
 <cfset theList = queryColumnToList(qry, "Column1") />
 <cfdump var="#theList#" />

args:
 - name: qry
   desc: Query to use.
   req: true
 - name: column
   desc: Column to use.
   req: true
 - name: delim
   desc: Delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Takes a selected column of data from a query and converts it into a list.
  * 
  * @param qry      Query to use. (Required)
  * @param column      Column to use. (Required)
  * @param delim      Delimiter. Defaults to a comma. (Optional)
  * @return Returns a list. 
  * @author Randy Johnson (randy@cfedge.com) 
  * @version 1, January 4, 2007 
  */

code: |
 function queryColumnToList(qry, column) {
     var theList = "";
     var counter = "";
     var num_rows = arguments.qry.recordcount;
     var delim = ",";
     if(arrayLen(arguments) gte 3) delim = arguments[3];
     for (counter=1; counter lte num_rows; counter=counter+1) theList = listAppend(theList, arguments.qry[arguments.column][counter],delim);
     return theList;
 }

---

