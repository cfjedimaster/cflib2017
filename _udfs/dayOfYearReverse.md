---
layout: udf
title:  dayOfYearReverse
date:   2007-09-07T22:43:34.000Z
library: DateLib
argString: "currentDayOfYear[, currentYear]"
author: Jeff Houser
authorEmail: jeff@farcryfly.com
version: 3
cfVersion: CF6
shortDescription: This is the opposite of CFs DayOfYear function.
tagBased: true
description: |
 This function accepts the day of the year (One way to get that is with the DayOfYear function) and the year. It returns the date object for the given day of the year.

returnValue: Returns a date.

example: |
 <cfoutput>
 #dayOfYearReverse(dayOfYear(now()))#
 </cfoutput>

args:
 - name: currentDayOfYear
   desc: Numerical day of the year.
   req: true
 - name: currentYear
   desc: The year. Defaults to this year.
   req: false


javaDoc: |
 <!---
  This is the opposite of CFs DayOfYear function.
  v2 bug fix by David Levin (dave@angrysam.com)
  v3 fix by Christopher Jordan
  
  @param currentDayOfYear      Numerical day of the year. (Required)
  @param currentYear      The year. Defaults to this year. (Optional)
  @return Returns a date. 
  @author Jeff Houser (jeff@farcryfly.com) 
  @version 3, September 7, 2007 
 --->

code: |
 <cffunction name="dayOfYearReverse" returntype="date" hint="Accepts the day of Year (Integer) and year in question, and returns the date" output="false">
         <cfargument name="currentDayOfYear" type="numeric" required="yes">
         <cfargument name="currentYear" type="numeric" default="#year(now())#" required="no">
         <cfreturn dateAdd("d",arguments.currentDayOfYear, createDate(arguments.currentyear-1,"12","31" ))>
 </cffunction>

---

