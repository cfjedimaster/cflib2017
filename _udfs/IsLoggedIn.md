---
layout: udf
title:  IsLoggedIn
date:   2002-04-29T12:24:45.000Z
library: SecurityLib
argString: ""
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Returns true if user is authenticated.
description: |
 Returns true if user is authenticated. Based on new security model in CFMX.

returnValue: Returns a boolean.

example: |
 <cfif isLoggedIn()>
     You are logged in.
 <cfelse>
     You are not logged in.
 </cfif>

args:


javaDoc: |
 /**
  * Returns true if user is authenticated.
  * 
  * @return Returns a boolean. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, April 29, 2002 
  */

code: |
 function IsLoggedIn() {
     return getAuthUser() neq "";
 }

---

