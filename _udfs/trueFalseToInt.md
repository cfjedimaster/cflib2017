---
layout: udf
title:  trueFalseToInt
date:   2004-08-06T09:57:52.000Z
library: UtilityLib
argString: "value"
author: Cory Toth
authorEmail: ctoth@tmctech.com
version: 1
cfVersion: CF5
shortDescription: Simple function to format a true / false value to an integer (true=1, false=0).
description: |
 Simple function to format a true / false value to an integer (true=1, false=0). 
 All Values passed to function that are not equal to &quot;true&quot; will be return 0

returnValue: Returns an integer.

example: |
 <cfoutput>
 #trueFalseToInt("true")#
 </cfoutput>

args:
 - name: value
   desc: Value to check.
   req: true


javaDoc: |
 /**
  * Simple function to format a true / false value to an integer (true=1, false=0).
  * 
  * @param value      Value to check. (Required)
  * @return Returns an integer. 
  * @author Cory Toth (ctoth@tmctech.com) 
  * @version 1, August 6, 2004 
  */

code: |
 function trueFalseToInt(value){
     return iif(value, 1, 0);
 }

---

