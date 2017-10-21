---
layout: udf
title:  queryColumnToArray
date:   2005-07-22T14:32:17.000Z
library: DataManipulationLib
argString: "query, column"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Takes a selected column of data from a query and converts it into an array.
description: |
 Takes a selected column of data from a query and converts it into an array.

returnValue: Returns an array.

example: |
 <cfset qry = QueryNew("things,stuff") />
 <cfset queryAddRow(qry)>
 <cfset QuerySetCell(qry,"things", "A") />
 <cfset QuerySetCell(qry,"stuff", "a1") />
 <cfset queryAddRow(qry)>
 <cfset QuerySetCell(qry,"things", "B") />
 <cfset QuerySetCell(qry,"stuff", "b2") />
 <cfset queryAddRow(qry)>
 <cfset QuerySetCell(qry,"things", "C") />
 <cfset QuerySetCell(qry,"stuff", "c3") />
 
 <cfset my_array = queryColumnToArray(qry, "things") />
 <cfdump var="#my_array#" />

args:
 - name: query
   desc: The query to scan.
   req: true
 - name: column
   desc: The name of the column to return data from.
   req: true


javaDoc: |
 /**
  * Takes a selected column of data from a query and converts it into an array.
  * 
  * @param query      The query to scan. (Required)
  * @param column      The name of the column to return data from. (Required)
  * @return Returns an array. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, July 22, 2005 
  */

code: |
 function queryColumnToArray(qry, column) {
     var arr = arrayNew(1);
     var ii = "";
     var loop_len = arguments.qry.recordcount;
     for (ii=1; ii lte loop_len; ii=ii+1) {
         arrayAppend(arr, arguments.qry[arguments.column][ii]);
     } 
     return arr;
 }

---

