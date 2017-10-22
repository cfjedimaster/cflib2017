---
layout: udf
title:  fakesleep
date:   2008-04-11T12:12:43.000Z
library: UtilityLib
argString: "timeToSleep"
author: Nolan Erck
authorEmail: nolan.erck@gmail.com
version: 1
cfVersion: CF6
shortDescription: Causes the current page request to &quot;sleep&quot; for the given duration, before continuing.
tagBased: true
description: |
 This is a variation of the sleep() UDF already on cflib.org.  However, fake_sleep() is a bit more &quot;web hosting friendly&quot;.  If your web host has CreateObject( &quot;java&quot; ) turned off (as mine did), the existing sleep() method will not work.  This UDF is a &quot;side step&quot; around that issue.
 
 (I've noted it above as &quot;requires MX&quot;, however I think CF 5 support is possible as well with a minor edit or 2.)

returnValue: Returns nothing.

example: |
 <cfset fakesleep( 3000 ) />

args:
 - name: timeToSleep
   desc: Number of miliseconds to sleep.
   req: true


javaDoc: |
 <!---
  Causes the current page request to &quot;sleep&quot; for the given duration, before continuing.
  
  @param timeToSleep      Number of miliseconds to sleep. (Required)
  @return Returns nothing. 
  @author Nolan Erck (nolan.erck@gmail.com) 
  @version 1, April 11, 2008 
 --->

code: |
 <cffunction name="fakesleep" access="public" returntype="void" output="false">
     <cfargument name="timeToSleep" type="numeric" required="true" hint="the number of miliseconds you wish to sleep for." />
 
     <cfset var bContinue     = false />    
     <cfset var startTime     = getTickCount() />
     <cfset var endTime         = 0 />
     <cfset var elapsedTime  = 0 />
 
     <cfloop condition="NOT bContinue">
         <cfset endTime         = getTickCount() />
         <cfset elapsedTime  = endTime - startTime />
         
         <cfif elapsedTime gte arguments.timeToSleep>
             <cfset bContinue = true />
         </cfif>
     </cfloop>
     
 </cffunction>

---

