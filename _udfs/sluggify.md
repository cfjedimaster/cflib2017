---
layout: udf
title:  sluggify
date:   2009-06-11T22:48:49.000Z
library: StrLib
argString: "str[, spacer]"
author: Michael Haggerty
authorEmail: mike@mikehaggerty.net
version: 1
cfVersion: CF6
shortDescription: Converts a string into a pretty URL safe slug
tagBased: true
description: |
 This function will take any string and replace all of the non-alphanumeric characters with the spacer of your choice (default is '-').

returnValue: Returns a string.

example: |
 <cfset toBeSlugged = "This is a (very) nonalphanumeric, string" />
 <cfset slug = sluggify(toBeSlugged) />
 <cfoutput>#slug#</cfoutput>

args:
 - name: str
   desc: String to modify.
   req: true
 - name: spacer
   desc: Character used for spaces. Defaults to -.
   req: false


javaDoc: |
 <!---
  Converts a string into a pretty URL safe slug
  
  @param str      String to modify. (Required)
  @param spacer      Character used for spaces. Defaults to -. (Optional)
  @return Returns a string. 
  @author Michael Haggerty (mike@mikehaggerty.net) 
  @version 1, June 11, 2009 
 --->

code: |
 <cffunction name="sluggify" output="false" returnType="string">
     <cfargument name="str">
     <cfargument name="spacer" default="-">
     
     <cfset var ret = "" />
     
     <cfset str = lCase(trim(str)) />
     <cfset str = reReplace(str, "[^a-z0-9-]", "#spacer#", "all") />
     <cfset ret = reReplace(str, "#spacer#+", "#spacer#", "all") />
     
     <cfif left(ret, 1) eq "#spacer#">
         <cfset ret = right(ret, len(ret)-1) />
     </cfif>
     <cfif right(ret, 1) eq "#spacer#">
         <cfset ret = left(ret, len(ret)-1) />
     </cfif>
     
     <cfreturn ret />
 </cffunction>

---

