---
layout: udf
title:  IsSessionVarEnabled
date:   2002-04-29T12:36:18.000Z
library: UtilityLib
argString: ""
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Returns true if session variables are enabled.
tagBased: false
description: |
 Returns true if session variables are enabled.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 Are we working inside a session scope? #IsSessionVarEnabled()#
 </cfoutput>

args:


javaDoc: |
 /**
  * Returns true if session variables are enabled.
  * 
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, April 29, 2002 
  */

code: |
 function IsSessionVarEnabled() {
     var foo = "";
     try {
         foo = session.urltoken;
         return true;
     } catch("Any" e) {
         return false;
     }
 }

oldId: 634
---

