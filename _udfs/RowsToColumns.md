---
layout: udf
title:  RowsToColumns
date:   2010-03-11T05:57:47.000Z
library: DataManipulationLib
argString: "query, maxcolumns, actualColumnCountVarName"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Transforms queries for displaying as columns instead of rows.
tagBased: false
description: |
 Takes a query and transforms it to allow outputting for viewing in columns instead of rows. 
 
 You specify the query you want to parse and the number of columns to put it into.
 
 For example, if you have output that looks like:
 
 &lt;PRE&gt;
 a b c
 d e f
 &lt;/PRE&gt;
 
 you could output it as 
 
 &lt;PRE&gt;
 a c e
 b d f
 &lt;/PRE&gt;
 
 PLEASE NOTE: This function will put empty strings into cells that do not need filling, so if you have:
 
 &lt;PRE&gt;
 a d g
 b e h
 c f 
 &lt;/PRE&gt;
 
 The cell after &quot;f&quot; would contain empty values.  This is done to allow consistent and easy outputting without needing to a lot of parsing after the tag is called.
 
 It is still up to you as a developer to do the work to put the output into the proper number of columns.  For instance:
 &lt;PRE&gt;
 &lt;cfset getUsers = rowsToColumns(yourQuery,4,&quot;cols&quot;)&gt;
 &lt;table border=&quot;1&quot;&gt;
     &lt;tr&gt;
         &lt;cfset counter = 0&gt;
         &lt;cfoutput query=&quot;GetUsers&quot;&gt;
             &lt;cfset counter = counter + 1&gt;
             &lt;td&gt;#LastName#, #FirstName#&lt;/td&gt;
             &lt;cfif counter is cols and counter is not getUsers.recordcount&gt;
                 &lt;/tr&gt;&lt;tr&gt;
                 &lt;cfset counter = 0&gt;
             &lt;/cfif&gt;
         &lt;/cfoutput&gt;
     &lt;/tr&gt;
 &lt;/table&gt;
 &lt;/PRE&gt;

returnValue: Returns a query.

example: |
 <CFSCRIPT>
     Q = QueryNew("Name");
     QueryAddRow(Q,11);
     QuerySetCell(Q,"Name","Anna",1);
     QuerySetCell(Q,"Name","Barry",2);
     QuerySetCell(Q,"Name","Charles",3);
     QuerySetCell(Q,"Name","Dana",4);
     QuerySetCell(Q,"Name","Ebert",5);
     QuerySetCell(Q,"Name","Fred",6);
     QuerySetCell(Q,"Name","Gorf",7);
     QuerySetCell(Q,"Name","Jeanne",8);
     QuerySetCell(Q,"Name","Hank",9);
     QuerySetCell(Q,"Name","Ingrid",10);
     QuerySetCell(Q,"Name","Jacob",11);
 </CFSCRIPT>
 
  <cfset new = rowsToColumns(Q,3,"cols")>
  <table border="1">
      <tr>
          <cfset counter = 0>
          <cfoutput query="new">
              <cfset counter = counter + 1>
              <td>#name#</td>
              <cfif Counter is cols and counter is not new.recordcount>
                  </tr><tr>
                  <cfset counter = 0>
              </cfif>
          </cfoutput>
      </tr>
  </table>

args:
 - name: query
   desc: A ColdFusion query.
   req: true
 - name: maxcolumns
   desc: The maximum number of columns.
   req: true
 - name: actualColumnCountVarName
   desc: The name of the variable to set containing the actual number of columns created.
   req: true


javaDoc: |
 /**
  * Transforms queries for displaying as columns instead of rows.
  * This UDF is based on the custom tag CF_RowsToColumns created by Nathan Dintenfass and Ben Archibald in February, 2000
  * 
  * @param query      A ColdFusion query. (Required)
  * @param maxcolumns      The maximum number of columns. (Required)
  * @param actualColumnCountVarName      The name of the variable to set containing the actual number of columns created. (Required)
  * @return Returns a query. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, March 10, 2010 
  */

code: |
 function rowsToColumns(query,maxColumns,actualColumnCountVarName){
     //make an array of the columns in the incoming query for looping
     var columnArray = listToArray(query.columnlist);
     //make a new query to return based on the columns of the incoming query
     var newQuery = queryNew(query.columnlist);
     //figure out how many rows there will be
     var rows = ceiling(query.recordcount/maxColumns);
     //set up a var to count row we are on
     var onRow = 1;
     //set up a var to count the column we are on
     var onColumn = 0;
     //set up a var to hold the row we want to grab
     var getRow = 0;
     //set up a var to index the outer loop
     var ii = 1;
     //set up a var to index the inner loop
     var zz = 1;
     //if there will be extra columns, make sure no more columns than necessary.  this is necessary to ensure that if you ask for more columns than there are records to fill you know how many there really are!!
     if(ceiling(query.recordcount/rows) LT maxColumns)
         maxColumns = ceiling(query.recordcount/rows);
     //starting on row 1, loop through the recordcount of the original query, putting rows in the new query                    
     for(ii = 1; ii lte evaluate(rows * maxColumns); ii = ii + 1){
         //increment the column we are now on
         onColumn = onColumn + 1;
         //get the proper row from the original query
         getRow = ((onColumn - 1) * rows) + onRow;
         //now add a row to the newQuery
         queryAddRow(newQuery);
         //loop through the columns, putting the cells into the newQuery
         for(zz = 1; zz lte arraylen(columnArray); zz = zz + 1){
             //if the row we want is lower than than the recordcount, put in the value
             if(getRow LTE query.recordcount)
                 querySetCell(newQuery,columnArray[zz],query[columnArray[zz]][getRow]);
             //otherwise, just set it to a blank string
             else
                 querySetCell(newQuery,columnArray[zz],"");
         } 
         //if the column we are on is the same as the maxColumns, reset the column we are on and increment the row
         if(onColumn EQ maxColumns){
             onColumn = 0;
             onRow = onRow + 1;
         }
     }
     //set the variable for the number of columns!
     setVariable(actualColumnCountVarName,maxColumns);
     //return the new query
     return newQuery;                
 }

oldId: 156
---

