---
layout: udf
title:  LocalTime
date:   2002-09-24T17:08:09.000Z
library: DateLib
argString: ""
author: chad jackson
authorEmail: chad@textinc.com
version: 1
cfVersion: CF6
shortDescription: Function that returns adjusted local server time.
tagBased: true
description: |
 This is a function that behaves just like now() for those running sites where server and local time are different.  You just have to set your GMT offset and call the function with localtime() to have the local time displayed.

returnValue: Returns a date object.

example: |
 <cfoutput>#lsDateFormat(localtime(), 'full')# #lsTimeFormat(localtime(),'full')#</cfoutput>

args:


javaDoc: |
 <!---
  Function that returns adjusted local server time.
  
  @return Returns a date object. 
  @author chad jackson (chad@textinc.com) 
  @version 1, September 24, 2002 
 --->

code: |
 <cffunction name="LocalTime" returnType="date" output="false" hint="Returns Local Time">
     <cfset var timeZoneInfo = GetTimeZoneInfo()>
     <!--- local time GMT offset. --->
     <cfset var offset = 9>
     <cfset var GMTtime = DateAdd('s', timeZoneInfo.UTCtotalOffset, Now() )>
     <cfset var theLocalTime = DateAdd('h',offset,GMTtime)>
     <cfreturn theLocaltime>
 </cffunction>

oldId: 719
---

