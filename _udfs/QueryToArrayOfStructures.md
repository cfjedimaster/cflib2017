---
layout: udf
title:  QueryToArrayOfStructures
date:   2001-09-27T12:13:47.000Z
library: DataManipulationLib
argString: "query"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Converts a query object into an array of structures.
description: |
 Converts a query object into an array of structures.

returnValue: This function returns an array.

example: |
 <CFSET Query = QueryNew("id,name,age")>
 <CFLOOP INDEX="X" FROM=1 TO=3>
 <CFSET QueryAddRow(Query,1)>
 <CFSET QuerySetCell(Query,"ID",X,X)>
 <CFSET QuerySetCell(Query,"Name","Name #X#",X)>
 <CFSET QuerySetCell(Query,"Age",X+15,X)>
 </CFLOOP>
 <CFSET arrStruct = QueryToArrayOfStructures(Query)>
 <CFDUMP VAR="#arrStruct#">

args:
 - name: query
   desc: The query to be transformed
   req: true


javaDoc: |
 /**
  * Converts a query object into an array of structures.
  * 
  * @param query      The query to be transformed 
  * @return This function returns an array. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, September 27, 2001 
  */

code: |
 function QueryToArrayOfStructures(theQuery){
     var theArray = arraynew(1);
     var cols = ListtoArray(theQuery.columnlist);
     var row = 1;
     var thisRow = "";
     var col = 1;
     for(row = 1; row LTE theQuery.recordcount; row = row + 1){
         thisRow = structnew();
         for(col = 1; col LTE arraylen(cols); col = col + 1){
             thisRow[cols[col]] = theQuery[cols[col]][row];
         }
         arrayAppend(theArray,duplicate(thisRow));
     }
     return(theArray);
 }

---

