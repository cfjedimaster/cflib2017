---
layout: udf
title:  toSeconds
date:   2008-04-25T16:37:24.000Z
library: DateLib
argString: "time"
author: Todd Sharp
authorEmail: todd@cfsilence.com
version: 1
cfVersion: CF5
shortDescription: Converts a duration of time to seconds.
tagBased: true
description: |
 This will take a duration of time and return the total number of seconds.  For example, 4 minutes and 27 seconds would return 267.

returnValue: Numeric

example: |
 <cfdump var="#toSeconds("00:04:27")# />

args:
 - name: time
   desc: durtion of time desired to convert to seconds
   req: true


javaDoc: |
 <!---
  Converts a duration of time to seconds.
  
  @param time      durtion of time desired to convert to seconds (Required)
  @return Numeric 
  @author Todd Sharp (todd@cfsilence.com) 
  @version 1, April 25, 2008 
 --->

code: |
 <cffunction name="toSeconds" access="public" output="false" returntype="numeric" hint="i take a time value and return the total number of seconds">
     <cfargument name="time" required="true" />
     <cfreturn (hour(arguments.time)*3600) + (minute(arguments.time)*60) + (second(arguments.time)) />
 </cffunction>

oldId: 1868
---

