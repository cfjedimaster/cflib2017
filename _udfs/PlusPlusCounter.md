---
layout: udf
title:  PlusPlusCounter
date:   2002-04-17T17:33:02.000Z
library: DataManipulationLib
argString: "intCounter"
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Simulate the c functionality of ++i.
description: |
 Simulate the c functionality of ++i. Increments a counter and returns the increment counter.

returnValue: Returns the value of the variable after it has been incremented.

example: |
 <cfset i=0>
 <cfset aArray = arrayNew(1)>
 <cfset aArray[plusPlusCounter("i")]="Hans">
 <cfset aArray[plusPlusCounter("i")]="Otto">
 
 <cfoutput>
 #i#
 </cfoutput>

args:
 - name: intCounter
   desc: The name, not the value, of the variable to be incremented.
   req: true


javaDoc: |
 /**
  * Simulate the c functionality of ++i.
  * 
  * @param intCounter      The name, not the value, of the variable to be incremented. 
  * @return Returns the value of the variable after it has been incremented. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1, April 17, 2002 
  */

code: |
 function plusPlusCounter(intCounter) {
     "#intCounter#" = evaluate(intCounter) + 1;
     return evaluate(intCounter);
 }

---

