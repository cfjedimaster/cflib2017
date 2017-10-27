---
layout: udf
title:  QuerySim
date:   2007-12-18T20:09:30.000Z
library: DataManipulationLib
argString: "queryData"
author: Bert Dawson
authorEmail: bert@redbanner.com
version: 2
cfVersion: CF5
shortDescription: Accepts a specifically formatted chunk of text, and returns it as a query object.
tagBased: false
description: |
 Accepts a specifically formatted chunk of text, and returns it as a query object.  Based on QuerySim.cfm by hal.helms@TeamAllaire.com.
 
 Pass in a block of text where the first line is a comma separated column list, and subequent lines represent records, with '|' delimited data cells.
 
 Note that version 2 no longer accepts the queryname as the first line.

returnValue: Returns a query object.

example: |
 <cfscript>
 people = querySim('
 id , name , mail
 1 | weed | weed@theflowerpot.not
 2 | bill | bill@theflowerpot.not
 3 | ben | ben@theflowerpot.not
 ');
 </cfscript>
 
 People
 <cfdump var="#people#">

args:
 - name: queryData
   desc: Specifically format chunk of text to convert to a query.
   req: true


javaDoc: |
 /**
  * Accepts a specifically formatted chunk of text, and returns it as a query object.
  * v2 rewrite by Jamie Jackson
  * 
  * @param queryData      Specifically format chunk of text to convert to a query. (Required)
  * @return Returns a query object. 
  * @author Bert Dawson (bert@redbanner.com) 
  * @version 2, December 18, 2007 
  */

code: |
 function querySim(queryData) {
     var fieldsDelimiter="|";
     var colnamesDelimiter=",";
     var listOfColumns="";
     var tmpQuery="";
     var numLines="";
     var cellValue="";
     var cellValues="";
     var colName="";
     var lineDelimiter=chr(10) & chr(13);
     var lineNum=0;
     var colPosition=0;
 
     // the first line is the column list, eg "column1,column2,column3"
     listOfColumns = Trim(ListGetAt(queryData, 1, lineDelimiter));
     
     // create a temporary Query
     tmpQuery = QueryNew(listOfColumns);
 
     // the number of lines in the queryData
     numLines = ListLen(queryData, lineDelimiter);
     
     // loop though the queryData starting at the second line
     for(lineNum=2;  lineNum LTE numLines;  lineNum = lineNum + 1) {
         cellValues = ListGetAt(queryData, lineNum, lineDelimiter);
 
         if (ListLen(cellValues, fieldsDelimiter) IS ListLen(listOfColumns,",")) {
             QueryAddRow(tmpQuery);
             for (colPosition=1; colPosition LTE ListLen(listOfColumns); colPosition = colPosition + 1){
                 cellValue = Trim(ListGetAt(cellValues, colPosition, fieldsDelimiter));
                 colName   = Trim(ListGetAt(listOfColumns,colPosition));
                 QuerySetCell(tmpQuery, colName, cellValue);
             }
         } 
     }
     
     return( tmpQuery );
     
 }

oldId: 255
---

