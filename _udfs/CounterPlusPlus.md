---
layout: udf
title:  CounterPlusPlus
date:   2002-04-17T17:40:57.000Z
library: DataManipulationLib
argString: "intCounter"
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Simulate the c functionality of i++.
tagBased: false
description: |
 Simulate the c functionality of i++. Increments a counter and returns the value of the counter before it was incremeted.

returnValue: Returns the value of the variable BEFORE it was incremented.

example: |
 <cfset i=1>
 <cfset aArray = arrayNew(1)>
 <cfset aArray[counterPlusPlus("i")]="Hans">
 <cfset aArray[counterPlusPlus("i")]="Otto">
 
 <cfoutput>
 #i#
 </cfoutput>

args:
 - name: intCounter
   desc: The name, not the value, of the variable to be incremented.
   req: true


javaDoc: |
 /**
  * Simulate the c functionality of i++.
  * 
  * @param intCounter      The name, not the value, of the variable to be incremented. 
  * @return Returns the value of the variable BEFORE it was incremented. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1, April 17, 2002 
  */

code: |
 function counterPlusPlus(intCounter){
     var temp = evaluate(intCounter);
     "#intCounter#" = temp + 1;
     return temp;
 }

---

