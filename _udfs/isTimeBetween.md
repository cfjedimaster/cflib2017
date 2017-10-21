---
layout: udf
title:  isTimeBetween
date:   2006-08-10T21:59:00.000Z
library: DateLib
argString: "minTime, maxTime[, time]"
author: Anthony Galano
authorEmail: anthony@webpex.com
version: 1
cfVersion: CF6
shortDescription: Returns true/false if a time is between the supplied start/end times.
description: |
 Useful for checking if a time is between a time range. For instance, if the current time is between 12 and 1 pm then execute or display some code.

returnValue: Returns a boolean.

example: |
 <!--- create a time at 12:00 pm --->
 <cfset minTime = CreateTime(12,00,00)>
 <!--- create a time at 1:00 pm --->
 <cfset maxTime = CreateTime(13,00,00)>
 <!--- check if the current time is between 12 and 1 pm --->
 <cfif IsCurrentTimeBetween(minTime,maxTime)>
 It is between 12 and 1 pm
 <cfelse>
 It is NOT between 12 and 1 pm
 </cfif>

args:
 - name: minTime
   desc: The lower range of time.
   req: true
 - name: maxTime
   desc: The upper range of time.
   req: true
 - name: time
   desc: The time to check. Defaults to now().
   req: false


javaDoc: |
 <!---
  Returns true/false if a time is between the supplied start/end times.
  v2 by Raymond Camden
  
  @param minTime      The lower range of time. (Required)
  @param maxTime      The upper range of time. (Required)
  @param time      The time to check. Defaults to now(). (Optional)
  @return Returns a boolean. 
  @author Anthony Galano (anthony@webpex.com) 
  @version 1, August 10, 2006 
 --->

code: |
 <cffunction name="isTimeBetween" access="public" returntype="boolean" output="false">
     <cfargument name="minTime" type="date" required="true">
     <cfargument name="maxTime" type="date" required="true">
     <cfargument name="time" type="date" required="false" default="#now()#">
     
     <cfset var curTime = createTime(timeFormat(arguments.time,"H"),timeFormat(arguments.time,"mm"),timeFormat(arguments.time,"ss"))>
     <cfif dateDiff("n",minTime,curTime) gt 0 and
           dateDiff("n",maxTime,curTime) lt 0>
         <cfreturn true>
     <cfelse>
         <cfreturn false>
     </cfif> 
        
 </cffunction>

---

