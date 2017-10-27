---
layout: udf
title:  getPascha
date:   2006-05-01T12:12:55.000Z
library: DateLib
argString: "[y]"
author: John E Pusey
authorEmail: nightgazing@gmail.com
version: 1
cfVersion: CF6
shortDescription: Returns the date for Orthodox Easter (Pascha) in a given year.
tagBased: true
description: |
 Returns the date for Orthodox Easter (Pascha) in a given year. If no year is specified, defaults to the current year.

returnValue: Returns a date.

example: |
 <cfoutput>
     #dateFormat(getPascha(), "full")#<br>
     #dateFormat(getPascha(2010), "full")#
 </cfoutput>

args:
 - name: y
   desc: Year. Defaults to the current year.
   req: false


javaDoc: |
 <!---
  Returns the date for Orthodox Easter (Pascha) in a given year.
  
  @param y      Year. Defaults to the current year. (Optional)
  @return Returns a date. 
  @author John E Pusey (nightgazing@gmail.com) 
  @version 1, April 9, 2007 
 --->

code: |
 <cffunction name="getPascha" returntype="date">
     <cfargument name="y" type="numeric" required="false" default="#year(now())#">
     
     <cfset var t = 0>
     <cfset var dd = 0>
     <cfset var mm = 0>
     
     <cfset t = (19 * (y mod 19) + 16) mod 30>
     <cfset dd = 3 + t + (2 * (y mod 4) + 4 * (y mod 7) + 6 * t) mod 7>
 
     <cfif y lt 1924>
         <cfset dd = dd - 13>
     </cfif>
 
     <cfif dd gt 30>
         <cfset dd = dd - 30>
         <cfset mm = 5>
     <cfelse>
         <cfset mm = 4>
     </cfif>
     
     <cfif dd lt 1>
         <cfset dd = dd + 31>
         <cfset mm = 3>
     </cfif>
 
   <cfreturn createDate(y, mm, dd)>
 </cffunction>

oldId: 1423
---

