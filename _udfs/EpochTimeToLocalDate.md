---
layout: udf
title:  EpochTimeToLocalDate
date:   2002-06-21T12:17:49.000Z
library: DateLib
argString: "epoch"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts Epoch time to a ColdFusion date object in local time.
tagBased: false
description: |
 Converts a UNIX epoch time to a ColdFusion date object in local time.  Epoch time is defined as the number of seconds elapsed since January 1 1970 00:00:00 GMT.  This UDF takes the server's local timezone offset into account when converting from epoch to local time.

returnValue: Returns a date object.

example: |
 <cfoutput>
 1021385053: #EpochTimeToLocalDate(1021385053)#<br>
 0: #EpochTimeToLocalDate(0)#<br>
 </cfoutput>

args:
 - name: epoch
   desc: Epoch time, in seconds.
   req: true


javaDoc: |
 /**
  * Converts Epoch time to a ColdFusion date object in local time.
  * 
  * @param epoch      Epoch time, in seconds. (Required)
  * @return Returns a date object. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, June 21, 2002 
  */

code: |
 function EpochTimeToLocalDate(epoch) {
   return DateAdd("s",epoch,DateConvert("utc2Local", "January 1 1970 00:00"));
 }

---

