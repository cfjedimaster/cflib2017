---
layout: udf
title:  reFindNoCaseAll
date:   2003-11-06T12:13:42.000Z
library: StrLib
argString: "regex, text"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Returns all the matches (case insensitive) of a regular expression within a string. This is simular to reGet(), but more closely matches the result set of reFind.
description: |
 Returns all the matches (case insensitive) of a regular expression within a string. This is simular to reGet(), but more closely matches the result set of reFindNoCase.

returnValue: Returns an array.

example: |
 <cfset str = "This is all of cats in the Catalog.">
 <cfset caps = reFindNoCaseAll("cat[^ ]",str)>
 <cfdump var="#caps#" label="result">

args:
 - name: regex
   desc: Regular expression.
   req: true
 - name: text
   desc: String to search.
   req: true


javaDoc: |
 <!---
  Returns all the matches (case insensitive) of a regular expression within a string. This is simular to reGet(), but more closely matches the result set of reFind.
  
  @param regex      Regular expression. (Required)
  @param text      String to search. (Required)
  @return Returns an array. 
  @author Ben Forta (ben@forta.com) 
  @version 1, November 17, 2003 
 --->

code: |
 <cffunction name="reFindNoCaseAll" output="true" returnType="struct">
    <cfargument name="regex" type="string" required="yes">
    <cfargument name="text" type="string" required="yes">
 
    <!--- Define local variables --->    
    <cfset var results=structNew()>
    <cfset var pos=1>
    <cfset var subex="">
    <cfset var done=false>
     
    <!--- Initialize results structure --->
    <cfset results.len=arraynew(1)>
    <cfset results.pos=arraynew(1)>
 
    <!--- Loop through text --->
    <cfloop condition="not done">
 
       <!--- Perform search --->
       <cfset subex=reFindNoCase(arguments.regex, arguments.text, pos, true)>
       <!--- Anything matched? --->
       <cfif subex.len[1] is 0>
          <!--- Nothing found, outta here --->
          <cfset done=true>
       <cfelse>
          <!--- Got one, add to arrays --->
          <cfset arrayappend(results.len, subex.len[1])>
          <cfset arrayappend(results.pos, subex.pos[1])>
          <!--- Reposition start point --->
          <cfset pos=subex.pos[1]+subex.len[1]>
       </cfif>
    </cfloop>
 
    <!--- If no matches, add 0 to both arrays --->
    <cfif arraylen(results.len) is 0>
       <cfset arrayappend(results.len, 0)>
       <cfset arrayappend(results.pos, 0)>
    </cfif>
 
    <!--- and return results --->
    <cfreturn results>
 </cffunction>

---

