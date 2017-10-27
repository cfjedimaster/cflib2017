---
layout: udf
title:  CreateDateRange
date:   2003-05-20T13:42:24.000Z
library: DateLib
argString: "startdate, ndays[, dtformat]"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Creates a date range array.
tagBased: false
description: |
 Creates a date range array. The range starts with one date and goes N days into the future.

returnValue: Returns an array.

example: |
 <cfset arrDates = CreateDateRange(now(),10,"mmmm dd, yyyy")>
 
 <cfdump var="#arrDates#">

args:
 - name: startdate
   desc: The starting date.
   req: true
 - name: ndays
   desc: The number of days. This will include the starting date.
   req: true
 - name: dtformat
   desc: Date format. Defaults to "mm/dd/yyyy"
   req: false


javaDoc: |
 /**
  * Creates a date range array.
  * 
  * @param startdate      The starting date. (Required)
  * @param ndays      The number of days. This will include the starting date. (Required)
  * @param dtformat      Date format. Defaults to "mm/dd/yyyy" (Optional)
  * @return Returns an array. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, May 20, 2003 
  */

code: |
 function CreateDateRange(startdate,ndays) {
   var dtarray = arraynew(1);
   var i = 1;
   var ndate = "";
   var dtformat = "mm/dd/yyyy";
   
   if (ArrayLen(arguments) gte 3) dtformat = arguments[3];
   ndate = dateformat(startdate,"mm/dd/yyyy") - 1;
   for(i = 1; i lte ndays; i = i+1) {
     ndate = dateformat(ndate+1,dtformat);
     arrayappend(dtarray, ndate);
   }
   return dtarray;
 }

oldId: 902
---

