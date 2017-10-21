---
layout: udf
title:  getNISTTime
date:   2005-12-07T21:14:34.000Z
library: UtilityLib
argString: "[timeServer]"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Obtains current time data from NIST Internet Time Service servers.
description: |
 Obtains current time data from NIST Internet Time Service servers.

returnValue: Returns a structure.

example: |
 <cfdump var="#getNISTTime()#">

args:
 - name: timeServer
   desc: Time server. Defaults to 192.43.244.18.
   req: false


javaDoc: |
 <!---
  Obtains current time data from NIST Internet Time Service servers.
  
  @param timeServer      Time server. Defaults to 192.43.244.18. (Optional)
  @return Returns a structure. 
  @author Ben Forta (ben@forta.com) 
  @version 1, December 7, 2005 
 --->

code: |
 <cffunction name="GetNISTTime" returntype="struct" output="false">
     <cfargument name="timeServer" type="string" default="192.43.244.18" required="false">
     <cfset var result=StructNew()>
 
     <!--- Try/catch block --->
     <cftry>
 
       <!--- Try get time data --->
       <cfhttp url="http://#arguments.timeServer#:13/" />
       <!--- Save raw data --->
       <cfset result.raw = CFHTTP.FileContent>
       <!--- Extract Julian date --->
       <cfset result.julian=ListGetAt(result.raw, 1, " ")>
       <!--- Extract current date and time --->
       <cfset result.now=ParseDateTime(ListGetAt(result.raw, 2, " ")
                               & " "
                               & ListGetAt(result.raw, 3, " "))>
       <!--- Extract daylight savings time flag --->
       <cfset result.dst=IIf(ListGetAt(result.raw, 4, " ") IS 0,
                         FALSE, TRUE)>
       <!--- Extract leap month flag --->
       <cfset result.leapmonth=IIf(ListGetAt(result.raw, 5, " ") IS 0,
                            FALSE, TRUE)>
       <!--- Extract health flag --->
       <cfset result.healthy=IIf(ListGetAt(result.raw, 6, " ") IS 0,
                            FALSE, TRUE)>
       <!--- Extract advance milliseconds --->
       <cfset result.msadv=ListGetAt(result.raw, 7, " ")>
       <!--- Success --->
       <cfset result.success=TRUE>
 
       <!--- Catch any errors --->
       <cfcatch type="any">
          <cfset result.success=FALSE>
       </cfcatch>
 
     </cftry>
 
     <cfreturn result>
 
 </cffunction>

---

