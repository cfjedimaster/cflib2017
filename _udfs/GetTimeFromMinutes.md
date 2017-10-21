---
layout: udf
title:  GetTimeFromMinutes
date:   2001-11-06T13:50:21.000Z
library: DateLib
argString: "Minutes"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Calculates time from minutes after midnight.
description: |
 Calculates time from minutes after midnight.  The date part of a time variable is set to December 30, 1899.

returnValue: Returns a date/time object.

example: |
 <CFSET m=405>
 
 <cfoutput>
 Given m=#m#<BR>
 #TimeFormat(GetTimeFromMinutes(m), 'HH:mm:ss')#
 </cfoutput>

args:
 - name: Minutes
   desc: Number of minutes elapsed since midnight.
   req: true


javaDoc: |
 /**
  * Calculates time from minutes after midnight.
  * 
  * @param Minutes      Number of minutes elapsed since midnight. 
  * @return Returns a date/time object. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetTimeFromMinutes(minutes)
 {
   Var tHr = (((minutes\60)-1) Mod 24)+1;
   Var tMin = minutes-(tHr*60);
   return CreateTime(tHr,tMin, 0);
 }

---

