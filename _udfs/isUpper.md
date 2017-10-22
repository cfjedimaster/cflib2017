---
layout: udf
title:  isUpper
date:   2006-05-17T12:27:55.000Z
library: StrLib
argString: "str"
author: Trevor Orr
authorEmail: fractorr@yahoo.com
version: 2
cfVersion: CF5
shortDescription: Checks to see if a string is all upper case characters
tagBased: true
description: |
 Returns true if a string is all upper case characters or false if not all upper case characters.

returnValue: Returns a boolean.

example: |
 <cfset str = "RAYMOND">
 <cfif IsUpper(str)>
     <cfoutput>#str#</cfoutput>
 </cfif>

args:
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 <!---
  Checks to see if a string is all upper case characters
  v2 by Raymond Camden
  
  @param str      String to check. (Required)
  @return Returns a boolean. 
  @author Trevor Orr (fractorr@yahoo.com) 
  @version 2, April 9, 2007 
 --->

code: |
 <cffunction name="isUpper" output="false" returntype="boolean">
     <cfargument name="str" type="string" required="true" />
     <cfreturn compare(arguments.str,uCase(arguments.str)) is 0>
 </cffunction>

---

