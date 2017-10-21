---
layout: udf
title:  addRemoveDebuggingIPAddress
date:   2004-02-17T12:24:54.000Z
library: UtilityLib
argString: "ipAddress[, action]"
author: Qasim Rasheed
authorEmail: qasim_1976@yahoo.com
version: 1
cfVersion: CF6
shortDescription: This function will either add or remove an IP address to the list of debugging ip addresses if you do not have an administrator access.
description: |
 This function will either add or remove an IP address to the list of debugging ip addresses if you do not have an administrator access. It accepts two parameters, IPaddress to be added or removed and the action i.e either add or remove.

returnValue: Returns a list of IP addresses.

example: |
 <cfoutput>#addRemoveDebuggingIPAddress("127.0.0.2","remove")#</cfoutput>

args:
 - name: ipAddress
   desc: IP Address
   req: true
 - name: action
   desc: Add or Remove. Defaults to Add.
   req: false


javaDoc: |
 <!---
  This function will either add or remove an IP address to the list of debugging ip addresses if you do not have an administrator access.
  
  @param ipAddress      IP Address (Required)
  @param action      Add or Remove. Defaults to Add. (Optional)
  @return Returns a list of IP addresses. 
  @author Qasim Rasheed (qasim_1976@yahoo.com) 
  @version 1, February 17, 2004 
 --->

code: |
 <cffunction name="addRemoveDebuggingIPAddress" output="false" returnType="string">
     <cfargument name="IPaddress" type="string" required="Yes" />
     <cfargument name="action" type="string" default="Add" />
     <cfscript>
         var factory = CreateObject("Java","coldfusion.server.ServiceFactory");
         var debuggingService  ="";
     </cfscript>
     <cflock name="factory_debuggingservice" type="exclusive" timeout="5">
         <cfset debuggingService = factory.getDebuggingService()>
         <cfswitch expression="#arguments.action#">
             <cfcase value="Add">
                 <cfif not listcontainsnocase(debuggingService.iplist.ipList,arguments.IPaddress)>
                     <cfset debuggingService.iplist.ipList = ListAppend(debuggingService.iplist.ipList,arguments.IPaddress)>
                 </cfif>
             </cfcase>
             <cfcase value="Remove">
                 <cfif listcontainsnocase(debuggingService.iplist.ipList,arguments.IPaddress)>
                     <cfset debuggingService.iplist.ipList = ListDeleteAt(debuggingService.iplist.ipList,ListFindNoCase(debuggingService.iplist.ipList,arguments.IPaddress))>
                 </cfif>
             </cfcase>
         </cfswitch>
         <cfreturn debuggingService.iplist.ipList />
     </cflock>
 </cffunction>

---

