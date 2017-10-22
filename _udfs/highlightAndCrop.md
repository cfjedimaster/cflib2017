---
layout: udf
title:  highlightAndCrop
date:   2010-03-24T14:12:50.000Z
library: StrLib
argString: "string, term[, size][, wrap]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Crops a string and highlights keywords.
tagBased: true
description: |
 This UDF will search a string for keywords and return them highlighted. It also crops the string &quot;around&quot; the matched term. Useful on search results pages. This UDF requires ColdFusion 9 only because of the use of var after the beginning of the UDF. It could easily be modified to work in CFMX.

returnValue: Returns a string.

example: |
 <cfoutput>
 <pre>
 #highlightAndCrop(text,"poker",250,"<b></b>")#
 </pre>
 </cfoutput>

args:
 - name: string
   desc: String to scan/crop.
   req: true
 - name: term
   desc: Search term to find/highlight. Can be a list.
   req: true
 - name: size
   desc: Size of the cropped string. Defaults to total size of the string.
   req: false
 - name: wrap
   desc: The HTML to use to wrap the term.
   req: false


javaDoc: |
 <!---
  Crops a string and highlights keywords.
  v2 mods by Tuyen (tuyen.k.tran@gmail.com).
  
  @param string      String to scan/crop. (Required)
  @param term      Search term to find/highlight. Can be a list. (Required)
  @param size      Size of the cropped string. Defaults to total size of the string. (Optional)
  @param wrap      The HTML to use to wrap the term. (Optional)
  @return Returns a string. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, March 24, 2010 
 --->

code: |
 <cffunction name="highlightAndCrop" access="public" output="false" hint="Given an arbitrary string and a search term, find it, and return a 'cropped' set of text around the match.">
     <cfargument name="string" type="string" required="true" hint="Main blob of text">
     <cfargument name="term" type="string" required="true" hint="Keyword to look for.">
     <cfargument name="size" type="numeric" required="false" hint="Size of result string. Defaults to total size of string. Note this is a bit fuzzy - we split it in two and return that amount before and after the match. The size of term and wrap will therefore impact total string length.">
     <cfargument name="wrap" type="string" required="false" default="<b></b>" hint="HTML to wrap the match. MUST be one pair of HTML tags.">
 
     <cfset var excerpt = "">
     <cfset var pad = "">
     <cfset var match = "">
     <cfset var thisKeyword = "">
     <cfset var end = "">
     <cfset var endInitialTag = "">
     <cfset var beginTag = "">
     <cfset var endTag = "">
     
     <!--- clean the string --->
     <cfset arguments.string = trim(rereplace(arguments.string, "<.*?>", "", "all"))>
 
     <!--- pad is half our total --->
     <cfif not structKeyExists(arguments, "size")>
         <cfset arguments.size = len(arguments.string)>
     </cfif>
     <cfset pad = ceiling(arguments.size/2)>
 
     <cfloop list="#arguments.term#" index="thisKeyword">
         <cfif match is 0>
             <cfset match = findNoCase(thisKeyword, arguments.string)>
         <cfelseif findNoCase(thisKeyword, arguments.string) lt match>
             <cfset match = findNoCase(thisKeyword, arguments.string)>
         </cfif>
     </cfloop>
        
     <cfif match lte pad>
         <cfset match = 1>
     </cfif>
     <cfset end = match + len(arguments.term) + arguments.size>
 
     <!--- now create the main string around the match --->
     <cfif len(arguments.string) gt arguments.size>
         <cfif match gt 1>
             <cfset excerpt = "..." & mid(arguments.string, match-pad, end-match)>
         <cfelse>
             <cfset excerpt = left(arguments.string,end)>
         </cfif>
         <cfif len(arguments.string) gt end>
             <cfset excerpt = excerpt & "...">
         </cfif>
     <cfelse>
         <cfset excerpt = arguments.string>
     </cfif>
 
     <!--- split up my wrap - I bet this can be done better... --->
     <cfset endInitialTag = find(">",arguments.wrap)>
     <cfset beginTag = left(arguments.wrap, endInitialTag)>
     <cfset endTag = mid(arguments.wrap, endInitialTag+1, len(arguments.wrap))>
 
     <cfloop list="#arguments.term#" index="thisKeyword">
         <cfset excerpt = reReplaceNoCase(excerpt, "(#thisKeyword#)", "#beginTag#\1#endTag#","all")>
     </cfloop>
     <cfreturn excerpt>
 </cffunction>

---

