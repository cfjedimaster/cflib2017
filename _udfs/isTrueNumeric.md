---
layout: udf
title:  isTrueNumeric
date:   2005-08-18T14:34:48.000Z
library: StrLib
argString: "str"
author: Tomas Becklin
authorEmail: tomasbecklin@gmail.com
version: 2
cfVersion: CF5
shortDescription: Returns true if all characters in a string are numeric.
tagBased: false
description: |
 Verifies each characters in a string to be numeric. The existing isNumeric() function accepts e (express scientific notation) and d (denote double precision) as numeric characters and will return true/yes.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 isTrueNumeric():<br>
 333e3: #isTrueNumeric('333e3')#<br>
 333d3: #isTrueNumeric('333d3')#<br>
 33333: #isTrueNumeric('33333')#<br><br>
 isNumeric():<br>
 333e3: #isNumeric('333e3')#<br>
 333d3: #isNumeric('333d3')#<br>
 33333: #isNumeric('33333')#
 </cfoutput>

args:
 - name: str
   desc: Value to check.
   req: true


javaDoc: |
 /**
  * Returns true if all characters in a string are numeric.
  * Version 2 by Raymond Camden
  * 
  * @param str      Value to check. (Required)
  * @return Returns a boolean. 
  * @author Tomas Becklin (tomasbecklin@gmail.com) 
  * @version 2, August 18, 2005 
  */

code: |
 function isTrueNumeric(str) {
     return reFind("[^0-9]", str) is 0;
 }

oldId: 1283
---

