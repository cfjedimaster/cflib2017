---
layout: udf
title:  EpochTimeToDate
date:   2002-06-21T12:14:03.000Z
library: DateLib
argString: "epoch"
author: Chris Mellon
authorEmail: mellon@mnr.org
version: 1
cfVersion: CF5
shortDescription: Converts a UNIX epoch time to a ColdFusion date object.
tagBased: false
description: |
 Converts a UNIX epoch time to a ColdFusion date object.  Epoch time is defined as the number of seconds elapsed since January 1 1970 00:00:00 GMT.  This UDF does not take the server's local timezone offset into account when converting from epoch to local time.  For that, see EpochTimeToLocalDate().

returnValue: Returns a date object.

example: |
 <cfoutput>
 1021385053: #EpochTimeToDate(1021385053)#<br>
 0: #EpochTimeToDate(0)#<br>
 </cfoutput>

args:
 - name: epoch
   desc: Epoch time, in seconds.
   req: true


javaDoc: |
 /**
  * Converts a UNIX epoch time to a ColdFusion date object.
  * 
  * @param epoch      Epoch time, in seconds. (Required)
  * @return Returns a date object. 
  * @author Chris Mellon (mellon@mnr.org) 
  * @version 1, June 21, 2002 
  */

code: |
 function EpochTimeToDate(epoch) {
     return DateAdd("s", epoch, "January 1 1970 00:00:00");
 }

---

