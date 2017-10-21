---
layout: udf
title:  Query2Excel
date:   2005-02-23T15:42:40.000Z
library: DataManipulationLib
argString: "query[, headers][, cols][, alternateColor]"
author: Jesse Monson
authorEmail: jesse@ixstudios.com
version: 2
cfVersion: CF5
shortDescription: Converts a query to excel-ready format.
description: |
 By passing in a query, list of query columns, and list of display headers and an alternating row color you can create content that can be saved directly with a .xls extension.  Must be able to use the CFCONTENT tag.

returnValue: Returns a string.

example: |
 <cfscript>
     cols = "sName,sAge";
     heads = "First Name,Age";
     data = queryNew(cols);
     queryAddRow(data,2);
     querySetCell(data,"sName","Joe",1);
     querySetCell(data,"sAge","25",1);
     querySetCell(data,"sName","John",2);
     querySetCell(data,"sAge","30",2);
 </cfscript>
 <!--- Uncomment when testing.
 <CFHEADER NAME="Content-Disposition" VALUE="inline; filename=foo.xls">
 <cfcontent type="application/msexcel">---><cfoutput>#Query2Excel(data,heads,cols,"DDDDDD")#</cfoutput><!---<cfabort>--->

args:
 - name: query
   desc: The query to use.
   req: true
 - name: headers
   desc: A list of headers. Defaults to col.
   req: false
 - name: cols
   desc: The columns of the query. Defaults to all columns.
   req: false
 - name: alternateColor
   desc: The color to use for every other row. Defaults to white.
   req: false


javaDoc: |
 /**
  * Converts a query to excel-ready format.
  * Version 2 by Andrew Tyrone. It now returns a string instead of directly outputting.
  * 
  * @param query      The query to use. (Required)
  * @param headers      A list of headers. Defaults to col. (Optional)
  * @param cols      The columns of the query. Defaults to all columns. (Optional)
  * @param alternateColor      The color to use for every other row. Defaults to white. (Optional)
  * @return Returns a string. 
  * @author Jesse Monson (jesse@ixstudios.com) 
  * @version 2, February 23, 2005 
  */

code: |
 function Query2Excel(query) {
     var InputColumnList = query.columnList;
     var Headers = query.columnList;
 
     var AlternateColor = "FFFFFF";
     var header = "";
     var headerLen = 0;
     var col = "";
     var colValue = "";
     var colLen = 0;
     var i = 1;
     var j = 1;
     var k = 1;
     
     var HTMLData = "";
     
     if (arrayLen(arguments) gte 2) {
         Headers = arguments[2];
     }
     if (arrayLen(arguments) gte 3) {
         InputColumnList = arguments[3];
     }
 
     if (arrayLen(arguments) gte 4) {
         AlternateColor = arguments[4];
     }
     if (listLen(InputColumnList) neq listLen(Headers)) {
         return "Input Column list and Header list are not of equal length";
     }
     
     HTMLData = HTMLData & "<table border=1><tr bgcolor=""C0C0C0"">";
     for (i=1;i lte ListLen(Headers);i=i+1){
         header=listGetAt(Headers,i);
         headerLen=Len(header)*10;
         HTMLData = HTMLData & "<th width=""#headerLen#""><b>#header#</b></th>";
     }
     HTMLData = HTMLData & "</tr>";
     for (j=1;j lte query.recordcount;j=j+1){
         if (j mod 2) {
             HTMLData = HTMLData & "<tr bgcolor=""FFFFFF"">";
         } else {
             HTMLData = HTMLData & "<tr bgcolor=""#alternatecolor#"">";
         }
         for (k=1;k lte ListLen(InputColumnList);k=k+1) {
             col=ListGetAt(InputColumnList,k);
             colValue=query[trim(col)][j];
             colLength=Len(colValue)*10;
             if (NOT Len(colValue)) {
                 colValue="&nbsp;";
             } 
             if (isNumeric(colValue) and Len(colValue) gt 10) {
                 colValue="'#colValue#";
             } 
             HTMLData = HTMLData & "<td width=""#colLength#"">#colValue#</td>";
         }
     HTMLData = HTMLData & "</tr>";
     }
     HTMLData = HTMLData & "</table>";
     
     return HTMLData;
 }

---

