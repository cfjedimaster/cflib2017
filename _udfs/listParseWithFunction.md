---
layout: udf
title:  listParseWithFunction
date:   2006-02-03T13:27:29.000Z
library: StrLib
argString: "list, funcitonName[, delimiters]"
author: Kit Brandner
authorEmail: orchaen@gmail.com
version: 1
cfVersion: CF5
shortDescription: Parse a list of values with the specified function.
description: |
 Parse a list of values with the specified function. Returns a list of the values returned by the function itself. Only UDFs are supported, but a UDF could be used to wrap a built-in function.

returnValue: Returns a list.

example: |
 <cfscript>
 function x(y) { return y & "  foo "; }
 </cfscript>
 
 <cfoutput>#listParseWithFunction("a,b,c", x)#</cfoutput>

args:
 - name: list
   desc: List to use.
   req: true
 - name: funcitonName
   desc: The UDF.
   req: true
 - name: delimiters
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Parse a list of values with the specified function.
  * 
  * @param list      List to use. (Required)
  * @param funcitonName      The UDF. (Required)
  * @param delimiters      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a list. 
  * @author Kit Brandner (orchaen@gmail.com) 
  * @version 1, February 3, 2006 
  */

code: |
 function listParseWithFunction(list,functionName) {
     var delimiters = ",";
     var returnList = "";
     var i = "";
     if(arrayLen(Arguments) gt 2) delimiters = Arguments[2];
 
     for(i=1;i lte listLen(list, delimiters); i=i+1) returnList = listAppend(returnList, functionName(listGetAt(list, i)), delimiters);
     return returnList;
 }

---

