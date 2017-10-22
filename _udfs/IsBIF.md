---
layout: udf
title:  IsBIF
date:   2001-09-26T13:19:15.000Z
library: UtilityLib
argString: "name"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns true if the function is a BIF (built in function).
tagBased: false
description: |
 This UDF checks to see if a particular string exists as a BIF (built in function).

returnValue: Returns a boolean.

example: |
 <CFSET Good = "arraylen">
 <CFSET Bad = "victor">
 <CFOUTPUT>
 Is #Good# a BIF? #IsBif(Good)#<BR>
 Is #Bad# a BIF? #IsBif(Bad)#<BR>
 </CFOUTPUT>

args:
 - name: name
   desc: The name to check.
   req: true


javaDoc: |
 /**
  * Returns true if the function is a BIF (built in function).
  * 
  * @param name      The name to check. 
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, September 26, 2001 
  */

code: |
 function IsBIF(name) {
     return ListFindNoCase(StructKeyList(GetFunctionList()),name) GT 0;
 }

---

