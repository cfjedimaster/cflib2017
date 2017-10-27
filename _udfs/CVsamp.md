---
layout: udf
title:  CVsamp
date:   2001-07-18T13:01:13.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the coefficient of variation for a set of values (populaiton sample).
tagBased: false
description: |
 Returns the coefficient of variation for a set of values (populaiton sample).  The CV is a measure of relative dispersion and is calculated by dividing the standard deviation by the mean and multiplying the result by 100 to arrive at a percentage.

returnValue: Returns a simple value.

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10"> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF>
   The coefficient of variation for the population sample is #CVsamp(values)#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the coefficient of variation for a set of values (populaiton sample).
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function CVsamp(values)
 {
   Return ((StdDevSamp(values)/Mean(values))*100);
 }

oldId: 59
---

