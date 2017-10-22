---
layout: udf
title:  CSVFormat
date:   2008-08-27T02:34:22.000Z
library: DataManipulationLib
argString: "query[, qualifer][, columns]"
author: Jeff Howden
authorEmail: cflib@jeffhowden.com
version: 2
cfVersion: CF5
shortDescription: CSVFormat accepts the name of an existing query and converts it to csv format.
tagBased: false
description: |
 CSVFormat accepts the name of an existing query and converts it to CSV format, using the column names as headers.  It can wrap each column value with an optional qualifier. Very handy for use inside a cffile tag to create Excel files from queries.

returnValue: A CSV formatted string.

example: |
 <cfscript>
 mytestquery = QueryNew('FirstName,LastName,Title');
 QueryAddRow(mytestquery, 3);
 QuerySetCell(mytestquery, 'FirstName', 'Steve', 1);
 QuerySetCell(mytestquery, 'LastName', 'Drucker', 1);
 QuerySetCell(mytestquery, 'Title', 'CEO', 1);
 QuerySetCell(mytestquery, 'FirstName', 'Dave', 2);
 QuerySetCell(mytestquery, 'LastName', 'Watts', 2);
 QuerySetCell(mytestquery, 'Title', 'CTO', 2);
 QuerySetCell(mytestquery, 'FirstName', 'Dave', 3);
 QuerySetCell(mytestquery, 'LastName', 'Gallerizzo', 3);
 QuerySetCell(mytestquery, 'Title', 'VP', 3);
 </cfscript>
 
 <cfoutput>
 <pre>
 #CSVFormat(mytestquery, "'")#
 </pre>
 </cfoutput>

args:
 - name: query
   desc: The query to format.
   req: true
 - name: qualifer
   desc: A string to qualify the data with.
   req: false
 - name: columns
   desc: The columns ot use. Defaults to all columns.
   req: false


javaDoc: |
 /**
  * CSVFormat accepts the name of an existing query and converts it to csv format.
  * Updated version of UDF orig. written by Simon Horwith
  * 
  * @param query      The query to format. (Required)
  * @param qualifer      A string to qualify the data with. (Optional)
  * @param columns      The columns ot use. Defaults to all columns. (Optional)
  * @return A CSV formatted string. 
  * @author Jeff Howden (cflib@jeffhowden.com) 
  * @version 2, August 26, 2008 
  */

code: |
 function CSVFormat(query) {
   var returnValue = ArrayNew(1);
   var rowValue = '';
   var columns = query.columnlist;
   var qualifier = '';
   var i = 1;
   var j = 1;
   if(ArrayLen(Arguments) GTE 2) qualifier = Arguments[2];
   if(ArrayLen(Arguments) GTE 3 AND Len(Arguments[3])) columns = Arguments[3];
   returnValue[1] = ListQualify(columns, qualifier);
   ArrayResize(returnValue, query.recordcount + 1);
   columns = ListToArray(columns);
   for(i = 1; i LTE query.recordcount; i = i + 1)
   {
     rowValue = ArrayNew(1);
     ArrayResize(rowValue, ArrayLen(columns));
     for(j = 1; j LTE ArrayLen(columns); j = j + 1)
       rowValue[j] = qualifier & query[columns[j]][i] & qualifier;
     returnValue[i + 1] = ArrayToList(rowValue);
   }        
   returnValue = ArrayToList(returnValue, Chr(13));
   return returnValue;
 }

---

