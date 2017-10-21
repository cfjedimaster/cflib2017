---
layout: udf
title:  humanize
date:   2007-05-17T12:20:33.000Z
library: StrLib
argString: "text"
author: Christopher Warren
authorEmail: cwarren@imagetrend.com
version: 1
cfVersion: CF5
shortDescription: Takes a string and humanizes it, removing underscores and capitalizing each word.
description: |
 A step beyond Jared Rypka-Hauer's nameCase UDF (http://www.cflib.org/udf.cfm?ID=1384), I took this idea from Rails, and I'm sure they didn't do it first. It is especially useful in reading through database names and columns and formatting them for users. Nothing original, but pretty useful.

returnValue: Returns a string.

example: |
 <cfoutput>#humanize("first_name")#</cfoutput>

args:
 - name: text
   desc: String to parse.
   req: true


javaDoc: |
 <!---
  Takes a string and humanizes it, removing underscores and capitalizing each word.
  
  @param text      String to parse. (Required)
  @return Returns a string. 
  @author Christopher Warren (cwarren@imagetrend.com) 
  @version 1, July 23, 2007 
 --->

code: |
 <cffunction name="humanize" access="public" returntype="string" output="false">
     <cfargument name="text" type="string" required="true" />
     <cfset arguments.text= ucase(arguments.text)>
     <cfset arguments.text= replace(arguments.text,"_"," ","all")>
     <cfreturn reReplace(arguments.text,"([[:upper:]])([[:upper:]]*)","\1\L\2\E","all") />
 </cffunction>

---

