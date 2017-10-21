---
layout: udf
title:  CSVToQuery
date:   2005-09-30T17:52:53.000Z
library: DataManipulationLib
argString: "cvsString[, rowDelim][, colDelim]"
author: Tony Brandner
authorEmail: tony@brandners.com
version: 1
cfVersion: CF5
shortDescription: Transform a CSV formatted string with header column into a query object.
description: |
 Takes a CSV (comma separated values) formatted string with option row and column delimiters and transforms into a query object. The first row of the CSV string must contain the column headers.

returnValue: Returns a query.

example: |
 <cfsavecontent variable="newCSV">col1,col2,col3
 row1val1,row1val2
 row2val1,row2val2,row2val3
 </cfsavecontent>
 
 <cfdump var="#CSVToQuery(newCSV)#">

args:
 - name: cvsString
   desc: CVS Data.
   req: true
 - name: rowDelim
   desc: Row delimiter. Defaults to CHR(10).
   req: false
 - name: colDelim
   desc: Column delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Transform a CSV formatted string with header column into a query object.
  * 
  * @param cvsString      CVS Data. (Required)
  * @param rowDelim      Row delimiter. Defaults to CHR(10). (Optional)
  * @param colDelim      Column delimiter. Defaults to a comma. (Optional)
  * @return Returns a query. 
  * @author Tony Brandner (tony@brandners.com) 
  * @version 1, September 30, 2005 
  */

code: |
 function csvToQuery(csvString){
     var rowDelim = chr(10);
     var colDelim = ",";
     var numCols = 1;
     var newQuery = QueryNew("");
     var arrayCol = ArrayNew(1);
     var i = 1;
     var j = 1;
     
     csvString = trim(csvString);
     
     if(arrayLen(arguments) GE 2) rowDelim = arguments[2];
     if(arrayLen(arguments) GE 3) colDelim = arguments[3];
 
     arrayCol = listToArray(listFirst(csvString,rowDelim),colDelim);
     
     for(i=1; i le arrayLen(arrayCol); i=i+1) queryAddColumn(newQuery, arrayCol[i], ArrayNew(1));
     
     for(i=2; i le listLen(csvString,rowDelim); i=i+1) {
         queryAddRow(newQuery);
         for(j=1; j le arrayLen(arrayCol); j=j+1) {
             if(listLen(listGetAt(csvString,i,rowDelim),colDelim) ge j) {
                 querySetCell(newQuery, arrayCol[j],listGetAt(listGetAt(csvString,i,rowDelim),j,colDelim), i-1);
             }
         }
     }
     return newQuery;
 }

---

