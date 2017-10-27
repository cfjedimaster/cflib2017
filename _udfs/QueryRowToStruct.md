---
layout: udf
title:  QueryRowToStruct
date:   2001-12-11T12:01:27.000Z
library: DataManipulationLib
argString: "query[, row]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Makes a row of a query into a structure.
tagBased: false
description: |
 Convenience function for turning a given row of query into a structure.  By default, it uses the first row.

returnValue: Returns a structure.

example: |
 <cfscript>
     q = querynew("id,name");
     queryAddRow(q);
     querySetCell(q,"id",1);
     querySetCell(q,"name","Nathan Dintenfass");
     queryAddRow(q);
     querySetCell(q,"id",2);
     querySetCell(q,"name","Ben Archibald");    
     queryAddRow(q);
     querySetCell(q,"id",3);
     querySetCell(q,"name","Raymond Camden");        
 </cfscript>
 
 <cfdump var="#queryRowToStruct(q)#">
 <cfdump var="#queryRowToStruct(q,2)#">

args:
 - name: query
   desc: The query to work with.
   req: true
 - name: row
   desc: Row number to check. Defaults to row 1.
   req: false


javaDoc: |
 /**
  * Makes a row of a query into a structure.
  * 
  * @param query      The query to work with. 
  * @param row      Row number to check. Defaults to row 1. 
  * @return Returns a structure. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, December 11, 2001 
  */

code: |
 function queryRowToStruct(query){
     //by default, do this to the first row of the query
     var row = 1;
     //a var for looping
     var ii = 1;
     //the cols to loop over
     var cols = listToArray(query.columnList);
     //the struct to return
     var stReturn = structnew();
     //if there is a second argument, use that for the row number
     if(arrayLen(arguments) GT 1)
         row = arguments[2];
     //loop over the cols and build the struct from the query row    
     for(ii = 1; ii lte arraylen(cols); ii = ii + 1){
         stReturn[cols[ii]] = query[cols[ii]][row];
     }        
     //return the struct
     return stReturn;
 }

oldId: 358
---

