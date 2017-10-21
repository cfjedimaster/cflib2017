---
layout: udf
title:  convertSecondsToTimeString
date:   2015-04-15T15:10:06.961Z
library: DateLib
argString: "timeInSeconds"
author: Simon Bingham
authorEmail: me@simonbingham.me.uk
version: 2
cfVersion: CF9
shortDescription: Takes a time in seconds argument and converts to a time string in &quot;4d 12h 30m&quot; format.
description: |
 Takes a time in seconds argument and converts to a time string in &quot;4d 12h 30m&quot; format. 

returnValue: Returns a string formatting the passed-in seconds value in days, hours and minutes

example: |
 <cfoutput>
     <h2>Test Seconds</h2>
 
     <cfloop index="variables.seconds" from="0" to="60" step="15">
         #convertSecondsToTimeString(variables.seconds)#<br>
     </cfloop>
 
     <h2>Test Minutes</h2>
 
     <cfloop index="variables.seconds" from="0" to="3600" step="60">
         #convertSecondsToTimeString(variables.seconds)#<br>
     </cfloop>
 
     <h2>Test Hours</h2>
 
     <cfloop index="variables.seconds" from="0" to="86399" step="3600">
         #convertSecondsToTimeString(variables.seconds)#<br>
     </cfloop>
 
     <h2>Test All</h2>
 
     <cfloop index="variables.seconds" from="39600" to="40200" step="1">
         #convertSecondsToTimeString(variables.seconds)#<br>
     </cfloop>
 </cfoutput>

args:
 - name: timeInSeconds
   desc: Time in seconds
   req: true


javaDoc: |
 /**
  * Takes a time in seconds argument and converts to a time string in &quot;4d 12h 30m&quot; format.
  * v0.9 by Simon Bingham
  * v1.0 by Adam Cameron. Tweaking small bug if a float is passed-in rather than an integer.
  * 
  * @param timeInSeconds      Time in seconds (Required)
  * @return Returns a string formatting the passed-in seconds value in days, hours and minutes 
  * @author Simon Bingham (me@simonbingham.me.uk) 
  * @version 2.0, April 15, 2015 
  */

code: |
 function convertSecondsToTimeString(seconds) {
     local.hours = arguments.seconds \ 3600;
     local.minutes = (arguments.seconds \ 60) mod 60;
     local.seconds = (arguments.seconds) mod 60;
     return numberformat(local.hours, "0") & ":" & numberformat(local.minutes, "00") & ":" & numberformat(local.seconds, "00");
 }
 

---

