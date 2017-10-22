---
layout: udf
title:  queryRowToArray
date:   2012-07-27T20:15:22.000Z
library: DataManipulationLib
argString: "query, row"
author: Paul Kukiel
authorEmail: kukielp@gmail.com
version: 1
cfVersion: CF9
shortDescription: queryRowToArray
tagBased: false
description: |
 Convert a row in a query to an array in the same order the columns appear in the query.

returnValue: Returns an array

example: |
 <cfscript>
     q = queryNew("");
     queryAddColumn(q, "id", [1,2,3,4]);
     queryAddColumn(q, "english", ["one","two","three","four"]);
     queryAddColumn(q, "maori", ["tahi","rua","toru","wha"]);
 
     writeDump(q);    
     writeDump(queryRowToArray(q, 1));
 </cfscript>

args:
 - name: query
   desc: Query to extract from from
   req: true
 - name: row
   desc: Which row to extract
   req: true


javaDoc: |
 /**
  * queryRowToArray
  * version 0.1 by Paul Kukiel
  * version 1.0 by Adam Cameron - fixing bug wherein not all columns were returned, plus factoring out unsupported query method usage in favour of native CFML getMetadata() function call to get query columns
  * 
  * @param query      Query to extract from from (Required)
  * @param row      Which row to extract (Required)
  * @return Returns an array 
  * @author Paul Kukiel (kukielp@gmail.com) 
  * @version 1, July 27, 2012 
  */

code: |
 function queryRowToArray(query, row){
     var i = 1;
     var queryCols = getMetadata(query);
     var arrayReturn = [];
 
     for(i = 1; i <= arrayLen(querycols); i++){
         arrayReturn[i] = query[querycols[i].name][arguments.row];
     }
     return arrayReturn;
 }

---

