---
layout: udf
title:  MinusMinusCounter
date:   2002-04-17T17:43:28.000Z
library: DataManipulationLib
argString: "intCounter"
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Simulate the c functionality of --i.
description: |
 Simulate the c functionality of --i. Decrements a counter and returns the dencremented counter.

returnValue: Returns the value of the variable after it has been decremented.

example: |
 <cfset i=3>
 <cfset aArray = arrayNew(1)>
 <cfset aArray[minusMinusCounter("i")]="Hans">
 <cfset aArray[minusMinusCounter("i")]="Otto">
 
 <cfoutput>
 #i#
 </cfoutput>

args:
 - name: intCounter
   desc: The name, not the value, of the variable to be decremented.
   req: true


javaDoc: |
 /**
  * Simulate the c functionality of --i.
  * 
  * @param intCounter      The name, not the value, of the variable to be decremented. 
  * @return Returns the value of the variable after it has been decremented. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1, April 17, 2002 
  */

code: |
 function minusMinusCounter(intCounter){
     "#intCounter#" = evaluate(intCounter) - 1;
     return evaluate(intCounter);
 }

---

