---
layout: udf
title:  getCurrentGradYear
date:   2006-03-30T13:15:28.000Z
library: DateLib
argString: "switchmonth"
author: Lisa D. Brown
authorEmail: wertle@wertle.com
version: 1
cfVersion: CF5
shortDescription: Gets the current graduation year/end of school year.
description: |
 Returns the current graduation year/end of school year (returns -1 on an error).  Useful for determining which school year we are currently in as opposed to which fiscal year.  Uses the now(), Month(), and Year() functions.

returnValue: Returns a number.

example: |
 <cfoutput>#getcurrentGradYear(9)#</cfoutput>

args:
 - name: switchmonth
   desc: Numeric value for the first month of the school year.
   req: true


javaDoc: |
 <!---
  Gets the current graduation year/end of school year.
  
  @param switchmonth      Numeric value for the first month of the school year. (Required)
  @return Returns a number. 
  @author Lisa D. Brown (wertle@wertle.com) 
  @version 1, April 9, 2007 
 --->

code: |
 <cffunction name="getCurrentGradYear" returntype="numeric">
     <!---last month of a schoolyear--->
     <cfargument name="switchmonth" type="numeric" required="no" default="6">
     <cfset var currGradYear = -1>
 
     <!---if the current month is between January and the last month of the schoolyear, 
     set the current graduation year to the current year--->
     <cfif month(now()) gte 1 and month(now()) lte arguments.switchmonth>
         <cfset currGradYear = year(now())>
     <!---if the current month is between the first month of the schoolyear and December,
      set the current graduation year to be next year--->
     <cfelseif month(now()) gt arguments.switchmonth and month(now()) lte 12>
         <cfset currGradYear = year(now()) + 1>
     </cfif>
     <cfreturn currGradYear>
 </cffunction>

---

