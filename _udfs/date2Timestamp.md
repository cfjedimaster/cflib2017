---
layout: udf
title:  date2Timestamp
date:   2006-09-28T20:15:48.000Z
library: DateLib
argString: "cfdate"
author: Michael Fritz
authorEmail: mitchiru_jo@gmx.de
version: 1
cfVersion: CF5
shortDescription: Converts ColdFusion date to linux timestamp.
description: |
 Converts ColdFusion date to linux timestamp using the datefiff algorithm to count the difference in seconds between the given date and the 1970-1-1.

returnValue: Retuns a number.

example: |
 <cfscript>
 today = now();
 todayInLinux = date2Timestamp(today);
 </cfscript>

args:
 - name: cfdate
   desc: A ColdFusion datetime value.
   req: true


javaDoc: |
 /**
  * Converts ColdFusion date to linux timestamp.
  * 
  * @param cfdate      A ColdFusion datetime value. (Required)
  * @return Retuns a number. 
  * @author Michael Fritz (mitchiru_jo@gmx.de) 
  * @version 1, September 28, 2006 
  */

code: |
 function date2Timestamp(cfdate) {
     return dateDiff('s',createDate(1970,1,1),cfdate);
 }

---

