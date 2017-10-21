---
layout: udf
title:  CounterMinusMinus
date:   2002-04-19T10:07:21.000Z
library: DataManipulationLib
argString: "[intCounter]"
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Simulate the c functionality of i--.
description: |
 Simulate the c functionality of i--. Decrements a counter and returns the value of the counter before it was decremeted.

returnValue: Returns the value of the variable BEFORE it has been decremented.

example: |
 <cfset i=2>
 <cfset aArray = arrayNew(1)>
 <cfset aArray[counterMinusMinus("i")]="Hans">
 <cfset aArray[counterMinusMinus("i")]="Otto">
 
 <cfoutput>
 #i#
 </cfoutput>

args:
 - name: intCounter
   desc: The name, not the value, of the variable to be decremented.
   req: false


javaDoc: |
 /**
  * Simulate the c functionality of i--.
  * 
  * @param intCounter      The name, not the value, of the variable to be decremented. 
  * @return Returns the value of the variable BEFORE it has been decremented. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1, April 19, 2002 
  */

code: |
 function counterMinusMinus(intCounter) {    
     var temp = evaluate(intCounter);
     "#intCounter#" = temp - 1;
     return temp;
 }

---

