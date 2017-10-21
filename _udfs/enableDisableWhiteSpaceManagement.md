---
layout: udf
title:  enableDisableWhiteSpaceManagement
date:   2004-02-14T10:36:54.000Z
library: UtilityLib
argString: "[action]"
author: Qasim Rasheed
authorEmail: qasim_1976@yahoo.com
version: 1
cfVersion: CF6
shortDescription: This function will enable or disable whitespace management in ColdFusion Server without access to ColdFusion Administrator.
description: |
 This function will enable or disable whitespace management in ColdFusion Server without access to ColdFusion Administrator. It returns the current status of the setting.

returnValue: Returns a boolean.

example: |
 <cfoutput>#enableDisableWhiteSpaceManagement("disable")#</cfoutput>

args:
 - name: action
   desc: Either disable or enable. Defaults to enable.
   req: false


javaDoc: |
 <!---
  This function will enable or disable whitespace management in ColdFusion Server without access to ColdFusion Administrator.
  
  @param action      Either disable or enable. Defaults to enable. (Optional)
  @return Returns a boolean. 
  @author Qasim Rasheed (qasim_1976@yahoo.com) 
  @version 1, February 14, 2004 
 --->

code: |
 <cffunction name="enableDisableWhiteSpaceManagement" output="false" returntype="boolean">
     <cfargument name="action" type="string" default="enable" />
     <cfscript>
         var factory = CreateObject("Java","coldfusion.server.ServiceFactory");
         var runtime = "";
         
     </cfscript>
     <cflock name="factory_runtimeservice" type="exclusive" timeout="5">
         <cfset runtime = factory.getRuntimeService()>
         <cfswitch expression="#arguments.action#">
             <cfcase value="enable">
                 <cfif not runtime.WhiteSpace>
                     <cfset runtime.setWhiteSpace("YES")>
                 </cfif>
             </cfcase>
             <cfcase value="disable">
                 <cfif runtime.WhiteSpace>
                     <cfset runtime.setWhiteSpace("NO")>
                 </cfif>
             </cfcase>
         </cfswitch>
     </cflock>
     <cfreturn runtime.WhiteSpace />
 </cffunction>

---

