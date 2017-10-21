---
layout: udf
title:  excelColumnNumtoColumnName
date:   2010-05-03T20:31:36.000Z
library: UtilityLib
argString: "columnName"
author: Adam Tuttle
authorEmail: adam@fusiongrokker.com
version: 1
cfVersion: CF5
shortDescription: Converts a numeric column position to its Excel Column Name
description: |
 Converts a numeric column position (i.e. 127) to its Excel Column Name (DW). Assumes column numbers are 1-based (1=A,2=B,...)

returnValue: Returns a string.

example: |
 column 1 is #ExcelColumnNumtoColumnName(1)#<br/>
 column 18 is #ExcelColumnNumtoColumnName(18)#<br/>
 column 100 is #ExcelColumnNumtoColumnName(100)#<br/>
 column 653 is #ExcelColumnNumtoColumnName(653)#

args:
 - name: columnName
   desc: Numeric column number.
   req: true


javaDoc: |
 /**
  * Converts a numeric column position to its Excel Column Name
  * 
  * @param columnName      Numeric column number. (Required)
  * @return Returns a string. 
  * @author Adam Tuttle (adam@fusiongrokker.com) 
  * @version 1, May 3, 2010 
  */

code: |
 function excelColumnNumtoColumnName(columnNumber){
     var dividend = fix(arguments.columnNumber); //make sure input is an integer
     var columnName = '';
     var modulo = 0;
     //if dividend <= 0, an empty string will be returned
     while (dividend gt 0){
         modulo = (dividend - 1) mod 26;
         columnName = "#chr(65 + modulo)##columnName#";
         dividend = fix((dividend - modulo) / 26);
     }
     return columnName;
 }

---

