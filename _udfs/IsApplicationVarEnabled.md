---
layout: udf
title:  IsApplicationVarEnabled
date:   2002-04-29T12:37:34.000Z
library: UtilityLib
argString: ""
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Returns true if application variables are enabled.
description: |
 Returns true if application variables are enabled.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 Are we working inside an application scope? #IsApplicationVarEnabled()#
 </cfoutput>

args:


javaDoc: |
 /**
  * Returns true if application variables are enabled.
  * 
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, April 29, 2002 
  */

code: |
 function IsApplicationVarEnabled() {
     var foo = "";
     try {
         foo = application.applicationName;
         return true;
     } catch("Any" e) {
         return false;
     }
 }

---

