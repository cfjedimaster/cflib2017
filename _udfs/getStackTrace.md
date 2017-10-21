---
layout: udf
title:  getStackTrace
date:   2011-07-01T12:14:39.000Z
library: UtilityLib
argString: ""
author: Ivo D. SIlva
authorEmail: aphex@netvisao.pt
version: 2
cfVersion: CF9
shortDescription: Gets the current stack trace, even if no error was thrown, and returns it in a query.
description: |
 Gets the current stack trace, even if no error was thrown, and returns it in a query.

returnValue: Returns a query.

example: |
 <cfdump label="StackTrace" var="#getStacktrace()#">

args:


javaDoc: |
 /**
  * Gets the current stack trace, even if no error was thrown, and returns it in a query.
  * Removed var e as it breaks in CF9
  * 
  * @return Returns a query. 
  * @author Ivo D. SIlva (aphex@netvisao.pt) 
  * @version 2, July 1, 2011 
  */

code: |
 function getStackTrace() {
   var j = "";
   var i = "";
   var StackTrace = "";
   
   try
   {
     j = CreateObject("java","java.lang.Throwable");
     j = j.getStackTrace();
 
     StackTrace = QueryNew("ClassName,MethodName,NativeMethod,LineNumber,hashCode");
     QueryAddRow(StackTrace,ArrayLen(j));
   
     for (i=1; i le ArrayLen(j); i = i+1)
     {
       QuerySetCell(StackTrace,'ClassName',j[i].getClassName(),i);
       QuerySetCell(StackTrace,'MethodName',j[i].getMethodName(),i);
       QuerySetCell(StackTrace,'NativeMethod',j[i].isNativeMethod(),i);
       QuerySetCell(StackTrace,'LineNumber',j[i].getLineNumber(),i);
       QuerySetCell(StackTrace,'hashCode',j[i].hashCode(),i);
     }
   }
   catch ( any e )
   {
     return e;
   }
   
   return StackTrace;
 }

---

