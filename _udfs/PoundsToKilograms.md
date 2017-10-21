---
layout: udf
title:  PoundsToKilograms
date:   2003-05-09T17:24:38.000Z
library: ScienceLib
argString: "value"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Pounds to kilograms conversion.
description: |
 Pounds to kilograms conversion.

returnValue: Returns a number.

example: |
 <cfset myvalue = 215>
 <cfset Kilograms = PoundsToKilograms(myvalue)>
 <cfdump var="Kilograms: #Kilograms#">

args:
 - name: value
   desc: Weight in pounds.
   req: true


javaDoc: |
 /**
  * Pounds to kilograms conversion.
  * 
  * @param value      Weight in pounds. (Required)
  * @return Returns a number. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, May 9, 2003 
  */

code: |
 function PoundsToKilograms(value) {
   var t = '0';
   if(value gt 0) t= value*0.4536;
   return t;
 }

---

