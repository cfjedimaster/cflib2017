---
layout: udf
title:  CreateTimeStruct
date:   2002-01-07T15:21:38.000Z
library: DateLib
argString: "timespan"
author: Dave Pomerance
authorEmail: dpomerance@mos.org
version: 1
cfVersion: CF5
shortDescription: Converts a given number of days, hours, minutes, OR seconds to a struct of days, hours, minutes, AND seconds.
description: |
 User supplies timespan (a number) and a mask of d, h, m, or s (day, hour, minute, second respectively) to denote the time unit timespan is measured in.  Timespan is required, mask defaults to s.  The function returns a structure of days, hours, minutes, and seconds equivalent to supplied timespan.

returnValue: Returns a structure.

example: |
 <cfset timestruct = CreateTimeStruct(21403, "m")>
 
 <cfoutput>
 21403 minutes = #timestruct.d# days, #timestruct.h# hours, #timestruct.m# minutes, #timestruct.s# seconds
 </cfoutput>

args:
 - name: timespan
   desc: The timespan to convert.
   req: true


javaDoc: |
 /**
  * Converts a given number of days, hours, minutes, OR seconds to a struct of days, hours, minutes, AND seconds.
  * 
  * @param timespan      The timespan to convert. 
  * @return Returns a structure. 
  * @author Dave Pomerance (dpomerance@mos.org) 
  * @version 1, January 7, 2002 
  */

code: |
 function CreateTimeStruct(timespan) {
     var timestruct = StructNew();
     var mask = "s";
 
     if (ArrayLen(Arguments) gte 2) mask = Arguments[2];
 
     // if timespan isn't an integer, convert mask towards s until timespan is an integer or mask is s
     while (Int(timespan) neq timespan AND mask neq "s") {
         if (mask eq "d") {
             timespan = timespan * 24;
             mask = "h";
         } else if (mask eq "h") {
             timespan = timespan * 60;
             mask = "m";
         } else if (mask eq "m") {
             timespan = timespan * 60;
             mask = "s";
         }
     }
     
     // only 4 allowed values for mask - if not one of those, return blank struct
     if (ListFind("d,h,m,s", mask)) {
         // compute seconds
         if (mask eq "s") {
             timestruct.s = (timespan mod 60) + (timespan - Int(timespan));
             timespan = int(timespan/60);
             mask = "m";
         } else timestruct.s = 0;
         // compute minutes
         if (mask eq "m") {
             timestruct.m = timespan mod 60;
             timespan = int(timespan/60);
             mask = "h";
         } else timestruct.m = 0;
         // compute hours, days
         if (mask eq "h") {
             timestruct.h = timespan mod 24;
             timestruct.d = int(timespan/24);
         } else {
             timestruct.h = 0;
             timestruct.d = timespan;
         }
     }
     
     return timestruct;
 }

---

