---
layout: udf
title:  isLower
date:   2006-05-17T12:29:35.000Z
library: StrLib
argString: "str"
author: Trevor Orr
authorEmail: fractorr@yahoo.com
version: 2
cfVersion: CF5
shortDescription: Checks to see if a string is all lower case characters
description: |
 Returns true if a string is all lower case characters or false if not all lower case characters.

returnValue: Returns a boolean.

example: |
 <cfset str = "ray">
 <cfif IsLower(str)>
     <cfoutput>#str#</cfoutput>
 </cfif>

args:
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 <!---
  Checks to see if a string is all lower case characters
  b2 by Raymond Camden
  
  @param str      String to check. (Required)
  @return Returns a boolean. 
  @author Trevor Orr (fractorr@yahoo.com) 
  @version 2, April 9, 2007 
 --->

code: |
 <cffunction name="isLower" output="false" returntype="boolean">
     <cfargument name="str" type="string" required="true" />
     <cfreturn compare(arguments.str,lCase(arguments.str)) is 0>
 </cffunction>

---

