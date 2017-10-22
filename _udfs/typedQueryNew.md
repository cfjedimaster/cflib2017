---
layout: udf
title:  typedQueryNew
date:   2010-11-16T16:29:22.000Z
library: DataManipulationLib
argString: "columnData"
author: Ryan Stille
authorEmail: ryan@stillnet.org
version: 1
cfVersion: CF7
shortDescription: Function to easily create query objects with data types.
tagBased: false
description: |
 Creating large queries with queryNew() and specifying data types can be frustrating.  The long comma separated lists of fields and datatypes can be hard to correlate.  This function makes it easier to create queries with datatypes specified.

returnValue: Returns a query.

example: |
 <cfset myQuery = typedQueryNew( {
    name = 'varchar',
    age = 'integer',
    address = 'varchar'
    } ) />

args:
 - name: columnData
   desc: Structure of label/type fields for the query.
   req: true


javaDoc: |
 /**
  * Function to easily create query objects with data types.
  * 
  * @param columnData      Structure of label/type fields for the query. (Required)
  * @return Returns a query. 
  * @author Ryan Stille (ryan@stillnet.org) 
  * @version 1, November 16, 2010 
  */

code: |
 function typedQueryNew(columnData) {
     
     var columnname = "";
     var stringofColumns = "";
     var stringofTypes = "";
     var counter = 0;
     
     for (columnName in arguments.columnData) {
         counter++;
             
         stringOfColumns &= columnName;
         stringOfTypes &= arguments.columnData[columnName];
         if (counter NEQ StructCount(arguments.columnData)) {
             stringofColumns &= ", ";
             stringofTypes &= ", ";
             }
         }
 
     return queryNew(stringofColumns,stringofTypes);
 
     }

---

