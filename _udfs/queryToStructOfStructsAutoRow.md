---
layout: udf
title:  queryToStructOfStructsAutoRow
date:   2004-09-23T19:51:07.000Z
library: DataManipulationLib
argString: "theQuery"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Converts a query to a structure of structures with the primary index of the main structure auto incremented.
description: |
 Converts a query to a structure of structures with the primary index of the main structure auto incremented.  Thanks to Shawn Seley's QueryToStructOfStructures for the basis of my code.

returnValue: Returns a struct.

example: |
 <cfquery name="test" datasource="test">
 select * from test
 </cfquery>
 
 <cfset s = queryToStructOfStructsAutoRow(test)>

args:
 - name: theQuery
   desc: The query to transform.
   req: true


javaDoc: |
 /**
  * Converts a query to a structure of structures with the primary index of the main structure auto incremented.
  * 
  * @param theQuery      The query to transform. (Required)
  * @return Returns a struct. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, September 23, 2004 
  */

code: |
 function queryToStructOfStructsAutoRow(theQuery){
     var theStructure = StructNew();
     var cols = ListToArray(theQuery.columnlist);
     var row = 1;
     var thisRow = "";
     var col = 1;
     
     for(row = 1; row LTE theQuery.recordcount; row = row + 1){
         thisRow = StructNew();
         for(col = 1; col LTE arraylen(cols); col = col + 1){
             thisRow[cols[col]] = theQuery[cols[col]][row];
         } 
         theStructure[row] = Duplicate(thisRow);
     } 
     return theStructure;
 }

---

