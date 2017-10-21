---
layout: udf
title:  DifferentMonth
date:   2002-03-21T10:14:02.000Z
library: DateLib
argString: "date1, date2"
author: Matthew Walker
authorEmail: matthew@cabbagetree.co.nz
version: 1
cfVersion: CF5
shortDescription: Check if two dates refer to the same month.
description: |
 Check if two dates refer to the same month. This is different from using the built-in function DateDiff(&quot;m&quot;) as it will only count whole months difference, whereas a difference of just a second could be the difference between one month and another.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 DifferentMonth test:
 #DifferentMonth("{ts '2002-12-31 23:59:59'}","{ts '2003-01-01 00:00:00'}")#<br>
 Compare to DateDiff: 
 #DateDiff("m","{ts '2002-12-31 23:59:59'}","{ts '2003-01-01 00:00:00'}")#<br>
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
  * Check if two dates refer to the same month.
  * 
  * @param date1      First date to check. 
  * @param date2      Second date to check. 
  * @return Returns a boolean. 
  * @author Matthew Walker (matthew@cabbagetree.co.nz) 
  * @version 1, March 21, 2002 
  */

code: |
 function DifferentMonth(date1, date2) {
     return ( ( Month(date1) NEQ Month(date2) ) OR ( Year(date1) NEQ Year(date2) ) );
 }

---

