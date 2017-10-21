---
layout: udf
title:  getTimeFromSeconds
date:   2013-06-19T22:19:11.000Z
library: DateLib
argString: "seconds"
author: Seth Duffey
authorEmail: sduffey@ci.davis.ca.us
version: 2
cfVersion: CF5
shortDescription: Calculates time from seconds after midnight.
description: |
 Calculates time from seconds after midnight.  The date part of a time variable is set to December 30, 1899

returnValue: Returns a date/time object.

example: |
 <CFSET s=10000>
 
 <cfoutput>
 Given s=#s#<BR>
 #TimeFormat(GetTimeFromSeconds(s), 'HH:mm:ss')#
 </cfoutput>

args:
 - name: seconds
   desc: Number of seconds from midnight used to calculate the time.
   req: true


javaDoc: |
 /**
  * Calculates time from seconds after midnight.
  * Minor modifications by Rob Brooks-Bilson (rbils@amkor.com).
  * v2 by Raymond Camden to support seconds over one day
  * 
  * @param seconds      Number of seconds from midnight used to calculate the time. (Required)
  * @return Returns a date/time object. 
  * @author Seth Duffey (sduffey@ci.davis.ca.us) 
  * @version 2, June 19, 2013 
  */

code: |
 function getTimeFromSeconds(seconds) {
 
     var timehr = "";
     var timemin = "";
     var timesec = "";
     
     //roll days
     if(seconds gt 86400) seconds = seconds-((seconds \ 86400) * 86400);
 
     TimeHr = (((seconds\3600)-1) Mod 24)+1; /* find hour */
     TimeMin = seconds\60-(seconds\3600)*60; /* Find minutes */
     TimeSec = seconds-(TimeHr * 3600) - (TimeMin*60); /* find seconds */
     return createTime(TimeHr,TimeMin,TimeSec); /* Create time (no date) */
 
 }

---

