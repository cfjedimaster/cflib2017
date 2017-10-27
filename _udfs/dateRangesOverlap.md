---
layout: udf
title:  dateRangesOverlap
date:   2009-01-20T22:49:13.000Z
library: DateLib
argString: "start1, end1, start2, end2"
author: Leigh
authorEmail: cfsearching@yahoo.com
version: 1
cfVersion: CF6
shortDescription: Compares two date ranges to determine if they overlap by one or more days.
tagBased: true
description: |
 Compares two date ranges to determine if they overlap (or intersect) by one or more days. Returns true if the two ranges overlap.

returnValue: Returns a boolean.

example: |
 <cfset firstStart = createDate(2008, 8, 1)>
 <cfset firstEnd = createDate(2008, 8, 31)>
 <cfset secondStart = createDate(2008, 8, 4)>
 <cfset secondEnd = createDate(2008, 8, 16)>
 
 <cfif dateRangesOverlap( firstStart, firstEnd, secondStart, secondEnd )>
     The date ranges overlap. Do something here.
 <cfelse>
     The two ranges do NOT overlap. Do something else.
 </cfif>

args:
 - name: start1
   desc: Initial date of the first range.
   req: true
 - name: end1
   desc: Ending date of the second range.
   req: true
 - name: start2
   desc: Initial date of the second range.
   req: true
 - name: end2
   desc: Ending date of the second range.
   req: true


javaDoc: |
 <!---
  Compares two date ranges to determine if they overlap by one or more days.
  
  @param start1      Initial date of the first range. (Required)
  @param end1      Ending date of the second range. (Required)
  @param start2      Initial date of the second range. (Required)
  @param end2      Ending date of the second range. (Required)
  @return Returns a boolean. 
  @author Leigh (cfsearching@yahoo.com) 
  @version 1, January 20, 2009 
 --->

code: |
 <cffunction name="dateRangesOverlap" returntype="boolean" output="false" hint="Returns true if two date ranges overlap by one or more days">
     <cfargument name="start1" type="date" required="true">
     <cfargument name="end1" type="date" required="true">
     <cfargument name="start2" type="date" required="true">
     <cfargument name="end2" type="date" required="true">
     <cfset var overlapFound = false>
     <cfset var datePart = "d">
 
     <cfif dateCompare(arguments.end1, arguments.start1, datePart) eq -1>
         <cfthrow message="End1 date cannot be earlier than start1 date">
     <cfelseif dateCompare(arguments.end2, arguments.start2, datePart) eq -1>
         <cfthrow message="End2 date cannot be earlier than start2 date">
     </cfif>
     <!--- first range starts within the second date range --->
     <cfif dateCompare(arguments.start1, arguments.start2, datePart) gte 0 and 
                 dateCompare(arguments.start1, arguments.end2, datePart) lte 0>
         <cfset overlapFound = true>    
     <!--- first range ends within the second date range --->
     <cfelseif dateCompare(arguments.end1, arguments.start2, datePart) gte 0 and 
                 dateCompare(arguments.end1, arguments.end2, datePart) lte 0>
         end between
         <cfset overlapFound = true>    
     <!--- first range spans the second date range --->
     <cfelseif dateCompare(arguments.start1, arguments.start2, datePart) lte 0 and 
                 dateCompare(arguments.end1, arguments.end2, datePart) gte 0>
         spans        
         <cfset overlapFound = true>    
     </cfif>
 
     <cfreturn overlapFound>
 </cffunction>

oldId: 1901
---

