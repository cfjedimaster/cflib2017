---
layout: udf
title:  getRange
date:   2013-07-25T08:19:16.000Z
library: CFMLLib
argString: "samples"
author: Rodell Basalo
authorEmail: delroekid@gmail.com
version: 1
cfVersion: CF9
shortDescription: Gets the difference between the largest and smallest values in a given data set (statistics)
tagBased: false
description: |
 STATISTICS -  The range is the size of the smallest interval which contains all the data and provides an indication of statistical dispersion. It is measured in the same units as the data. Since it only depends on two of the observations, it is most useful in representing the dispersion of small data sets.

returnValue: Returns a numeric value that is the range of the samples

example: |
 <cfset samples = [1,2,3,4,5,6,1,2,4,45,5,6,89,7,7,8,12,8,99,7,7,8,8,8]>
 <cfset range = getRange(samples)>
 <cfoutput>#range#</cfoutput>

args:
 - name: samples
   desc: Array of values to return range for
   req: true


javaDoc: |
 /**
  * Gets the difference between the largest and smallest values in a given data set (statistics)
  * v0.9 by Rodell Basalo
  * v1.0 by Adam Cameron (simplified logic)
  * 
  * @param samples      Array of values to return range for (Required)
  * @return Returns a numeric value that is the range of the samples 
  * @author Rodell Basalo (delroekid@gmail.com) 
  * @version 1.0, July 25, 2013 
  */

code: |
 numeric function getRange(required array samples){
     if (arrayIsEmpty(arguments.samples)){
         throw(type="IllegalArgumentException", message="sample argument is empty", detail="The sample array must contain at least one element");
     }
     return arrayMax(arguments.samples) - arrayMin(arguments.samples);
 }

oldId: 2257
---

