---
layout: udf
title:  getMeridiem
date:   2012-11-14T14:12:00.000Z
library: DateLib
argString: "dateTime"
author: Nolan Erck
authorEmail: nolan@southofshasta.com
version: 1
cfVersion: CF9
shortDescription: I return the &quot;am/pm&quot; portion of a date/time (aka the &quot;meridiem&quot;).
tagBased: false
description: |
 Returns the &quot;am/pm&quot; portion of a time/date (aka the &quot;meridiem&quot;). Works with both dates created via plain text (i.e. &quot;4/1/2012&quot;) and via CreateDateTime(), etc. This is basically a wrapper around the call to TimeFormat() to both a) add some extra validation for dealing with potentially badly formatted dates and b) uses the proper &quot;meridiem&quot; name for this portion of the timestamp, adding some readability to the code.

returnValue: Returns a string that is either AM or PM

example: |
 // example with date/times showing the cut-over from AM to PM
 baseTS = createDateTime(year(now()), month(now()), day(now()), 11, 59, 55);
 for (i=0; i <= 10; i++){
     testTs = dateAdd("s", i, baseTs);
     writeOutput("#testTs#: #getMeridiem(testTs)#<br />");
 }

args:
 - name: dateTime
   desc: A datetime as a date or a string that will parse as a datetime
   req: true


javaDoc: |
 /**
  * I return the &quot;am/pm&quot; portion of a date/time (aka the &quot;meridiem&quot;).
  * * version 0.1 by Nolan Erck
  * * version 0.2 by Nolan Erck: fixing small bug
  * * version 1.0 by Adam Cameron: factoring-out redundant date-checking logic
  * 
  * @param dateTime      A datetime as a date or a string that will parse as a datetime (Required)
  * @return Returns a string that is either AM or PM 
  * @author Nolan Erck (nolan@southofshasta.com) 
  * @version 1.1, November 14, 2012 
  */

code: |
 string function getMeridiem(required date dateTime){
     return timeFormat(dateTime, "tt");
 }

oldId: 2228
---

