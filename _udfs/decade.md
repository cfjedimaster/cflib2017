---
layout: udf
title:  decade
date:   2012-07-27T18:26:15.000Z
library: DateLib
argString: "year"
author: Mosh Teitelbaum
authorEmail: mosh.teitelbaum@evoch.com
version: 1
cfVersion: CF6
shortDescription: Returns the decade (xxx0-xxx9) to which the specified year belongs.
description: |
 Returns the decade (xxx0-xxx9) to which the specified year belongs.

returnValue: Returns a string

example: |
 #decade("1983")# = 1980-1989<br />
 #listFirst(decade("1983"), "-")# = 1980<br />
 #listLast(decade("1983"), "-")# = 1989<br />

args:
 - name: year
   desc: Year to use
   req: true


javaDoc: |
 <!---
  Returns the decade (xxx0-xxx9) to which the specified year belongs.
  
  @param year      Year to use (Required)
  @return Returns a string 
  @author Mosh Teitelbaum (mosh.teitelbaum@evoch.com) 
  @version 1, July 27, 2012 
 --->

code: |
 <cffunction name="decade" returntype="string" output="no">
     <cfargument name="year" type="numeric" required="yes">
 
     <cfset var startYear = arguments.year - (arguments.year MOD 10)>
     <cfset var endYear = arguments.year + (10 - (arguments.year MOD 10) - 1)>
 
     <cfreturn startYear & "-" & endYear>
 </cffunction>

---

