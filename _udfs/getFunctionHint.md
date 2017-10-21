---
layout: udf
title:  getFunctionHint
date:   2010-07-01T22:43:24.000Z
library: UtilityLib
argString: "somefunction"
author: Alan McCollough
authorEmail: amccollough@anthc.org
version: 0
cfVersion: CF6
shortDescription: You give me a function and I return the hint. Useful for demo and documentation pages.
description: |
 Let's say you have a CFC, with a public function. You have populated the hint attribute for that functions so that it is self-documenting.
 Now you are working on a demo page and want to display the hint for that function. This getFunctionHint() UDF makes it easy. Note: This does not work for private-access functions.

returnValue: Returns a string.

example: |
 If you have a cfc "foo" with a function "bar()", to get the hint, use this syntax: #getFunctionHint(foo.bar)#

args:
 - name: somefunction
   desc: A CFC method or UDF.
   req: true


javaDoc: |
 /**
  * You give me a function and I return the hint. Useful for demo and documentation pages.
  * v2 modded by RCamden to support the lack of a hint
  * 
  * @param somefunction      A CFC method or UDF. (Required)
  * @return Returns a string. 
  * @author Alan McCollough (amccollough@anthc.org) 
  * @version 0, July 1, 2010 
  */

code: |
 function getFunctionHint(somefunction){
     if(structKeyExists(somefunction.metadata, "hint")) return deserializeJSON(serializeJSON(somefunction.metadata.hint));
     return "";
 }

---

