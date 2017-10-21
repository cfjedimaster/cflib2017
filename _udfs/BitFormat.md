---
layout: udf
title:  BitFormat
date:   2007-08-14T15:11:26.000Z
library: StrLib
argString: "num"
author: Trevor Orr
authorEmail: fractorr@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Format a value as 1 or 0.
description: |
 Format a value as 1 or 0.

returnValue: Returns a number.

example: |
 <cfoutput>
     1 = #BitFormat("1")#<br />
     0 = #BitFormat("0")#<br />
     x = #BitFormat("x")#<br />
     space = #BitFormat(" ")#<br />
     1+space = #BitFormat("1 ")#<br />
     2+space = #BitFormat("1 ")#<br />
 </cfoutput>

args:
 - name: num
   desc: Value to format.
   req: true


javaDoc: |
 /**
  * Format a value as 1 or 0.
  * 
  * @param num      Value to format. (Required)
  * @return Returns a number. 
  * @author Trevor Orr (fractorr@yahoo.com) 
  * @version 1, August 14, 2007 
  */

code: |
 function BitFormat(num) {
     return (IIF(IsNumeric(Trim(arguments.num)) AND Trim(arguments.num) NEQ 0, 1, 0));
 }

---

