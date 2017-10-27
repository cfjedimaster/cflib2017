---
layout: udf
title:  ScopeCoalesce
date:   2004-02-18T00:49:11.000Z
library: DataManipulationLib
argString: "strVariable, lstScope[, default]"
author: Scott Jibben
authorEmail: scott@jibben.com
version: 1
cfVersion: CF5
shortDescription: This UDF will find the first variable scope that exists for a variable in the list of variable scopes and return its value.
tagBased: false
description: |
 This UDF can be used to get a value from a form, url, or other scope variable depending on its existence.  It can also be useful to force a scope precedence that is different from the ColdFusion default.  The optional 3rd parameter allows you to define the default return value if is desired.

returnValue: Returns any possible value.

example: |
 <cfset request.testing = "20">
 <cfset form.testing = "10">
 <cfset url.testing = "5">
 <cfset variables.testing = ScopeCoalesce("testing", "client,form,url")>
 <cfoutput>
   variables.testing = '#variables.testing#'
 </cfoutput>
 <!- the output will display '10' ->

args:
 - name: strVariable
   desc: Variable to check for.
   req: true
 - name: lstScope
   desc: List of scopes to check.
   req: true
 - name: default
   desc: Default value to use if the variable does not exists. Defaults to an empty string.
   req: false


javaDoc: |
 /**
  * This UDF will find the first variable scope that exists for a variable in the list of variable scopes and return its value.
  * 
  * @param strVariable      Variable to check for. (Required)
  * @param lstScope      List of scopes to check. (Required)
  * @param default      Default value to use if the variable does not exists. Defaults to an empty string. (Optional)
  * @return Returns any possible value. 
  * @author Scott Jibben (scott@jibben.com) 
  * @version 1, February 17, 2004 
  */

code: |
 function ScopeCoalesce(strVariable, lstScopes) {
   var vRet = "";
   var nIndex = 1;
   var nLstLen = ListLen(lstScopes);
 
   // assign the default return if passed in
   If (ArrayLen(Arguments) GTE 3)
     vRet = Arguments[3];
 
   // loop over the list
   while (nIndex LTE nLstLen) {
     if (IsDefined(ListGetAt(lstScopes, nIndex) & '.' & strVariable)) {
       vRet = Evaluate(ListGetAt(lstScopes, nIndex) & '.' & strVariable);
       break;
     }
     nIndex = nIndex + 1;
   }
 
   return vRet;
 }

oldId: 1048
---

