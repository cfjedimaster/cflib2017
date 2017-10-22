---
layout: udf
title:  QueryToCsv
date:   2002-06-26T19:02:13.000Z
library: DataManipulationLib
argString: "query[, headers][, cols]"
author: adgnot sebastien
authorEmail: sadgnot@ogilvy.net
version: 1
cfVersion: CF5
shortDescription: Transform a query result into a csv formatted variable.
tagBased: false
description: |
 Transform a query result into a csv formatted variable.

returnValue: Returns a string.

example: |
 <cfset test_query = QueryNew("ValueField, DisplayField")>
 <cfset QueryAddRow(test_query, 3)>
 <cfset QuerySetCell(test_query,"ValueField","blue", 1)>
 <cfset QuerySetCell(test_query,"DisplayField","my favorite color is blue", 1)>
 <cfset QuerySetCell(test_query,"ValueField","changed the text for the heck of it", 2)>
 <cfset QuerySetCell(test_query,"DisplayField","blah blah blah", 2)>
 <cfset QuerySetCell(test_query,"ValueField","Louisiana", 3)>
 <cfset QuerySetCell(test_query,"DisplayField","The State of Louisiana", 3)>
 <cfoutput>
 <pre>
 #querytoCSV(test_query)#
 </pre>
 </cfoutput>

args:
 - name: query
   desc: The query to transform.
   req: true
 - name: headers
   desc: A list of headers to use for the first row of the CSV string. Defaults to cols.
   req: false
 - name: cols
   desc: The columns from the query to transform. Defaults to all the columns.
   req: false


javaDoc: |
 /**
  * Transform a query result into a csv formatted variable.
  * 
  * @param query      The query to transform. (Required)
  * @param headers      A list of headers to use for the first row of the CSV string. Defaults to cols. (Optional)
  * @param cols      The columns from the query to transform. Defaults to all the columns. (Optional)
  * @return Returns a string. 
  * @author adgnot sebastien (sadgnot@ogilvy.net) 
  * @version 1, June 26, 2002 
  */

code: |
 function QueryToCsv(query){
     var csv = "";
     var cols = "";
     var headers = "";
     var i = 1;
     var j = 1;
     
     if(arrayLen(arguments) gte 2) headers = arguments[2];
     if(arrayLen(arguments) gte 3) cols = arguments[3];
     
     if(cols is "") cols = query.columnList;
     if(headers IS "") headers = cols;
     
     headers = listToArray(headers);
     
     for(i=1; i lte arrayLen(headers); i=i+1){
         csv = csv & """" & headers[i] & """;";
     }
 
     csv = csv & chr(13) & chr(10);
     
     cols = listToArray(cols);
     
     for(i=1; i lte query.recordCount; i=i+1){
         for(j=1; j lte arrayLen(cols); j=j+1){
             csv = csv & """" & query[cols[j]][i] & """;";
         }        
         csv = csv & chr(13) & chr(10);
     }
     return csv;
 }

---

