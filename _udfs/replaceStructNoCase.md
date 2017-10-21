---
layout: udf
title:  replaceStructNoCase
date:   2011-05-30T15:13:29.000Z
library: StrLib
argString: "argString, argStruct[, argStartSymbol][, argEndSymbol]"
author: Rodion Bykov
authorEmail: rodionbykov@rodionbykov.com
version: 1
cfVersion: CF6
shortDescription: Returns string, with occurence of structure key names replaced by structure values.
description: |
 Useful whe you need to replace many sub-strings in a string at once, and have structure which key names are exactly same as sub-strings to be replaced.

returnValue: Returns a string.

example: |
 <cfset stringToReplace = "Dear {CLIENT}, we are happy to deliver your Order ##{ORDER}" />
 
 <cfset structToReplace = structNew() />
 <cfset structToReplace.client = "John Smith" />
 <cfset structToReplace.order = "15" />
 
 <cfset result = replaceStructNoCase(stringToReplace, structToReplace) />

args:
 - name: argString
   desc: String to parse.
   req: true
 - name: argStruct
   desc: Structure to use for values.
   req: true
 - name: argStartSymbol
   desc: Symbol used to denote beginning of token. Defaults to {
   req: false
 - name: argEndSymbol
   desc: Symbol used to denote end of token. Defaults to }.
   req: false


javaDoc: |
 <!---
  Returns string, with occurence of structure key names replaced by structure values.
  
  @param argString      String to parse. (Required)
  @param argStruct      Structure to use for values. (Required)
  @param argStartSymbol      Symbol used to denote beginning of token. Defaults to { (Optional)
  @param argEndSymbol      Symbol used to denote end of token. Defaults to }. (Optional)
  @return Returns a string. 
  @author Rodion Bykov (rodionbykov@rodionbykov.com) 
  @version 1, May 30, 2011 
 --->

code: |
 <cffunction name="replaceStructNoCase" returntype="string">
     <cfargument name="argString" type="string" required="true" />
     <cfargument name="argStruct" type="struct" required="true" />
     <cfargument name="argStartSymbol" type="string" required="false" default="{" />
     <cfargument name="argEndSymbol" type="string" required="false" default="}" />
     
     <cfset var result = "" />
     <cfset var i = "" />
     
     <cfset result = arguments.argString />
     
     <cfloop collection="#arguments.argStruct#" item="i">
         <cfset result = replaceNoCase( result, arguments.argStartSymbol & i & arguments.argEndSymbol, StructFind(arguments.argStruct, i), "all" ) />
     </cfloop>
     
     <cfreturn result />
 </cffunction>

---

