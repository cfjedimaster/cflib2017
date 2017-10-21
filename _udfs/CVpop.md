---
layout: udf
title:  CVpop
date:   2001-07-18T12:26:26.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the coefficient of variation for a set of values (entire population).
description: |
 Returns the coefficient of variation for a set of values (entire population). The CV is a measure of relative dispersion and is calculated by dividing the standard deviation by
 the mean and multiplying the result by 100 to arrive at a percentage.

returnValue: Returns a simple value

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10"> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF>
   The coefficient of variation for the population is #CVpop(values)#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the coefficient of variation for a set of values (entire population).
  * Requires the StdDevPop() and Mean() functions from this library.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a simple value 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 18, 2001 
  */

code: |
 function CVpop(values)
 {
   Return ((StdDevPop(values)/Mean(values))*100);
 }

---

