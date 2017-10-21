---
layout: udf
title:  MsToSec
date:   2001-11-26T14:49:47.000Z
library: DateLib
argString: "tick"
author: Pete Ruckelshaus
authorEmail: pruckelshaus@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Converts milliseconds to seconds.
description: |
 Converts milliseconds (as in GetTickCount() or cfquery.executiontime) to seconds.  Simple but very useful.

returnValue: Returns a numeric value.

example: |
 <cfset preloadStart = getTickCount()>
   Do something here that takes time...
   <CFSET x=1>
   <CFLOOP INDEX="i" FROM="1" TO="1000">
     <CFSET x=x+1>
   </CFLOOP>
 <cfset preloadFinish = getTickCount()>
 <cfset preloadTime = preloadFinish - preloadStart>
 
 <cfoutput>#MsToSec(preLoadTime)#</cfoutput>

args:
 - name: tick
   desc: Number of milliseconds you want converted to seconds.
   req: true


javaDoc: |
 /**
  * Converts milliseconds to seconds.
  * 
  * @param tick      Number of milliseconds you want converted to seconds. 
  * @return Returns a numeric value. 
  * @author Pete Ruckelshaus (pruckelshaus@yahoo.com) 
  * @version 1, November 26, 2001 
  */

code: |
 function MsToSec(tick) 
 {
   return tick/1000;
 }

---

