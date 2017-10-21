---
layout: udf
title:  capFirstList
date:   2010-05-30T22:01:09.000Z
library: StrLib
argString: "str[, delimiter]"
author: Randy Johnson
authorEmail: randy@cfconcepts.com
version: 1
cfVersion: CF5
shortDescription: Capitalize the first letter of each item in a list.
description: |
 Capitalize the first letter of each item in a list.

returnValue: Returns a string.

example: |
 <cfoutput>#capFirstList("apple,orange,grape")#</cfoutput>

args:
 - name: str
   desc: List to parse.
   req: true
 - name: delimiter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 <!---
  Capitalize the first letter of each item in a list.
  
  @param str      List to parse. (Required)
  @param delimiter      List delimiter. Defaults to a comma. (Optional)
  @return Returns a string. 
  @author Randy Johnson (randy@cfconcepts.com) 
  @version 1, May 30, 2010 
 --->

code: |
 <cffunction name="capFirstList" returntype="string" output="false">
     <cfargument name="str" type="string" required="true" />
     <cfargument name="delimiter" default="," required="false">
 
     <cfset var newstr = "" />
     <cfset var word = "" />
     <cfset var separator = "" />
 
     <cfloop index="word" list="#arguments.str#" delimiters="#arguments.delimiter#">
         <cfset newstr = newstr & separator & UCase(left(word,1)) />
         <cfif len(word) gt 1>
             <cfset newstr = newstr & right(word,len(word)-1) />
         </cfif>
         <cfset separator = arguments.delimiter />
     </cfloop>
 
     <cfreturn newstr />
 </cffunction>

---

