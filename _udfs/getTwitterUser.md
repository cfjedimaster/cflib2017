---
layout: udf
title:  getTwitterUser
date:   2011-06-08T03:55:05.000Z
library: UtilityLib
argString: "screenname"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF9
shortDescription: Does a simple Twitter lookup for a user.
tagBased: true
description: |
 Does a Twitter lookup for a user and returns all public information.

returnValue: Returns a struct.

example: |
 <cfdump var="#getTwitterUser('cfjedimaster')#">
 <cfdump var="#getTwitterUser('cfjedimaster221920')#">

args:
 - name: screenname
   desc: Screen name to look up.
   req: true


javaDoc: |
 <!---
  Does a simple Twitter lookup for a user.
  Added a success flag - thx Ben Nadel.
  
  @param screenname      Screen name to look up. (Required)
  @return Returns a struct. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, June 7, 2011 
 --->

code: |
 <cffunction name="getTwitterUser" output="false" returnType="struct">
     <cfargument name="screenname" type="string" required="true">
     <cfset var httpResult = "">
     
     <!--- remove the @ if they included it. --->
     <cfif left(arguments.screenname,1) is "@">
         <cfset arguments.screenname = right(arguments.screenname, len(arguments.screenname)-1)>
     </cfif>
     
     <cfset var theUrl = "http://api.twitter.com/1/users/show.json?screen_name=#arguments.screenname#">
     
     <cfhttp url="#theUrl#" result="httpResult">
     <cfset var result = deserializeJSON(httpResult.filecontent)>
     
     <cfif structKeyExists(result, "error")>
         <cfset result.success = false>
     <cfelse>
         <cfset result.success = true>
     </cfif>
 
     <cfreturn result>    
 </cffunction>

oldId: 2145
---

