---
layout: udf
title:  nthPercentile
date:   2013-07-08T08:33:03.000Z
library: CFMLLib
argString: "population, percentile"
author: rodell basalo
authorEmail: delroekid@gmail.com
version: 1
cfVersion: CF9
shortDescription: Gets the nth percentile of the given population
tagBased: false
description: |
 Reference: http://en.wikipedia.org/wiki/95th_percentile

returnValue: Returns a numeric value that is the value from the population that is the specified percentile

example: |
 <!---get the 90th %tile--->
 <cfset pop = [1,2,6,7,3,5,6,8,0,2,3,4,5,9,12,23,78]>
 
 <cfset nthPercentile = getNthPercentile(pop,90)>
 
 <cfoutput>#nthPercentile#</cfoutput>

args:
 - name: population
   desc: An array of population values
   req: true
 - name: percentile
   desc: The percentile to return value for
   req: true


javaDoc: |
 /**
  * Gets the nth percentile of the given population
  * v0.9 by rodell basalo
  * v1.0 by Adam Cameron (improved argument/variable naming, simplified logic slightly)
  * 
  * @param population      An array of population values (Required)
  * @param percentile      The percentile to return value for (Required)
  * @return Returns a numeric value that is the value from the population that is the specified percentile 
  * @author rodell basalo (delroekid@gmail.com) 
  * @version 1.0, July 8, 2013 
  */

code: |
 public numeric function getNthPercentile(required array population, required numeric percentile){
     if (percentile < 0 || percentile > 100){
         throw(type="ArgumentOutOfRangeException", message="percentile argument value out of range", detail="The percentile argument must be in the range 1-100")
     }
     arraySort(population, "numeric");
 
     var populationSize = arrayLen(population);
     var nthPercentIndex = round((percentile/100) * populationSize + 0.5);
 
     return population[min(nthPercentIndex, populationSize)];
 }

---

