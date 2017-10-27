---
layout: udf
title:  isPostalCodeDK
date:   2005-10-06T23:24:57.000Z
library: StrLib
argString: "str"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Checks if valid postal code of Denmark.
tagBased: false
description: |
 Check if postal code is a valid postal code of Denmark. Does not check if the postal actually exsists, but if it meets the format.  Regex is case insensitive.

returnValue: Returns a string.

example: |
 <cfoutput>
 #isPostalCodeDK("DK-0111")# (false because first numeric is 0)<br/>
 #isPostalCodeDK("CH-9999")# (false)<br/>
 #isPostalCodeDK("DK-1999")# (true)
 </cfoutput>

args:
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Checks if valid postal code of Denmark.
  * 
  * @param str      String to check. (Required)
  * @return Returns a string. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, October 6, 2005 
  */

code: |
 function isPostalCodeDK(str) {
     // The first numeric of the postal codes cannot start with 0
     return REFind("^[D-d][K-k]( |-)?[1-9]{1}[[:digit:]]{3}$", arguments.str) gte 1;
 }

oldId: 1315
---

