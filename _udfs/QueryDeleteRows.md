---
layout: udf
title:  QueryDeleteRows
date:   2017-11-4T11:09:58.000Z
library: DataManipulationLib
argString: "Query, Rows"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 3
cfVersion: CF5
shortDescription: Removes rows from a query.
tagBased: false
description: |
 This function will allow you to remove rows from a query. You can either remove one row or a list of rows.

returnValue: This function returns a query.

example: |
 <cfset query = queryNew("id,name,age")>
 <cfloop index="X" from=1 to=8>
 <cfset queryAddRow(query,1)>
 <cfset querySetCell(query,"ID",X,X)>
 <cfset querySetCell(query,"Name","Name #X#",X)>
 <cfset querySetCell(query,"Age",X+15,X)>
 </cfloop>
 Before deleting<BR>
 <cfdump VAR="#Query#">
 <cfset query = queryDeleteRows(query,"1,3")>
 <P>After removing rows 1 and 3<BR>
 <cfdump VAR="#Query#">
 <P>After removing row 3<BR>
 <cfset query = queryDeleteRows(Query,3)>
 <cfdump var="#Query#">

args:
 - name: Query
   desc: Query to be modified
   req: true
 - name: Rows
   desc: Either a number or a list of numbers
   req: true


javaDoc: |
 /**
  * Removes rows from a query.
  * Added var col = "";
  * No longer using Evaluate. Function is MUCH smaller now.
  * Maintains original column types - mod by Ray Ford
  * 
  * @param Query      Query to be modified 
  * @param Rows      Either a number or a list of numbers 
  * @return This function returns a query. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 3, October 11, 2001 
  */

code: |
 function QueryDeleteRows(Query,Rows) {
    var tmp = '';
    var i = 1;
    var x = 1;    
    var aryMeta = getMetaData(Query);
    var ColumnList = '';    	
    var TypeList = '';   
    for(i=1;i lte arrayLen(aryMeta); i=i+1) {
        ColumnList = listAppend(ColumnList,aryMeta[i].Name);
        TypeList = listAppend(TypeList,  reRePlaceNoCase( aryMeta[i].TypeName ,'^INT$','Integer')   );
    }
    tmp = QueryNew(ColumnList,TypeList);
    for(i=1;i lte Query.recordCount; i=i+1) {
        if(not ListFind(Rows,i)) {
            QueryAddRow(tmp,1);
            for(x=1;x lte ListLen(ColumnList);x=x+1) {
                QuerySetCell(tmp, ListGetAt(ColumnList,x), query[ListGetAt(ColumnList,x)][i]);
            }
        }
    }
    return tmp;
 }
oldId: 11
---

