---
layout: udf
title:  getSkypeStatus
date:   2009-06-11T22:25:55.000Z
library: UtilityLib
argString: "userName[, numeric][, timeout]"
author: Giampaolo Bellavite
authorEmail: gp@omniwhere.com
version: 0
cfVersion: CF6
shortDescription: Call the skype website to know the status of a user
tagBased: true
description: |
 Get the status of a skype user calling the skype website through cfhttp. Privacy settings of the user should be set to allow the status visible on the web.

returnValue: Returns a string.

example: |
 <cfoutput>#getSkypeStatus('bellavite')#</cfoutput>

args:
 - name: userName
   desc: The Skype username to check.
   req: true
 - name: numeric
   desc: Boolean value that determines if the numeric or textual status is returned.
   req: false
 - name: timeout
   desc: Default timeout for the HTTP call. Defaults to 20 seconds.
   req: false


javaDoc: |
 <!---
  Call the skype website to know the status of a user
  
  @param userName      The Skype username to check. (Required)
  @param numeric      Boolean value that determines if the numeric or textual status is returned. (Optional)
  @param timeout      Default timeout for the HTTP call. Defaults to 20 seconds. (Optional)
  @return Returns a string. 
  @author Giampaolo Bellavite (gp@omniwhere.com) 
  @version 0, June 11, 2009 
 --->

code: |
 <cffunction name="getSkypeStatus" access="" returntype="any" output="false" 
               hint="Call the skype website to know the status of a user">
     <cfargument name="userName" type="string" required="true" hint="The Skype username to check">
     <cfargument name="numeric" type="boolean" required="false" default="false" hint="Return the numeric status (default is textual)">    
     <cfargument name="timeOut" type="numeric" required="false" default="20" hint="Timeout while asking the skype service">    
 
     <cfset var cfhttp = "">
     <cfhttp url="http://mystatus.skype.com/#userName#.#IIF(numeric,DE('num'),DE('txt'))#" timeout="#timeout#">
     <cfreturn cfhttp.fileContent>
 </cffunction>

oldId: 1925
---

