---
layout: udf
title:  Yesterday
date:   2001-08-17T13:17:35.000Z
library: DateLib
argString: ""
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF5
shortDescription: Returns a date object representing yesterday.
description: |
 Returns a date object representing yesterday.

returnValue: Returns a date object representing tomorrow.

example: |
 <CFOUTPUT>
 Yesterday was #DateFormat(Yesterday())#<BR>
 </CFOUTPUT>

args:


javaDoc: |
 /**
  * Returns a date object representing yesterday.
  * 
  * @return Returns a date object representing tomorrow. 
  * @author Ben Forta (ben@forta.com) 
  * @version 1, August 17, 2001 
  */

code: |
 function Yesterday() {
     return DateAdd("d",-1,Now());
 }

---

