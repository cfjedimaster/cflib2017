---
layout: udf
title:  cfMailFactory
date:   2007-01-07T19:42:52.000Z
library: UtilityLib
argString: "mailaction"
author: Jose Diaz
authorEmail: bleachedbug@gmail.com
version: 1
cfVersion: CF6
shortDescription: Reset MailSpool and access general mail settings.
description: |
 Reset MailSpool and access general mail settings.
 Currently accepts the following actions:
 
 - isSpoolEnable
 - resetSpool
 - getServer
 
 This can be expanded to utilize any of the serviceFactory settings not just the MailSpoolService.

returnValue: Returns a string or boolean.

example: |
 <cfinclude template="cfMailFactoryUDF.cfm">
 
 <cfset mailAction = cfMailFactory("resetSpool")>
 
 <cfoutput>#mailAction#</cfoutput>

args:
 - name: mailaction
   desc: One of&#58; isspoolenable,getserver,resetspool
   req: true


javaDoc: |
 <!---
  Reset MailSpool and access general mail settings.
  
  @param mailaction      One of: isspoolenable,getserver,resetspool (Required)
  @return Returns a string or boolean. 
  @author Jose Diaz (bleachedbug@gmail.com) 
  @version 1, April 9, 2007 
 --->

code: |
 <cffunction name="cfMailFactory" access="public" returntype="string" output=false>
     <cfargument name="mailaction" type="string" required="true"/>
     <cfset var mailItem = "">
     <cfset var factory = "">
     <cfset var mm_service = "">
     <cfset var mm_settings = "">
             
     <!--- Access CF Service Factory --->
     <cfobject action="create" type="java" class="coldfusion.server.ServiceFactory" name="factory"/>
 
     <!--- Begin Action Checks --->
     <cfswitch expression="#trim(arguments.mailaction)#">
 
         <cfcase value="isSpoolEnable">
             <cfset mailItem = factory.mailSpoolService.isSpoolEnable()>
         </cfcase>
 
         <cfcase value="resetSpool">
         
             <cflock name="serviceFactory" type="exclusive" timeout="10">
             <cfscript>
             ms_service = factory.mailspoolservice;
             ms_settings = ms_service.settings;
             </cfscript>
             </cflock>
             
             <cfset mailItem = "Reset Successfull">
         </cfcase>
 
          <cfcase value="getServer">
           <cfset mailItem = factory.mailSpoolService.getServer()>
         </cfcase>
 
         <cfdefaultcase>
             <cfthrow message="Invalid mail action passed. Must be resetSpool, getServer, or isSpoolEnable.">
         </cfdefaultcase>
 
      </cfswitch>
 
     <cfreturn mailItem />
 
 </cffunction>

---

