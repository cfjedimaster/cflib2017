---
layout: udf
title:  nameCase
date:   2006-01-02T02:51:51.000Z
library: StrLib
argString: "string"
author: Jared Rypka-Hauer
authorEmail: jared@web-relevant.com
version: 2
cfVersion: CF6
shortDescription: Converts an entire string to namecase (JARED RYPKA-HAUER becomes Jared Rypka-Hauer).
description: |
 This uses a simple example of regex processing to convert ALL UPPER CASE STRINGS to Name Case Strings using CF's built-in case processing technology in the regex functions.

returnValue: Returns a string.

example: |
 <cfoutput>#nameCase("JARED RYPKA-HAUER")#</cfoutput>

args:
 - name: string
   desc: String to format.
   req: true


javaDoc: |
 <!---
  Converts an entire string to namecase (JARED RYPKA-HAUER becomes Jared Rypka-Hauer).
  
  @param string      String to format. (Required)
  @return Returns a string. 
  @author Jared Rypka-Hauer (jared@web-relevant.com) 
  @version 2, January 1, 2006 
 --->

code: |
 <cffunction name="nameCase" access="public" returntype="string" output="false">
     <cfargument name="name" type="string" required="true" />
     <cfset arguments.name = ucase(arguments.name)>
     <cfreturn reReplace(arguments.name,"([[:upper:]])([[:upper:]]*)","\1\L\2\E","all") />
 </cffunction>

---

