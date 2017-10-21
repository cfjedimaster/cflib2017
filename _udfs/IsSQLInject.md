---
layout: udf
title:  IsSQLInject
date:   2002-07-01T18:37:13.000Z
library: DatabaseLib
argString: "input"
author: Will Vautrain
authorEmail: vautrain@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Tests a string, one-dimensional array, or simple struct for possible SQL injection.
description: |
 This security-related function is intended to test for strings that users intentionally or otherwise may pass in form fields that may cause SQL injection to occur. SQL injection is an event in which a malicious or unknowing user inserts arbitrary SQL statements into queries without the knowledge of the programmer.
 
 This UDF mainly relates to those using SQLServer, I am not sure if the test I use protects against the same vulnerabilities on other database platforms.

returnValue: Returns a boolean.

example: |
 <cfset sqlString1 = "Chicken soup with rice">
 <cfset sqlString2 = "Chicken soup with' drop table soups--">
 
 <cfoutput>
 sqlString1 = #sqlString1# IsSQLInject? #IsSQLInject(sqlString1)#<br>
 sqlString2 = #sqlString2# IsSQLInject? #IsSQLInject(sqlString2)#<br>
 </cfoutput>

args:
 - name: input
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Tests a string, one-dimensional array, or simple struct for possible SQL injection.
  * 
  * @param input      String to check. (Required)
  * @return Returns a boolean. 
  * @author Will Vautrain (vautrain@yahoo.com) 
  * @version 1, July 1, 2002 
  */

code: |
 function IsSQLInject(input) {
     /*
     * The SQL-injection strings were used at the suggestion of Chris Anley [chris@ngssoftware.com]
     * in his paper "Advanced SQL Injection In SQL Server Applications" available for downloat at
     * http://www.ngssoftware.com/
     */
     var listSQLInject = "select,insert,update,delete,drop,--,'";
     var arraySQLInject = ListToArray(listSQLInject);
     var i = 1;
     
     for(i=1; i lte arrayLen(arraySQLInject); i=i+1) {
         if(findNoCase(arraySQLInject[i], input)) return true;
     }
     
     return false;
 }

---

