---
layout: udf
title:  urlExists
date:   2006-01-03T18:01:42.000Z
library: NetLib
argString: "u"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Checks to see if a particular URL actually exists.
tagBased: true
description: |
 Checks to see if a particular URL actually exists.

returnValue: Returns a boolean.

example: |
 <cfset list = "http://www.cflib.org,http://www.dfkdhsfjksdfh.com,http://www.cflib.org/fooman.jsp">
 <cfloop index="u" list="#list#">
     <cfoutput>Does #u# exist? #urlExists(u)#<br /></cfoutput>
 </cfloop>

args:
 - name: u
   desc: The URL to check.
   req: true


javaDoc: |
 <!---
  Checks to see if a particular URL actually exists.
  Gus made some changes to handle a unresolving domain.
  
  @param u      The URL to check. (Required)
  @return Returns a boolean. 
  @author Ben Forta (ben@forta.com) 
  @version 1, January 3, 2006 
 --->

code: |
 <cffunction name="urlExists" output="no" returntype="boolean">
     <!--- Accepts a URL --->
     <cfargument name="u" type="string" required="yes">
 
     <!--- Initialize result --->
     <cfset var result=true>
 
     <!--- Attempt to retrieve the URL --->
     <cfhttp url="#arguments.u#" resolveurl="no" throwonerror="no" />
 
     <!--- Check That a Status Code is Returned --->
     <cfif isDefined("cfhttp.responseheader.status_code")>
         <cfif cfhttp.responseheader.status_code EQ "404">
             <!--- If 404, return FALSE --->
             <cfset result=false>
         </cfif>
     <cfelse>
         <!--- No Status Code Returned --->
         <cfset result=false>
     </cfif>
     <cfreturn result>
 </cffunction>

---

