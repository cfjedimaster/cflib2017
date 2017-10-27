---
layout: udf
title:  GetDSNs
date:   2002-11-15T14:06:17.000Z
library: DatabaseLib
argString: ""
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Gets a list of DSNs.
tagBased: false
description: |
 Gets a list of registered datasources.

returnValue: Returns an array.

example: |
 <!---
 Commented out for security reasons.
 <cfdump var="#getDSNs()#">
 --->

args:


javaDoc: |
 /**
  * Gets a list of DSNs.
  * 
  * @return Returns an array. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, November 15, 2002 
  */

code: |
 function getDSNs() {
     var factory = createObject("java","coldfusion.server.ServiceFactory");
     return factory.getDataSourceService().getNames();
 }

oldId: 784
---

