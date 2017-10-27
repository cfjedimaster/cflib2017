---
layout: udf
title:  totalTimeFromSec
date:   2009-05-09T23:42:02.000Z
library: DateLib
argString: "seconds"
author: Hamlet Javier
authorEmail: hamlet@igetspanish.com
version: 0
cfVersion: CF5
shortDescription: Get total time from seconds in hh&#58;mm&#58;ss format
tagBased: false
description: |
 Similar to getTimeFromSeconds, except it's not restricted to 24 hours or less. Function can be used to calculate total duration of time and format it to display as hh:mm:ss

returnValue: Returns a time object.

example: |
 <cfset seconds = 100000>
 <cfoutput>#totalTimeFromSec(seconds)#</cfoutput>

args:
 - name: seconds
   desc: Number of seconds
   req: true


javaDoc: |
 /**
  * Get total time from seconds in hh:mm:ss format
  * 
  * @param seconds      Number of seconds (Required)
  * @return Returns a time object. 
  * @author Hamlet Javier (hamlet@igetspanish.com) 
  * @version 0, May 9, 2009 
  */

code: |
 function totalTimeFromSec(seconds)
 {
     Var xHr = (seconds\3600); // find hour 
     Var xMin = (seconds\60) - (xHr*60); // Find minutes
     Var xSec = seconds - (xHr * 3600) - (xMin*60); // find seconds
     var xTime = "#NumberFormat(xHr,'00')#:#NumberFormat(xMin,'00')#:#NumberFormat(xSec,'00')#"; //return in time format
     return xTime;
 }

oldId: 1960
---

