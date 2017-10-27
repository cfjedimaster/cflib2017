---
layout: udf
title:  Tomorrow
date:   2001-08-17T13:16:22.000Z
library: DateLib
argString: ""
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF5
shortDescription: Returns a date object representing tomorrow.
tagBased: false
description: |
 Returns a date object representing tomorrow.

returnValue: Returns a date object representing tomorrow.

example: |
 <CFOUTPUT>
 Tomorrow is #DateFormat(Tomorrow())#
 </CFOUTPUT>

args:


javaDoc: |
 /**
  * Returns a date object representing tomorrow.
  * 
  * @return Returns a date object representing tomorrow. 
  * @author Ben Forta (ben@forta.com) 
  * @version 1, August 17, 2001 
  */

code: |
 function Tomorrow() {
 return DateAdd("d",1,Now());
 }

oldId: 159
---

