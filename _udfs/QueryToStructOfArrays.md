---
layout: udf
title:  QueryToStructOfArrays
date:   2002-02-24T01:17:29.000Z
library: DataManipulationLib
argString: "query"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Changes a query into a struct of arrays.
description: |
 Changes a query into a struct of arrays, where the keys of the struct are the column names in the query.  Each struct key holds an array of the values from the query. See also QueryToArrayOfStructs.

returnValue: Returns a structure.

example: |
 <CFSET Query = QueryNew("id,name,age")>
 <CFLOOP INDEX="X" FROM=1 TO=3>
 <CFSET QueryAddRow(Query,1)>
 <CFSET QuerySetCell(Query,"ID",X,X)>
 <CFSET QuerySetCell(Query,"Name","Name #X#",X)>
 <CFSET QuerySetCell(Query,"Age",X+15,X)>
 </CFLOOP>
 <CFSET Struct = QueryToStructOfArrays(Query)>
 <CFDUMP VAR="#Struct#">

args:
 - name: query
   desc: The query to be transformed.
   req: true


javaDoc: |
 /**
  * Changes a query into a struct of arrays.
  * 
  * @param query      The query to be transformed. 
  * @return Returns a structure. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, February 23, 2002 
  */

code: |
 function queryToStructOfArrays(q){
         //a variable to hold the struct
         var st = structNew();
         //two variable for iterating
         var ii = 1;
         var cc = 1;
         //grab the columns into an array for easy looping
         var cols = listToArray(q.columnList);
         //iterate over the columns of the query and create the arrays of values
         for(ii = 1; ii lte arrayLen(cols); ii = ii + 1){
             //make the array with the col name as the key in the root struct
             st[cols[ii]] = arrayNew(1);
             //now loop for the recordcount of the query and insert the values
             for(cc = 1; cc lte q.recordcount; cc = cc + 1)
                 arrayAppend(st[cols[ii]],q[cols[ii]][cc]);
         }
         //return the struct
         return st;
     }

---

