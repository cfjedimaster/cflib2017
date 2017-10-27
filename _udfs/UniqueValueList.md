---
layout: udf
title:  UniqueValueList
date:   2007-03-27T13:21:00.000Z
library: DataManipulationLib
argString: "queryname, columnname[, cs]"
author: Nick Giovanni
authorEmail: ngiovanni@gmail.com
version: 1
cfVersion: CF5
shortDescription: Returns a list of unique values from a query column.
tagBased: false
description: |
 Returns a list of unique values from a query column with the option of case sensitive or not.

returnValue: Returns a string.

example: |
 --Not Case sensitive
 #uniqueValueList(queryName, "queryColumn")#
 
 -- Case Sensitive
 #uniqueValueList(queryName, "queryColumn", 1)#

args:
 - name: queryname
   desc: Query to scan.
   req: true
 - name: columnname
   desc: Column to use.
   req: true
 - name: cs
   desc: If true, the unique list will check the case of the values. Defaults to false.
   req: false


javaDoc: |
 /**
  * Returns a list of unique values from a query column.
  * 
  * @param queryname      Query to scan. (Required)
  * @param columnname      Column to use. (Required)
  * @param cs      If true, the unique list will check the case of the values. Defaults to false. (Optional)
  * @return Returns a string. 
  * @author Nick Giovanni (ngiovanni@gmail.com) 
  * @version 1, March 27, 2007 
  */

code: |
 function uniqueValueList(queryName, columnName) {
     var cs = 0; 
     var curRow = 1;
     var uniqueList = "";  
     
     if(arrayLen(arguments) GTE 3 AND isBoolean(arguments[3])) cs = arguments[3]; 
     
     for(; curRow LTE queryName.recordCount; curRow = curRow +1){
         if((not cs AND not listFindNoCase(uniqueList, trim(queryName[columnName][curRow]))) OR (cs AND not listFind(uniqueList, trim(queryName[columnName][curRow])))){
             uniqueList = ListAppend(uniqueList, trim(queryName[columnName][curRow]));
         }
     }
     return uniqueList; 
 }

oldId: 1573
---

