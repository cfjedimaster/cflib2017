---
layout: udf
title:  param
date:   2006-02-13T12:57:53.000Z
library: UtilityLib
argString: "scope, varname[, value]"
author: Robert Blackburn
authorEmail: skorpiun@gmail.com
version: 1
cfVersion: CF5
shortDescription: Function to duplicate the cfparam for scoped variables.
description: |
 This is similar to CFParam UDF, but uses structKeyExists() instead of isDefined() for slightly better performance and more easily debugged code.

returnValue: Returns the value of the variable.

example: |
 <cfset param(VARIABLES, "variablename")>
 <cfset param(VARIABLES, "variablename", "testVar")>
 <cfset param(URL, "variablename", "testURLVar")>
 <cfset param(FORM, "variablename", "testURLVar")>

args:
 - name: scope
   desc: Scope to check.
   req: true
 - name: varname
   desc: Variable name to param.
   req: true
 - name: value
   desc: Value to use. Defaults to a space.
   req: false


javaDoc: |
 /**
  * Function to duplicate the cfparam for scoped variables.
  * 
  * @param scope      Scope to check. (Required)
  * @param varname      Variable name to param. (Required)
  * @param value      Value to use. Defaults to a space. (Optional)
  * @return Returns the value of the variable. 
  * @author Robert Blackburn (skorpiun@gmail.com) 
  * @version 1, February 13, 2006 
  */

code: |
 function param(scope, varname) {
     var value = "";
     
     if(arrayLen(arguments) gt 2) {
         value = arguments[3];
     }
     
     if(NOT structKeyExists(arguments.scope, arguments.varname) ) {
         arguments.scope[arguments.varname] = value;
     }
     
     return arguments.scope[arguments.varname];
 }

---

