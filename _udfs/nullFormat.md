---
layout: udf
title:  nullFormat
date:   2006-04-07T11:46:20.000Z
library: UtilityLib
argString: "expression"
author: Mike Tangorre
authorEmail: mtangorre@cfcoder.com
version: 1
cfVersion: CF5
shortDescription: A convenience function to determine if an expression evaluates to true or false.
description: |
 I use this in tags such as cfqueryparam when I need to determine if an expression evaluates to true or false. While this is certainly NOT needed as you can use YesNoFormat and plain old # signs with the expression between, it does make the intent more clear.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 
 <cfset q = -9 />
 <cfset r = 1 />
 <cfset x = 5 />
 <cfset y = 2 />
 <cfset z = 0 />
 #nullFormat(x gt y)#<br> 
 #nullFormat(x lt y)#<br>
 #nullFormat(x eq y)#<br>
 #nullFormat(x)#<br>
 #nullFormat(y)#<br>
 #nullFormat(z)#<br>
 #nullFormat(q)#<br>
 #nullFormat(r)#<br>
 #nullFormat(x * z + y)#
 
 </cfoutput>

args:
 - name: expression
   desc: Expression to evaluate.
   req: true


javaDoc: |
 /**
  * A convenience function to determine if an expression evaluates to true or false.
  * 
  * @param expression      Expression to evaluate. (Required)
  * @return Returns a boolean. 
  * @author Mike Tangorre (mtangorre@cfcoder.com) 
  * @version 1, April 7, 2006 
  */

code: |
 function nullFormat(expression) {
    if (expression) return true;
    return false;
 }

---

