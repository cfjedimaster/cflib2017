---
layout: udf
title:  queryDiff
date:   2003-05-26T09:17:55.000Z
library: DataManipulationLib
argString: "q1, q2"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Returns information about the differences between 2 queries with the same columns.
description: |
 Given two queries queryDiff() returns a structure with information about which rows/cells changed and which rows were added or removed. NOTE:  This version works ONLY with 2 queries with the same columns!
 
 The resulting structures contains the following keys:
 
 CHANGED: a structure of structures -- the top level keys are the row indexes, and the second level keys are the column names.  Each column keyed struct contains the following keys:
 
  - THEN: the value in q1
  - NOW: the value in q2
  - ROW: the row index
  - COL: the column name
 
 ADDED: A struct where the keys and values are the row indexes in Q2 of rows that aren't in Q1
 
 REMOVED: A struct where the keys and values are the row indexes in Q1 that aren't in Q2
 
 QUERY1: a reference to the first query
 
 QUERY2: a reference to the second query

returnValue: Returns a structure.

example: |
 <cfscript>
     //BUILD TWO SAMPLE QUERIES
     q1 = queryNew("foo,bar,thing");
     q2 = queryNew("foo,bar,thing");
     
     queryAddRow(q1,3);
     queryAddRow(q2,4);
     
     querySetCell(q1,"foo","1",1);
     querySetCell(q1,"foo","2",2);
     querySetCell(q1,"foo","3",3);
     querySetCell(q1,"bar","a",1);
     querySetCell(q1,"bar","b",2);
     querySetCell(q1,"bar","c",3);
     querySetCell(q1,"thing","w",1);
     querySetCell(q1,"thing","x",2);
     querySetCell(q1,"thing","y",3);
     
     querySetCell(q2,"foo","1",1);
     querySetCell(q2,"foo","new",2);
     querySetCell(q2,"foo","3",3);
     querySetCell(q2,"foo","4",4);
     querySetCell(q2,"bar","aaa",1);
     querySetCell(q2,"bar","b",2);
     querySetCell(q2,"bar","c",3);    
     querySetCell(q2,"bar","d",4);
     querySetCell(q2,"thing","w",1);
     querySetCell(q2,"thing","changed",2);
     querySetCell(q2,"thing","y",3);
     querySetCell(q2,"thing","z",4);
 </cfscript>
 
 A DUMP OF THE ORIGINAL QUERIES:
 <table>
     <tr>
         <td valign="top"><cfdump var="#q1#"></td>
         <td valign="top"><cfdump var="#q2#"></td>
     </tr>
 </table>
 <br /><br />
 <hr>
 <cfset diff = queryDiff(q1,q2)>
 Were any rows changed?: <strong><cfoutput>#yesNoFormat(structCount(diff.changed))#</cfoutput></strong>
 <br />
 <cfif structCount(diff.changed)>
 Which rows were changed?: <cfoutput>#structKeyList(diff.changed)#</cfoutput>
 <br />
 Show the columns that changed in each of those rows:
 <br />
 <cfoutput>
 <cfloop collection="#diff.changed#" item="rowIndex">
     In Row <strong>#rowIndex#:</strong>
     <ul>
     <cfloop collection="#diff.changed[rowIndex]#" item="colName">
         <li><strong>#colName#</strong> was <strong>#diff.changed[rowIndex][colName].then#</strong> and now is <strong>#diff.changed[rowIndex][colName].now#</strong>
     </cfloop>
     </ul>
 </cfloop>
 </cfoutput>
 </cfif>
 <hr>
 Were any rows added?: <strong><cfoutput>#yesNoFormat(structCount(diff.added))#</cfoutput></strong>
 <cfif structCount(diff.added)>
 <br />
 How many rows were added?: <strong><cfoutput>#structCount(diff.added)#</cfoutput></strong>
 <br />
 Show the rows that were added:
 <cfset cols = listToArray(diff.query1.columnList)>
 <cfoutput>
 <table border=1>
     <tr>
         <td><em>row</em></td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             <td>#cols[ii]#</td>
         </cfloop>
     </tr>
     <cfloop collection="#diff.added#" item="rowIndex">
     <tr>
         <td><em>#rowIndex#</em></td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             <cfset thisColName = cols[ii]>
             <td>#diff.query2[thisColName][rowIndex]#</td>
         </cfloop>        
     </tr>
     </cfloop>
 </table>
 </cfoutput>
 </cfif>
 <br />
 <hr>
 Were any rows removed?: <strong><cfoutput>#yesNoFormat(structCount(diff.removed))#</cfoutput></strong>
 <cfif structCount(diff.removed)>
 <br />
 How many rows were added?: <strong><cfoutput>#structCount(diff.removed)#</cfoutput></strong>
 <br />
 Show the rows that were removed:
 <cfset cols = listToArray(diff.query1.columnList)>
 <cfoutput>
 <table border=1>
     <tr>
         <td><em>row</em></td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             <td>#cols[ii]#</td>
         </cfloop>
     </tr>
     <cfloop collection="#diff.removed#" item="rowIndex">
     <tr>
         <td><em>#rowIndex#</em></td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             <cfset thisColName = cols[ii]>
             <td>#diff.query1[thisColName][rowIndex]#</td>
         </cfloop>        
     </tr>
     </cfloop>
 </table>
 </cfoutput>
 </cfif>
 
 <br />
 <hr>
 SHOW A COMPLETE COMPARISON OF THE QUERIES:
 
 <cfset cols = listToArray(diff.query1.columnList)>
 <cfoutput>
 <table border=1>
     <tr>
         <td><em>row</em></td>
         <td colspan="#arrayLen(cols)#">
             <em>ORIGINAL QUERY</em>
         </td>
         <td>.</td>
         <td colspan="#arrayLen(cols)#">
             <em>NEW QUERY</em>
         </td>
     </tr>
     <tr>
         <td></td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             <td><strong>#cols[ii]#</strong></td>
         </cfloop>
             <td>.</td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             <td><strong>#cols[ii]#</strong></td>
         </cfloop>        
     </tr>
     <cfloop from="1" to="#iif(diff.query1.recordCount LT diff.query2.recordCount,diff.query2.recordCount,diff.query1.recordCount)#" index="rowIndex">
     <tr>
         <td><em>#rowIndex#</em></td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             
             <cfif rowIndex LTE diff.query1.recordCount>
                 <cfset thisColName = cols[ii]>
                 <td>
                 #diff.query1[thisColName][rowIndex]#
                 </td>
             <cfelse>
                 <td style="background:##cccccc;"></td>    
             </cfif>
         </cfloop>
         <td>.</td>
         <cfloop from="1" to="#arrayLen(cols)#" index="ii">
             <cfif rowIndex LTE diff.query2.recordCount>
                 <cfscript>
                     thisColName = cols[ii];
                     thisStyle = "font-weight:normal;";
                     //if it's a changed value, outline it in red
                     if(structKeyExists(diff.changed,rowIndex) AND structKeyExists(diff.changed[rowIndex],thisColName)){
                         thisStyle = "border: 2px red dotted;";
                     }
                     if(structKeyExists(diff.added,rowIndex)){
                         thisStyle = "background: ##ffffcc;";
                     }
                 </cfscript>            
                 <td style="#thisStyle#">
                 #diff.query2[thisColName][rowIndex]#
                 </td>
             <cfelse>
                 <td style="background:##cccccc;"></td>    
             </cfif>    
         </cfloop>        
     </tr>
     </cfloop>
 </table>
 </cfoutput>
 <br /><br />
 <hr>
 A DUMP OF THE RESULT OF queryDiff()
 <cfdump var="#diff#">

