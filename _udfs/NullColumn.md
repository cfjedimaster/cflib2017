---
layout: udf
title:  NullColumn
date:   2002-09-20T11:23:30.000Z
library: DatabaseLib
argString: "columnValue[, dataType]"
author: Charles McElwee
authorEmail: cmcelwee@etechsolutions.com
version: 1
cfVersion: CF5
shortDescription: Useful in constructing SQL statements that must handle empty strings as NULLs.
tagBased: false
description: |
 This function takes a CF variable and optionally a CF datatype ('alpha' or 'numeric') and returns either the CF value or NULL.  If it returns the CF value, it will be quoted if invoked with the 'alpha' datatype argument (default).

returnValue: Returns a string.

example: |
 <cfoutput>
 <cfset testFld1 = "a">
 update test<br>
 set testfld = #nullColumn(testFld1)#<br>
 where keycol = 2<br><br>
 <cfset testFld2 = "">
 update test<br>
 set testfld = #nullColumn(testFld2)#<br>
 where keycol = 2<br><br>
 <cfset testFld3 = 9>
 update test<br>
 set testNumeric = #nullColumn(testFld3, 'numeric')#<br>
 where keycol = 2<br><br>
 </cfoutput>

args:
 - name: columnValue
   desc: The value to test. 
   req: true
 - name: dataType
   desc: Allows you to specify 'alpha' or 'numeric'. If alpha, value is wrapped in single quotes. Default is alpha.
   req: false


javaDoc: |
 /**
  * Useful in constructing SQL statements that must handle empty strings as NULLs.
  * Rewritten to use one UDF by RCamden
  * 
  * @param columnValue      The value to test.  (Required)
  * @param dataType      Allows you to specify 'alpha' or 'numeric'. If alpha, value is wrapped in single quotes. Default is alpha. (Optional)
  * @return Returns a string. 
  * @author Charles McElwee (cmcelwee@etechsolutions.com) 
  * @version 1, September 20, 2002 
  */

code: |
 function NullColumn(columnValue) {
     var dataType = "alpha";
     
     if(arrayLen(arguments) gte 2) dataType = arguments[2];
     if(trim(columnValue) eq "") return "NULL";
      else if(dataType is "alpha") return "'" & columnValue & "'";
     else return columnValue;
 }

oldId: 718
---

