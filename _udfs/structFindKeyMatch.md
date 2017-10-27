---
layout: udf
title:  structFindKeyMatch
date:   2011-08-26T02:22:44.000Z
library: DataManipulationLib
argString: "scope, keyword"
author: Jeff Gladnick
authorEmail: jeff@greatdentalwebsites.com
version: 1
cfVersion: CF6
shortDescription: Like structFindKey except it matches a pattern.
tagBased: true
description: |
 Structfindkey is great if you know the &quot;key&quot; name you're looking for, but what if you only have a part of the key name.  This function solves your problem.

returnValue: Returns an array.

example: |
 <cfset jeff=structnew() />
 <cfset jeff.addonPartnerId_20_1 = "addon1" />
 <cfset jeff.addonPartnerId_20_2 = 2  />
 <cfset jeff.addonPartnerId_18_2 = 3  />
 <cfset jeff.addonPartnerId_20_3 = 4   />
 <cfset jeff.blah = 5 />
 <cfdump var="#jeff#">
 <cfdump var="#structFindKeyMatch(jeff,'addonPartnerId')#">

args:
 - name: scope
   desc: Structure to search.
   req: true
 - name: keyword
   desc: Keyword to search for.
   req: true


javaDoc: |
 <!---
  Like structFindKey except it matches a pattern.
  
  @param scope      Structure to search. (Required)
  @param keyword      Keyword to search for. (Required)
  @return Returns an array. 
  @author Jeff Gladnick (jeff@greatdentalwebsites.com) 
  @version 1, August 25, 2011 
 --->

code: |
 <cffunction name="structFindKeyMatch" returntype="array" output="false">
     <cfargument name="scope" type="struct" required="true">
     <cfargument name="keyword" type="string" required="true">
     
     <cfset var key = "">
     <cfset var i = "">
     <cfset var result = arrayNew(1)>    
     <cfset var tempstruct = structNew() />
     
     <cfloop index="i" list="#StructKeyList(arguments.scope)#" delimiters=",">  
         <cfif findNoCase(arguments.keyword,i)>
             <cfset tempstruct[i] = arguments.scope[i]>
             <cfset arrayAppend(result, duplicate(tempstruct)) />    
         </cfif>
     
         <cfset structClear(tempstruct) />
     </cfloop>
     
     <cfreturn result>
         
 </cffunction>

oldId: 2166
---

