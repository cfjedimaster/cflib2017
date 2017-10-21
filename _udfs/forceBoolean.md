---
layout: udf
title:  forceBoolean
date:   2010-09-05T15:30:56.000Z
library: UtilityLib
argString: "bool"
author: Alan McCollough
authorEmail: amccollough@anthc.org
version: 1
cfVersion: CF5
shortDescription: Returns a boolean 1/0 from anything, including empty strings.
description: |
 You pass in a variable, and I will return either a &quot;1&quot; if it evaluates to true, or a &quot;0&quot; if it is not a boolean (as in an empty string or any other non-boolean) or evaluates to false.

returnValue: Returns a boolean.

example: |
 <cfset i="">
 <cfif i></cfif> returns error.
 <ciff forceBoolean(i)></cfif> works.
 #forceBoolean(i)# returns "0".

args:
 - name: bool
   desc: Value to check.
   req: true


javaDoc: |
 /**
  * Returns a boolean 1/0 from anything, including empty strings.
  * 
  * @param bool      Value to check. (Required)
  * @return Returns a boolean. 
  * @author Alan McCollough (amccollough@anthc.org) 
  * @version 1, September 5, 2010 
  */

code: |
 function forceBoolean(bool){
   if(isBoolean(bool) AND bool IS TRUE)
      return "1";
   else
      return "0";
 }

---

