---
layout: udf
title:  intervalRound
date:   2005-07-21T02:59:11.000Z
library: MathLib
argString: "nNumber, nInterval[, bOption]"
author: Rob Rusher
authorEmail: rob@robrusher.com
version: 1
cfVersion: CF5
shortDescription: Rounds any real number to a user specified interval.
description: |
 As an alternative to traditional rounding, this UDF allows you to set the round interval for a number. So with an interval set to 25, the number would round to 0, 25, 50,...

returnValue: Returns a number.

example: |
 <cfoutput>
 IntervalRound(83,25): #IntervalRound(83,25)#
 IntervalRound(149,75,0): #IntervalRound(149,75,0)#
 IntervalRound(149,75,1): #IntervalRound(149,75,1)#
 </cfoutput>

args:
 - name: nNumber
   desc: The number to round.
   req: true
 - name: nInterval
   desc: The number to round to.
   req: true
 - name: bOption
   desc: Used to calculate percentage for rounding.
   req: false


javaDoc: |
 /**
  * Rounds any real number to a user specified interval.
  * 
  * @param nNumber      The number to round. (Required)
  * @param nInterval      The number to round to. (Required)
  * @param bOption      Used to calculate percentage for rounding. (Optional)
  * @return Returns a number. 
  * @author Rob Rusher (rob@robrusher.com) 
  * @version 1, July 20, 2005 
  */

code: |
 function intervalRound(nNumber, nInterval){
     var nMultipler = fix(nNumber / nInterval); // How many times does the interval go into intNumber
     var bOption = 0;
 
     if(arrayLen(arguments) GTE 3 AND arguments[3])
         if(((nNumber mod nInterval) / nInterval) gte .5) bOption = 1; // Calculate percentage for rounding option.
 
     return (nInterval * nMultipler) + (bOption * nInterval);
 }

---

