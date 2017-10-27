---
layout: udf
title:  enableDisableDebugging
date:   2004-09-21T20:14:24.000Z
library: UtilityLib
argString: "what"
author: Qasim Rasheed
authorEmail: qasim_1976@yahoo.com
version: 1
cfVersion: CF6
shortDescription: This UDF will enable or disable debugging service with Admin access
tagBased: true
description: |
 This UDF will enable or disable debugging service based on the argument provided. I is useful in situation where you do not have access to ColdFusion  Administrator or want to manipulate debugging settings programatically.

returnValue: Returns nothing.

example: |
 <cfoutput>
 #enableDisableDebugging('disable')#
 #enableDisableDebugging('enable')#
 </cfoutput>

args:
 - name: what
   desc: Either enable or disable. 
   req: true


javaDoc: |
 <!---
  This UDF will enable or disable debugging service with Admin access
  
  @param what      Either enable or disable.  (Required)
  @return Returns nothing. 
  @author Qasim Rasheed (qasim_1976@yahoo.com) 
  @version 1, April 14, 2005 
 --->

code: |
 <cffunction name="enableDisableDebugging" output="false" returntype="void" hint="I enable/disable debugging settings">
     <cfargument name="what" type="string" required="true" />    
     <cfset var db_service = createobject("java","coldfusion.server.ServiceFactory").getDebuggingService()>
     
     <cfif arguments.what eq "enable">
         <cfif not db_service.isEnabled()>
             <cfset db_service.setEnabled(true)>
         </cfif>
     <cfelseif arguments.what eq "disable">
         <cfif db_service.isEnabled()>
             <cfset db_service.setEnabled(false)>
         </cfif>
     </cfif>
 </cffunction>

oldId: 1142
---

