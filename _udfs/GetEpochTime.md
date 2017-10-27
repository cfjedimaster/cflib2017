---
layout: udf
title:  GetEpochTime
date:   2001-10-05T11:32:17.000Z
library: DateLib
argString: "[DateTime]"
author: Chris Mellon
authorEmail: mellan@mnr.org
version: 1
cfVersion: CF5
shortDescription: Returns the number of seconds since January 1, 1970, 00&#58;00&#58;00
tagBased: false
description: |
 Returns the number of seconds since January 1, 1970, 00:00 (UNIX epoch). Can be passed a datetime value, or defaults to Now().  Note that epoch time functions are only valid through 2038.

returnValue: Returns a numeric value.

example: |
 <CFOUTPUT>
 #GetEpochTime("January 1 1989 14:10:00")#<BR>
 #GetEpochTime()#<BR>
 #GetEpochTime(Now())#
 </CFOUTPUT>

args:
 - name: DateTime
   desc: Date/time object you want converted to Epoch time.
   req: false


javaDoc: |
 /**
  * Returns the number of seconds since January 1, 1970, 00:00:00
  * 
  * @param DateTime      Date/time object you want converted to Epoch time. 
  * @return Returns a numeric value. 
  * @author Chris Mellon (mellan@mnr.org) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetEpochTime() {
     var datetime = 0;
     if (ArrayLen(Arguments) is 0) {
         datetime = Now();
 
     }
     else {
         if (IsDate(Arguments[1])) {
             datetime = Arguments[1];
         } else {
             return NULL;
         }
     }
     return DateDiff("s", "January 1 1970 00:00", datetime);
         
         
 }

oldId: 293
---

