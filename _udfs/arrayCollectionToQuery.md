---
layout: udf
title:  arrayCollectionToQuery
date:   2010-03-03T13:12:52.000Z
library: DataManipulationLib
argString: "arrayColl"
author: Adam Tuttle
authorEmail: adam@fusiongrokker.com
version: 0
cfVersion: CF7
shortDescription: Converts a Flex ArrayCollection object to a ColdFusion Query object
tagBased: false
description: |
 For people that are more comfortable working with queries than arrayCollections, this should help.

returnValue: cfquery object

example: |
 <cfset testData = [
 {Num=2, String='fubar!', Bool=true, Date=CreateDate(2009,05,2)},
 {Num=4.8, String='bufar!', Bool=false, Date=CreateDate(2009,06,1)},
 {Num=6, String='futbol!', Bool=true, Date=CreateDate(2009,07,12)},
 {Num=8, String='string!', Bool=false, Date=CreateDate(2009,08,9)},
 {Num=10, String='data type!', Bool=true, Date=CreateDate(2009,09,18)},
 {Num=12, String='yes', Bool=false, Date=CreateDate(2009,10,6)}
 ] />
 
 <cfdump var="#testData#" label="data in">
 <cfdump var="#arrayCollectionToQuery(testdata)#" label="data out">

args:
 - name: arrayColl
   desc: Flex array collection
   req: true


javaDoc: |
 /**
  * Converts a Flex ArrayCollection object to a ColdFusion Query object
  * 03-mar-2010 added arguments scope
  * 
  * @param arrayColl      Flex array collection (Required)
  * @return cfquery object 
  * @author Adam Tuttle (adam@fusiongrokker.com) 
  * @version 0, March 3, 2010 
  */

code: |
 function arrayCollectionToQuery(arrayColl){
     var qResult = 0;
     var columnList = structKeyList(arguments.arrayColl[1]);
     var typeList = '';
     var numericType = '';
     var k = 0;
     var i = 0;
     for ( k in arguments.arrayColl[1] ){
         if (isNumeric(arguments.arrayColl[1][k])){
             //decimal or integer?
             numericType = 'integer';
             for ( i = 1 ; i lte arrayLen(arguments.arrayColl) ; i = i + 1 ){
                 if (arguments.arrayColl[i][k] - fix(arguments.arrayColl[i][k]) eq 0){
                     numericType = 'decimal';
                     break;
                 }
         }
             typelist = listAppend(typeList, numericType);
         } else if (isSimpleValue(arguments.arrayColl[1][k])){
             typeList = listAppend(typeList, 'varchar');
         } else if (isBoolean(arguments.arrayColl[1][k])){
             typeList = listAppend(typeList, 'bit');
         } else if (isDate(arguments.arrayColl[1][k])){
             typeList = listAppend(typeList, 'date');
         } else {
             //we can't throw() in cf8, so uh...
             return "All keys in your array collection must be of one of the following types: Numeric (Int or Float), String, Boolean, Date. The following key contains data that is not one of these types: `#k#`";
         }
     }
     qResult = queryNew(columnList, typeList);
     for ( i = 1 ; i lte arrayLen(arguments.arrayColl) ; i = i + 1 ){
         queryAddRow(qResult);
         for (k in arguments.arrayColl[i]){
             if (not isNumeric(arguments.arrayColl[i][k]) and not isSimpleValue(arguments.arrayColl[i][k]) and not isBoolean(arguments.arrayColl[i][k]) and not isDate(arguments.arrayColl[i][k])){
                 return "All keys in your array collection must be of one of the following types: Numeric (Int or Float), String, Boolean, Date. The following key contains data that is not one of these types: `#k#`";
             }
             querySetCell(qResult,k,arguments.arrayColl[i][k]);
         }
     }
     return qResult;
 }

oldId: 2025
---