args:
 - name: q1
   desc: The first query.
   req: true
 - name: q2
   desc: The second query.
   req: true


javaDoc: |
 /**
  * Returns information about the differences between 2 queries with the same columns.
  * 
  * @param q1      The first query. (Required)
  * @param q2      The second query. (Required)
  * @return Returns a structure. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, May 26, 2003 
  */

code: |
 function queryDiff(q1,q2){
     //vars for looping
     var ii = 0;
     var cc = 0;
     //a struct to hold the result
     var result = structNew();
     //grab the columns -- NOTE: THIS VERSION ASSUMES THEY HAVE THE SAME COLUMNS!!
     var cols = listToArray(q1.columnList);
     var thisCol = "";
     //we'll loop whichever query is shortest.  by default, we'll loop query1
     var shorterQuery = q1;
     var longerQuery = q2;
     var keyToUseForLonger = "added";
     var sameSize = true;
     var rowDiff = 0;
     //vars to use in the loop
     var q1Value = "";
     var q2Value = "";
     var thenNow = structNew();
     //make the standard keys in the result
     result.changed = structNew();
     result.added = structNew();
     result.removed = structNew();
     result.query1 = q1;
     result.query2 = q2;
     //if the queries are not the same size, indicate that
     if(q1.recordCount NEQ q2.recordCount){
         sameSize = false;
         //if q2 is shorter, use that instead
         if(q1.recordCount GT q2.recordCount){
             shorterQuery = q2;
             longerQuery = q1;
             keyToUseForLonger = "removed";
         }
     }
     //loop the correct query to get rows that are different in Q2 from Q1
     for(ii = 1; ii LTE shorterQuery.recordCount; ii = ii + 1){
         for(cc = 1; cc LTE arrayLen(cols); cc = cc + 1){
             thisCol = cols[cc];
             q1Value = q1[thisCol][ii];
             q2Value = q2[thisCol][ii];
             //if this col is different, grab the row index
             if(compare(q1Value,q2Value)){
                 //if we don't already have this row in the changed group, put it there
                 if(NOT structKeyExists(result.changed,ii))
                     result.changed[ii] = structNew();
                 thenNow = structNew();
                 thenNow.then = q1Value;
                 thenNow.now = q2Value;
                 thenNow.row = ii;
                 thenNow.col = thisCol;
                 result.changed[ii][thisCol] = thenNow;
             }
         }
     }
     //if they are not the same size, add the row index to the appropriate key
     if(NOT sameSize){
         rowDiff = longerQuery.recordCount - shorterQuery.recordCount;
         for(ii = rowDiff + shorterQuery.recordCount; ii LTE longerQuery.recordCount; ii = ii + 1){
             result[keyToUseForLonger][ii] = ii;
         }
     }
     //return the result
     return result;
 }

---

