---
layout: udf
title:  IsFunction
date:   2001-09-26T13:23:29.000Z
library: UtilityLib
argString: "name"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns true if the function is a BIF (built in function) or UDF (user defined function).
description: |
 This UDF checks to see if a particular string is a BIF (built in function) or UDF (user defined function).

returnValue: Returns a boolean.

example: |
 <CFSET GoodBIF = "arraylen">
 <CFSET BadBIF = "victor">
 <CFSET GoodUDF = "IsFunction">
 <CFSET BadUDF = "newman">
 <CFOUTPUT>
 Is #GoodBIF# a function? #IsFunction(GoodBIF)#<BR>
 Is #BadBIF# a function? #IsFunction(BadBIF)#<BR>
 Is #GoodUDF# a function? #IsFunction(GoodUDF)#<BR>
 Is #BadUDF# a function? #IsFunction(BadUDF)#<BR>
 </CFOUTPUT>

args:
 - name: name
   desc: The name to check.
   req: true


javaDoc: |
 /**
  * Returns true if the function is a BIF (built in function) or UDF (user defined function).
  * 
  * @param name      The name to check. 
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, September 26, 2001 
  */

code: |
 function IsFunction(str) {
  if(ListFindNoCase(StructKeyList(GetFunctionList()),str)) return 1;
  if(IsDefined(str) AND Evaluate("IsCustomFunction(#str#)")) return 1;
  return 0;
 }

---

