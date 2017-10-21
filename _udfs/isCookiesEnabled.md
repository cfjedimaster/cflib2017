---
layout: udf
title:  isCookiesEnabled
date:   2009-03-14T00:00:14.000Z
library: UtilityLib
argString: ""
author: Alex Baban
authorEmail: alexbaban@gmail.com
version: 1
cfVersion: CF6
shortDescription: Returns true if browser cookies are enabled.
description: |
 Returns true if browser cookies are enabled. Requires Session or Client scope enabled.

returnValue: Returns a boolean.

example: |
 <cfoutput>#IsCookiesEnabled()#</cfoutput>

args:


javaDoc: |
 /**
  * Returns true if browser cookies are enabled.
  * 
  * @return Returns a boolean. 
  * @author Alex Baban (alexbaban@gmail.com) 
  * @version 1, March 13, 2009 
  */

code: |
 function isCookiesEnabled() {
     return IsBoolean(URLSessionFormat("True"));
 }

---

