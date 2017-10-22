---
layout: udf
title:  millisecondsToDate
date:   2005-05-20T22:10:37.000Z
library: DateLib
argString: "strMilliseconds"
author: Steve Parks
authorEmail: steve@adeptdeveloper.com
version: 1
cfVersion: CF6
shortDescription: Converts epoch milleseconds to a date timestamp.
tagBased: true
description: |
 MillisecondsToDate will convert milliseconds (such as timestamps returned by Java objects) and convert them into CF friendly date timestamps.

returnValue: Returns a date.

example: |
 MillisecondsToDate(1095982571858)<BR>
 <cfoutput>#MillisecondsToDate(1095982571858)#</cfoutput>

args:
 - name: strMilliseconds
   desc: The number of milliseconds.
   req: true


javaDoc: |
 <!---
  Converts epoch milleseconds to a date timestamp.
  
  @param strMilliseconds      The number of milliseconds. (Required)
  @return Returns a date. 
  @author Steve Parks (steve@adeptdeveloper.com) 
  @version 1, May 20, 2005 
 --->

code: |
 <cffunction name="millisecondsToDate" access="public" output="false" returnType="date">
     <cfargument name="strMilliseconds" type="string" required="true">
     
     <cfreturn dateAdd("s", strMilliseconds/1000, "january 1 1970 00:00:00")>
 </cffunction>

---

