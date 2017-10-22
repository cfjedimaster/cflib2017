---
layout: udf
title:  MySQLDT2TS
date:   2002-06-27T17:37:43.000Z
library: DatabaseLib
argString: "dt"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: Converts a CF DateTime object into a MySQL timestamp.
tagBased: false
description: |
 Converts the passed CF datetime into a MySQL timestamp.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 The current time in MySQL timestamp: 
 #MySQLDT2TS(Now())#<BR>
 <I>(Note - due to page caching, the time value will not change.)</I>
 </CFOUTPUT>

args:
 - name: dt
   desc: Date object.
   req: true


javaDoc: |
 /**
  * Converts a CF DateTime object into a MySQL timestamp.
  * 
  * @param dt      Date object. (Required)
  * @return Returns a string. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, June 27, 2002 
  */

code: |
 function MySQLDT2TS(dt) {
     return Year(dt) & NumberFormat(Month(dt),'00') & NumberFormat(Day(dt),'00') & NumberFormat(Hour(dt),'00') & NumberFormat(Minute(dt),'00') & NumberFormat(Second(dt),'00');
 }

---

