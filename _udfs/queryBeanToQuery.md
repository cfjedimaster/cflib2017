---
layout: udf
title:  queryBeanToQuery
date:   2005-05-20T22:04:37.000Z
library: DataManipulationLib
argString: "objQueryBean"
author: Alistair Davidson
authorEmail: alistair_davidson@hotmail.com
version: 1
cfVersion: CF6
shortDescription: Converts a Java QueryBean object to a ColdFusion query object.
tagBased: false
description: |
 Pass it a Java QueryBean object, and it will return an equivalent ColdFusion query object - handy for dealing with complex data from webservices.
 
 If the passed object is not a QueryBean, it will output a message and return an empty query.

returnValue: Returns a query.

example: |
 <cfscript>
     objQueryBean = createObject( "java", "coldfusion.xml.rpc.QueryBean" );
     arrValues = arrayNew(1);
     arrColumns = arrayNew(1);
     arrColumns[1] = "ID";
     arrColumns[2] = "Name";
     // add a row
     arrValues[1] = arrayNew(1);
     arrValues[1][1] = "my id";
     arrValues[1][2] = "my name";
     // add a row
     arrValues[2] = arrayNew(1);
     arrValues[2][1] = "your id";
     arrValues[2][2] = "your name";
     // set up the QueryBean
     objQueryBean.setColumnList(arrColumns);
     objQueryBean.setData( arrValues );
 </cfscript>
 <cfoutput>
     The QueryBean object:
 </cfoutput>
 <cfdump var="#objQueryBean#">
 <cfoutput>
     Converted to a query:
 </cfoutput>
 <cfset objMyQuery = queryBeanToQuery( objQueryBean ) />
 <Cfdump var="#objMyQuery#" />

args:
 - name: objQueryBean
   desc: A Java QueryBean object.
   req: true


javaDoc: |
 /**
  * Converts a Java QueryBean object to a ColdFusion query object.
  * 
  * @param objQueryBean      A Java QueryBean object. (Required)
  * @return Returns a query. 
  * @author Alistair Davidson (alistair_davidson@hotmail.com) 
  * @version 1, May 20, 2005 
  */

code: |
 function queryBeanToQuery(objQueryBean) {
     var qry_return = "";
     var arrColumns = ArrayNew(1);
     var arrRows = arrayNew(1);
     var thisRow = 0;
     var thisCol = 0;
     var numRows = 0;
     var thisVal = "";
     
     if( objQueryBean.getClass() EQ "class coldfusion.xml.rpc.QueryBean" ){
         arrColumns = objQueryBean.getColumnList();
         numCols = arrayLen( arrColumns );
         arrRows = objQueryBean.getData();
         numRows = arrayLen( arrRows );
         // create the return query object
         qry_return = QueryNew( ArrayToList(arrColumns) );
         // loop round each row
         for( thisRow = 1; thisRow LTE numRows; thisRow = thisRow + 1 ){
             QueryAddRow( qry_return );
             // loop round each column
             for( thisCol = 1; thisCol LTE numCols; thisCol = thisCol + 1 ){
                 // empty columns seem to give rise to undefined array elements!
                 try{
                     thisVal = arrRows[thisRow][thisCol];
                 } 
                 catch(Any e) {
                     thisVal = "";
                 }
                 QuerySetCell( qry_return, arrColumns[thisCol], thisVal );
             }
         }
         return qry_return;
         
     } else return queryNew("");
 }

---

