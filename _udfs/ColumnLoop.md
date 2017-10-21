---
layout: udf
title:  ColumnLoop
date:   2003-09-12T16:32:58.000Z
library: DataManipulationLib
argString: "query, columnName, theEval"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Applies simple evaluations to every cell in a query column.
description: |
 Applies the passed evaluation to every cell in the specified query column. Allows versatile conversions, calculations, formatting and other alterations to an entire query column in one step. Use the variable &quot;x&quot; in the passed evaluation to denote the cell's original value. Especially useful for pre-processing a query before passing it to &lt;cfchart&gt;.

returnValue: Returns a query.

example: |
 <CFSET my_query = QueryNew("URL,Hits")>
 <CFSET QueryAddRow(my_query, 1)>
 <CFSET QuerySetCell(my_query,"URL", "http://www.cflib.org/index.cfm")>
 <CFSET QuerySetCell(my_query,"Hits","1000")>
 <CFSET QueryAddRow(my_query, 1)>
 <CFSET QuerySetCell(my_query,"URL", "http://www.cflib.org/about.cfm")>
 <CFSET QuerySetCell(my_query,"Hits","100")>
 <CFSET QueryAddRow(my_query, 1)>
 <CFSET QuerySetCell(my_query,"URL", "http://www.cflib.org/resources.cfm")>
 <CFSET QuerySetCell(my_query,"Hits","200")>
 
 Query:<br>
 <br>
 <CFDUMP VAR="#my_query#">
 <br>
 <br>
 
 Modify with ColumnLoop("my_query", "Url", "x=ReplaceNoCase(x, ""http://www.cflib.org"", """", ""ALL"")"):<br>
 <br>
 <cfset my_query2 = ColumnLoop(duplicate(my_query), "Url", "x=ReplaceNoCase(x, ""http://www.cflib.org"", """", ""ALL"")")>
 <CFDUMP VAR="#my_query2#">

args:
 - name: query
   desc: Query object.
   req: true
 - name: columnName
   desc: Column to be modified.
   req: true
 - name: theEval
   desc: Evaluation to be performed. Use X to represent column data.
   req: true


javaDoc: |
 /**
  * Applies simple evaluations to every cell in a query column.
  * 
  * @param query      Query object. (Required)
  * @param columnName      Column to be modified. (Required)
  * @param theEval      Evaluation to be performed. Use X to represent column data. (Required)
  * @return Returns a query. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, September 12, 2003 
  */

code: |
 function ColumnLoop(query, columnName, theEval) {
     var row = 0;
     var x = "";
     var rec_count = query.recordCount;
     for(row=1; row LTE rec_count; row=row+1) {
         x = query[columnName][row];
         querySetCell(query,columnname,evaluate(theEval),row);
     }
     return query;
 }

---

