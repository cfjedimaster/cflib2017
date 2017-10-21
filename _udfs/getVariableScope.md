---
layout: udf
title:  getVariableScope
date:   2004-08-06T10:06:35.000Z
library: UtilityLib
argString: "localVar"
author: Mosh Teitelbaum
authorEmail: mosh.teitelbaum@evoch.com
version: 1
cfVersion: CF5
shortDescription: Function that determines which scope an unscoped variable refers to.
description: |
 Function that determines which scope an unscoped variable refers to.  Only checks those scopes through which ColdFusion searches.  Does not check named scopes (i.e., query names, etc.).

returnValue: Returns a string.

example: |
 <CFSET foo = "bar">
 <CFSET URL.foo = "bar">
 <CFSET COOKIE.foo = "bar">
 <CFSET FORM.foo = "bar">
 
 <CFOUTPUT>
 #getVariableScope("foo")#
 </CFOUTPUT>

args:
 - name: localVar
   desc: Variable name to check.
   req: true


javaDoc: |
 /**
  * Function that determines which scope an unscoped variable refers to.
  * 
  * @param localVar      Variable name to check. (Required)
  * @return Returns a string. 
  * @author Mosh Teitelbaum (mosh.teitelbaum@evoch.com) 
  * @version 1, August 6, 2004 
  */

code: |
 function getVariableScope(locVar) {
     var scopeList = "VARIABLES,CGI,FILE,URL,FORM,COOKIE,CLIENT,APPLICATION,SESSION,SERVER,REQUEST,CFHTTP,CALLER,ATTRIBUTES,ERROR,CFCATCH,CFFTP";
     var listEle = "";
     var cnt = 1;
 
     while (cnt LTE ListLen(scopeList)) {
         // Get current list element
         listEle = ListGetAt(scopeList, cnt);
 
         // Check for existence within current scope.  CGI is a special case
         if (listEle is "CGI" AND structKeyExists(cgi, locVar)) {
                 return listEle;
         } else if (not listEle is "CGI" AND IsDefined("#listEle#.#locVar#")) {
                 return listEle;
         }
 
         // Increment counter
         cnt = cnt + 1;
     }
 
 }

---

