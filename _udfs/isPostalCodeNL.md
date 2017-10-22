---
layout: udf
title:  isPostalCodeNL
date:   2005-10-23T13:56:15.000Z
library: StrLib
argString: "str"
author: Jorrit Janszen
authorEmail: jorrit@janszen.net
version: 1
cfVersion: CF5
shortDescription: Checks if valid Dutch postal code.
tagBased: false
description: |
 Validates a dutch postal code which is formatted with four digits (first digit can't be a zero) an (optional space) and two alphas.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 #isPostalCodeNL(0111 AA)# (will be false)<br/>
 #isPostalCodeNL(1000AA)# (will be true)<br/>
 #isPostalCodeNL(9999 AA)# (will be true)<br/>
 </cfoutput>

args:
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Checks if valid Dutch postal code.
  * 
  * @param str      String to check. (Required)
  * @return Returns a boolean. 
  * @author Jorrit Janszen (jorrit@janszen.net) 
  * @version 1, October 23, 2005 
  */

code: |
 function isPostalCodeNL (str) {
     //postal codes consists of 4 digits, folowed by one space and two alphas
     return reFind("[1-9][[:digit:]]{3}[ ]?[[:alpha:]]{2}", arguments.str) gte 1;
 }

---

