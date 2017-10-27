---
layout: udf
title:  DifferentDay
date:   2002-03-21T10:12:21.000Z
library: DateLib
argString: "date1, date2"
author: Matthew Walker
authorEmail: matthew@cabbagetree.co.nz
version: 1
cfVersion: CF5
shortDescription: Check if two dates refer to the same day.
tagBased: false
description: |
 Check if two dates refer to the same day. This is different from using the built-in function DateDiff(&quot;d&quot;) as it will only count whole days difference, whereas a difference of just a second could be the difference between one day and another.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 DifferentDay test: 
 #DifferentDay("{ts '2003-01-01 23:59:59'}","{ts '2003-01-02 00:00:00'}")#<br>
 Compare to DateDiff: 
 #DateDiff("d","{ts '2003-01-01 23:59:59'}","{ts '2003-01-02 00:00:00'}")#
 </cfoutput>

args:
 - name: date1
   desc: First date to check.
   req: true
 - name: date2
   desc: Second date to check.
   req: true


javaDoc: |
 /**
  * Check if two dates refer to the same day.
  * 
  * @param date1      First date to check. 
  * @param date2      Second date to check. 
  * @return Returns a boolean. 
  * @author Matthew Walker (matthew@cabbagetree.co.nz) 
  * @version 1, March 21, 2002 
  */

code: |
 function DifferentDay(date1, date2) {
     return ( ( DayOfYear(date1) NEQ DayOfYear(date2) ) OR ( Year(date1) NEQ Year(date2) ) );
 }

oldId: 549
---

