---
layout: udf
title:  getAuthUsername
date:   2006-10-09T21:37:25.000Z
library: SecurityLib
argString: ""
author: Mike Tangorre
authorEmail: mtangorre@gmail.com
version: 1
cfVersion: CF5
shortDescription: Get the authenticated username from the cgi.auth_user or cgi.remote_user without the domain information.
description: |
 Users have various ways of specifying their username when logging onto a network. The formats can be: username@some.domain, domain\username, or even just username. This function returns the username portion of the cgi.auth_user or cgi.remote_user variables. If neither cgi variable contains a value, an empty string is returned.

returnValue: Returns a string.

example: |
 <cfoutput>
 #getAuthUsername()#
 </cfoutput>

args:


javaDoc: |
 <!---
  Get the authenticated username from the cgi.auth_user or cgi.remote_user without the domain information.
  
  @return Returns a string. 
  @author Mike Tangorre (mtangorre@gmail.com) 
  @version 1, April 9, 2007 
 --->

code: |
 <cffunction name="getAuthUsername" returntype="string" output="false">
     
     <cfset var username = "" />
     
     <cfif len(trim(cgi.auth_user))>
     
         <cfset username = trim(cgi.auth_user) />
     
     <cfelseif len(trim(cgi.remote_user))>
     
         <cfset username = trim(cgi.remote_user) />
     
     <cfelse>
     
         <!--- no string to work with --->
         <cfreturn trim(username) />
     
     </cfif>
     
     <!--- check username@some.domain --->
     <cfif find("@",username)>
     
         <cfreturn listFirst(username,"@") />
     
     <!--- check domain\username --->
     <cfelseif find("\",username)>
     
         <cfreturn listLast(username,"\") />
     
     <!--- no domain --->
     <cfelse>
     
         <cfreturn trim(username) />
     
     </cfif>
     
 </cffunction>

---

