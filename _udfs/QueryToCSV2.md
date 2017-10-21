---
layout: udf
title:  QueryToCSV2
date:   2005-03-24T00:04:39.000Z
library: StrLib
argString: "query[, headers][, cols]"
author: Qasim Rasheed
authorEmail: qasimrasheed@hotmail.com
version: 1
cfVersion: CF6
shortDescription: Convert the query into a CSV format using Java StringBuffer Class.
description: |
 This function is a modified version of QueryToCSV by Adgnot Sebastien. It converts the query into a CSV format using Java StringBuffer Class in java.lang package which is considerably faster as compared to regular string. Excellent performance improvement if you are manipulating large queries.

returnValue: Returns a string.

example: |
 <cfset data = querynew( 'a,b,c,d,e,f,g,h,i,j,k')>
 <cfloop from="1" to="100" index="i">
     <cfset queryaddrow( data )>
     <cfloop list="#data.columnlist#" index="j">
         <cfset querysetcell( data, j, j & randrange( 100,500 ) )>
     </cfloop>
 </cfloop>
 <cfset test = QueryToCSV2( data, "AA,BB,CC", "a,b,c" )>

args:
 - name: query
   desc: The query to convert.
   req: true
 - name: headers
   desc: A list of headers to use for the first row of the CSV string. Defaults to all the columns.
   req: false
 - name: cols
   desc: The columns from the query to transform. Defaults to all the columns.
   req: false


javaDoc: |
 /**
  * Convert the query into a CSV format using Java StringBuffer Class.
  * 
  * @param query      The query to convert. (Required)
  * @param headers      A list of headers to use for the first row of the CSV string. Defaults to all the columns. (Optional)
  * @param cols      The columns from the query to transform. Defaults to all the columns. (Optional)
  * @return Returns a string. 
  * @author Qasim Rasheed (qasimrasheed@hotmail.com) 
  * @version 1, March 23, 2005 
  */

code: |
 function QueryToCSV2(query){
     var csv = createobject( 'java', 'java.lang.StringBuffer');
     var i = 1;
     var j = 1;
     var cols = "";
     var headers = "";
     var endOfLine = chr(13) & chr(10);
     if (arraylen(arguments) gte 2) headers = arguments[2];
     if (arraylen(arguments) gte 3) cols = arguments[3];
     if (not len( trim( cols ) ) ) cols = query.columnlist;
     if (not len( trim( headers ) ) ) headers = cols;
     headers = listtoarray( headers );
     cols = listtoarray( cols );
     
     for (i = 1; i lte arraylen( headers ); i = i + 1)
         csv.append( '"' & headers[i] & '",' );
     csv.append( endOfLine );
     
     for (i = 1; i lte query.recordcount; i= i + 1){
         for (j = 1; j lte arraylen( cols ); j=j + 1){
             if (isNumeric( query[cols[j]][i] ) )
                 csv.append( query[cols[j]][i] & ',' );
             else
                 csv.append( '"' & query[cols[j]][i] & '",' );
             
         }
         csv.append( endOfLine );
     }
     return csv.toString();
 }

---

