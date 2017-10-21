---
layout: udf
title:  isPostalCodeBE
date:   2005-10-06T23:23:47.000Z
library: StrLib
argString: "str"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Checks if valid Belgium postal code.
description: |
 Checks if valid Belgium postal code. Does not actually check if the postal code exists, but merely the format.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 #isPostalCodeBE(0111)# (will be false)<br/>
 #isPostalCodeBE(9999)# (will be true)<br/>
 </cfoutput>

args:
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Checks if valid Belgium postal code.
  * 
  * @param str      String to check. (Required)
  * @return Returns a boolean. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, October 6, 2005 
  */

code: |
 function isPostalCodeBE(str) {
     // Postal codes cannot start with 0
     return REFind("[1-9][[:digit:]]{3}", arguments.str) gte 1;
 }

---

