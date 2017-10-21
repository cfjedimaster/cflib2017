---
layout: udf
title:  isPostalCodeBR
date:   2005-10-06T23:27:16.000Z
library: StrLib
argString: "str"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Checks if postal code is format of Brazil.
description: |
 Checks if postal code is format of Brazil.  Does not check if the postal code actually exists.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 #isPostalCodeBR("54321-987")# (true)<br/>
 #isPostalCodeBR("4321-123")# (false)<br/>
 </cfoutput>

args:
 - name: str
   desc: The string to check.
   req: true


javaDoc: |
 /**
  * Checks if postal code is format of Brazil.
  * 
  * @param str      The string to check. (Required)
  * @return Returns a boolean. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, October 6, 2005 
  */

code: |
 function isPostalCodeBR(str) {
     return REFind("^[[:digit:]]{5}( |-)?[[:digit:]]{3}$", str) gte 1;
 }

---

