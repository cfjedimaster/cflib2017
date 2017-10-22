---
layout: udf
title:  queryMerge
date:   2004-07-21T11:13:07.000Z
library: DataManipulationLib
argString: "querysource, queryoutput, keyColumn[, mergeList]"
author: Alain Blais
authorEmail: Alain_blais@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Merge two queries.
tagBased: false
description: |
 Merge the columns from a source query into a second query. 
 
 The merge is base on the value of the primary key identified by the parameter &quot;KeyColumn&quot;.  For each match of the primary the values contained in the source queury will be added to the output query; creating a merging effect.

returnValue: Returns a query.

example: |
 <cfscript>
 cols = "sName,sAge";
 heads = "First Name,Age";
 sourcequery = queryNew(cols);
 queryAddRow(sourcequery,2);
 querySetCell(sourcequery,"sName","Joe",1);
 querySetCell(sourcequery,"sAge","25",1);
 querySetCell(sourcequery,"sName","John",2);
 querySetCell(sourcequery,"sAge","30",2);
 </cfscript>
 <cfscript>
 cols = "sName,sClass,sGrade";
 heads = "First Name,Class,Grade";
 outputquery = queryNew(cols);
 queryAddRow(outputquery,4);
 querySetCell(outputquery,"sName","Joe",1);
 querySetCell(outputquery,"sClass","Math",1);
 querySetCell(outputquery,"sGrade","A",1);
 querySetCell(outputquery,"sName","Joe",2);
 querySetCell(outputquery,"sClass","Gym",2);
 querySetCell(outputquery,"sGrade","C",2);
 querySetCell(outputquery,"sName","John",3);
 querySetCell(outputquery,"sClass","Gym",3);
 querySetCell(outputquery,"sGrade","C",3);
 </cfscript>
 <cfdump var="#sourcequery#">
 <cfdump var="#outputquery#">
 <br><br>
 Resulting query
 <br>
 <cfset temp = querymerge(sourcequery, outputquery, 'sName')>
 <cfdump var="#outputquery#">

args:
 - name: querysource
   desc: Source query.
   req: true
 - name: queryoutput
   desc: Destination query.
   req: true
 - name: keyColumn
   desc: Column (that exists in both queries) to merge on.
   req: true
 - name: mergeList
   desc: List of columns from source query to add to destination query. Defaults to all of them.
   req: false


javaDoc: |
 /**
  * Merge two queries.
  * 
  * @param querysource      Source query. (Required)
  * @param queryoutput      Destination query. (Required)
  * @param keyColumn      Column (that exists in both queries) to merge on. (Required)
  * @param mergeList      List of columns from source query to add to destination query. Defaults to all of them. (Optional)
  * @return Returns a query. 
  * @author Alain Blais (Alain_blais@hotmail.com) 
  * @version 1, July 21, 2004 
  */

code: |
 function querymerge(querysource,queryoutput,keyColumn){
     var mergeColumn = querysource.columnlist;
     var valueArray = arrayNew(1);
     // define counters
     var i = 1;
     var iRow = 1;
     var jRow = 1;
     //if there is a 4th argument, use that as the mergeColumn
     if(arrayLen(arguments) GT 3) mergeColumn = arguments[4];    
     //loop through the merge column
     for(i=1; i lte listLen(mergeColumn,','); i=i+1) {
         if (listFindNoCase(queryoutput.columnlist,listGetAt(mergeColumn,i,','),',') eq 0) {
             // loop through each row of queryoutput and add information from querysource
             found = listGetAt(mergeColumn,i,',');
             for (iRow=1; iRow lte queryoutput.recordcount; iRow=iRow+1) {
                 // find the row in querysource that matches the value in keycolumn from queryoutput  
                 jRow = 1;
                 while (jRow lt querysource.recordcount and querysource[keyColumn][jRow] neq queryoutput[keycolumn][iRow]) {
                     jRow = jRow + 1;
                 }
                 if (querysource[keyColumn][jRow] eq queryoutput[keycolumn][iRow]) {
                     valueArray[iRow] = querysource[listGetAt(mergeColumn,i,',')][jRow];
                 }
             }
             // add the columnm
             queryaddcolumn(queryoutput,listGetAt(mergeColumn,i,','),valueArray);
         }
     }
     return queryoutput;
 }

---

