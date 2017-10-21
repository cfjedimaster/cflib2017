---
layout: udf
title:  queryDeDupe
date:   2008-12-19T17:51:21.000Z
library: DataManipulationLib
argString: "theQuery, keyColumn"
author: Matthew Fusfield
authorEmail: matt@fus.net
version: 1
cfVersion: CF5
shortDescription: Removes duplicate rows from a query based on a key column.
description: |
 This function will find rows with duplicate entries in a given column. Useful for filtering Verity results containing database primary keys in CUSTOM1 or CUSTOM2 fields and anywhere else where duplicate database rows might be present.

returnValue: Returns a query.

example: |
 <cfscript>
 Test=QueryNew("key,value");
 QueryAddRow(Test);
 QuerySetCell(Test,"key",1);
 QuerySetCell(Test,"value",'One A');
 QueryAddRow(Test);
 QuerySetCell(Test,"key",1);
 QuerySetCell(Test,"value",'One B');
 QueryAddRow(Test);
 QuerySetCell(Test,"key",2);
 QuerySetCell(Test,"value",'Two');
 
 NewQuery=QueryDeDupe(Test,'key');
 
 </cfscript>
 
 Original query:<BR>
 <cfdump var="#Test#">
 <BR><BR>
 Query with dupes removed:<BR>
 <cfset NewQuery=QueryDeDupe(test,'key')>
 <cfdump var="#NewQuery#">

args:
 - name: theQuery
   desc: The query to dedupe.
   req: true
 - name: keyColumn
   desc: Column name to check for duplicates.
   req: true


javaDoc: |
 /**
  * Removes duplicate rows from a query based on a key column.
  * Modded by Ray Camden to remove evaluate
  * 
  * @param theQuery      The query to dedupe. (Required)
  * @param keyColumn      Column name to check for duplicates. (Required)
  * @return Returns a query. 
  * @author Matthew Fusfield (matt@fus.net) 
  * @version 1, December 19, 2008 
  */

code: |
 function QueryDeDupe(theQuery,keyColumn) {
     var checkList='';
     var newResult=QueryNew(theQuery.ColumnList);
     var keyvalue='';
     var q = 1;
     var x = "";
     
     // loop through each row of the source query
     for (;q LTE theQuery.RecordCount;q=q+1) {
 
         keyvalue = theQuery[keycolumn][q];
         // see if the primary key value has already been used
         if (NOT ListFind(checkList,keyvalue)) {
             
             /* this is not a duplicate, so add it to the list and copy
                the row to the destination query */
             checkList=ListAppend(checklist,keyvalue);
             QueryAddRow(NewResult);
             
             // copy all columns from source to destination for this row
             for (x=1;x LTE ListLen(theQuery.ColumnList);x=x+1) {
                 QuerySetCell(NewResult,ListGetAt(theQuery.ColumnList,x),theQuery[ListGetAt(theQuery.ColumnList,x)][q]);
             }
         }
     }
     return NewResult;
 }

---

