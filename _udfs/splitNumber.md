---
layout: udf
title:  splitNumber
date:   2012-08-26T17:04:47.000Z
library: MathLib
argString: "number"
author: Darwan Leonardo Sitepu
authorEmail: dlns2001@yahoo.com
version: 1
cfVersion: CF8
shortDescription: Splits a numeric value into integer and decimal parts
tagBased: false
description: |
 Takes an numeric value and returns a struct with keys integer and decimal, each holding the relevant part of the original value.

returnValue: Returns a struct with keys integer and decimal, containing the relevant parts of the original number

example: |
 <cfset result = splitNumber(254.999989)>
 <cfoutput>
 Integer Value = #result.integer#<br /><!--- 254 --->
 Decimal Value = #result.decimal#<br /><!--- 999989 --->
 </cfoutput>

args:
 - name: number
   desc: A numeric value to split into integer/decimal parts
   req: true


javaDoc: |
 /**
  * Splits a numeric value into integer and decimal parts
  * version 0.1 by Darwan Leonardo Sitepu
  * version 1.0 by Adam Cameron. Renamed function, simplified logic, fixed a data truncation bug, returns a struct rather than a query now.
  * 
  * @param number      A numeric value to split into integer/decimal parts (Required)
  * @return Returns a struct with keys integer and decimal, containing the relevant parts of the original number 
  * @author Darwan Leonardo Sitepu (dlns2001@yahoo.com) 
  * @version 1, August 26, 2012 
  */

code: |
 public struct function splitNumber(required numeric number){
     var result = {};
     result.integer = listFirst(number, ".");
     if (listLen(number, ".") > 1){
         result.decimal = listRest(number, ".");
     }else{
         result.decimal = 0;
     }
     return result;
 }

---

