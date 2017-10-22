---
layout: udf
title:  KilogramsToPounds
date:   2003-05-09T17:23:13.000Z
library: ScienceLib
argString: "value"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Kilograms to pounds conversion.
tagBased: false
description: |
 Kilograms to pounds conversion.

returnValue: Returns a number.

example: |
 <cfset myvalue = 125>
 <cfset pounds  = KilogramsToPounds(myvalue)>
 <cfdump var="Pounds: #pounds#">

args:
 - name: value
   desc: Weight in kilograms.
   req: true


javaDoc: |
 /**
  * Kilograms to pounds conversion.
  * 
  * @param value      Weight in kilograms. (Required)
  * @return Returns a number. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, May 9, 2003 
  */

code: |
 function KilogramsToPounds(value) {
   var t = '0';
   if(value gt 0) t = value*2.2046;
   return t;
 }

---

