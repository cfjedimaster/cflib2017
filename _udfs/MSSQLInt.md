---
layout: udf
title:  MSSQLInt
date:   2003-04-01T12:45:25.000Z
library: DatabaseLib
argString: "number"
author: Michael Slatoff
authorEmail: michael@slatoff.com
version: 1
cfVersion: CF5
shortDescription: Checks to see if the number is a valid SQL-92 integer.
description: |
 Checks to see if the number is a valid SQL-92 integer. If it is valid, return number else return 0.

returnValue: Returns a number.

example: |
 <!---
 <cfquery name="EmployeeDetails" datasource="Intranet">
     SELECT
         EmployeeID, FirstName, LastName
     FROM
         Employees
     WHERE
         EmployeeID = <cfqueryparam value="#MSSQLInt(ATTRIBUTES.EmployeeID)#" cfsqltype="CF_SQL_INTEGER">
 </cfquery>
 --->

args:
 - name: number
   desc: Number to check.
   req: true


javaDoc: |
 /**
  * Checks to see if the number is a valid SQL-92 integer.
  * Rewritten by RCamden. Code didn't work as submitted.
  * 
  * @param number      Number to check. (Required)
  * @return Returns a number. 
  * @author Michael Slatoff (michael@slatoff.com) 
  * @version 1, April 1, 2003 
  */

code: |
 function MSSQLInt(number) {
     if (val(number) LT -2147483648 OR val(number) GT 2147483247) return 0;
     else return number;
 }

---

