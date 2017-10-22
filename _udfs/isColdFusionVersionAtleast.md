---
layout: udf
title:  isColdFusionVersionAtleast
date:   2011-04-15T04:22:54.000Z
library: CFMLLib
argString: "MinimumVersionNumber"
author: Jon Hartmann
authorEmail: jon.hartmann@gmail.com
version: 1
cfVersion: CF9
shortDescription: Checks the server's ColdFusion product version
tagBased: true
description: |
 Accepts a comma delimited version number and checks it against the current Server.ColdFusion.ProductVersion value. It returns true if the current product version is at least the given value, and false if not.

returnValue: Returns a boolean.

example: |
 <cfif NOT IsColdFusionVersionAtleast("9,0,1")>
     This application requires atleast ColdFusion version 9.0.1. Please update your server.
     <cfabort />
 </cfif>

args:
 - name: MinimumVersionNumber
   desc: Minimum ColdFusion version
   req: true


javaDoc: |
 <!---
  Checks the server's ColdFusion product version
  
  @param MinimumVersionNumber      Minimum ColdFusion version (Required)
  @return Returns a boolean. 
  @author Jon Hartmann (jon.hartmann@gmail.com) 
  @version 1, April 14, 2011 
 --->

code: |
 <cffunction name="isColdFusionVersionAtleast" access="private" output="false" returntype="boolean">
     <cfargument name="MinimumVersionNumber" type="string" required="true" />
 
     <cfset Local.VersionData = ListToArray(Server.ColdFusion.ProductVersion) />
     <cfset Local.TestVersionData = ListToArray(Arguments.MinimumVersionNumber) />
     <cfset Local.Result = true />
     <cfset local.x = "">
     
     <cfloop from="1" to="#Min(ArrayLen(Local.TestVersionData), ArrayLen(Local.VersionData))#" index="x">
         <cfif Local.VersionData[x] lt Local.TestVersionData[x]>
             <cfset Local.Result = false />
             <cfbreak />
         <cfelseif Local.VersionData[x] gt Local.TestVersionData[x]>
             <cfbreak />
         </cfif>
     </cfloop>
 
     <cfreturn Local.Result />
 </cffunction>

---

