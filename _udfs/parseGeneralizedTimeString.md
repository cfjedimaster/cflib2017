---
layout: udf
title:  parseGeneralizedTimeString
date:   2005-12-16T13:28:41.000Z
library: DateLib
argString: "timeString"
author: Michael Dawson
authorEmail: md40@evansville.edu
version: 1
cfVersion: CF5
shortDescription: Creates a date/time object from a generalized time string in the format of YYYYMMDDHHMMSS.0Z
description: |
 Microsoft's Active Directory stores a generalized time string in many of its attributes.  ColdFusion cannot natively parse this time string.  This function adds date and time delimiters to the time string to allow ColdFusion to correctly parse the value.  This function does not calculate any time zone offset since Active Directory does not store that information.  This function also does not convert the time from UTC to local.

returnValue: Returns a date object.

example: |
 <cfset weddingTime = "19880923191500.0Z">
 
 <cfoutput>
 I was married on #parseGeneralizedTimeString(weddingTime)#.
 </cfoutput>

args:
 - name: timeString
   desc: Generalized time string.
   req: true


javaDoc: |
 /**
  * Creates a date/time object from a generalized time string in the format of YYYYMMDDHHMMSS.0Z
  * 
  * @param timeString      Generalized time string. (Required)
  * @return Returns a date object. 
  * @author Michael Dawson (md40@evansville.edu) 
  * @version 1, December 16, 2005 
  */

code: |
 function parseGeneralizedTimeString(timeString){
     // This function expects a generalize time string in the following format: 19880923191500.0Z
 
     // Return the parsed date/time object.
     return parseDateTime(left(arguments.timeString, 4) & "-" & mid(arguments.timeString, 5, 2) & "-" & mid(arguments.timeString, 7, 2) & " " & mid(arguments.timeString, 9, 2) & ":" & mid(arguments.timeString, 11, 2) & ":" & mid(arguments.timeString, 13, 2));
 }

---

