---
layout: udf
title:  queryGetRow
date:   2014-06-21T23:23:03.000Z
library: CFMLLib
argString: "query[, row]"
author: Henry Ho
authorEmail: henryho167@gmail.com
version: 1
cfVersion: CF9
shortDescription: This function returns a struct having all the lowercased columns as keys and their corresponding values
tagBased: false
description: |
 Simulate QueryGetRow @ https://wikidocs.adobe.com/wiki/display/coldfusionen/QueryGetRow for CF8+

returnValue: Returns a struct containing the data from the selected row

example: |
 // TestQueryGetRow.cfc
 component extends="testbox.system.BaseSpec" {
 
     function run(){
         include "udfs/queryGetRow.cfm"; // renamed to _queryGetRow() for tests, as I'm running CF11
 
         describe("Tests for convertBBCodeToHtml()", function(){
             it("handles an empty query", function(){
                 expect(
                     queryGetRow(queryNew(""), 0)
                 ).toBe({});
             });
             it("handles zeroth row from a one-row query", function(){
                 var q = queryNew("col", "varchar", [["data"]]);
                 expect(
                     queryGetRow(q, 0)
                 ).toBe({col=""});
             });
             it("handles first row from a one-row query", function(){
                 var q = queryNew("col", "varchar", [["data"]]);
                 expect(
                     queryGetRow(q, 1)
                 ).toBe({col="data"});
             });
             it("handles row with multiple columns", function(){
                 var q = queryNew("col1,col2", "varchar,varchar", [["data1","data2"]]);
                 expect(
                     queryGetRow(q, 1)
                 ).toBe({col1="data1",col2="data2"});
             });
         });
     }
 
 }

args:
 - name: query
   desc: The query from which to extract the row data
   req: true
 - name: row
   desc: The row to extract. Defaults to currentRow
   req: false


javaDoc: |
 /**
  * This function returns a struct having all the lowercased columns as keys and their corresponding values
  * v0.9 by Henry Ho
  * v1.0 by Adam Cameron (re-write in script)
  * 
  * @param query      The query from which to extract the row data (Required)
  * @param row      The row to extract. Defaults to currentRow (Optional)
  * @return Returns a struct containing the data from the selected row 
  * @author Henry Ho (henryho167@gmail.com) 
  * @version 1, June 21, 2014 
  */

code: |
 public struct function queryGetRow(required query query, numeric row){
     if (!structKeyExists(arguments, "row")){
         row = query.currentRow;
     }
     
     var struct = {};
     for (var col in listToArray(query.columnList)){
         struct[lcase(col)] = query[col][row];
     }
 
     return struct;
 }

---

