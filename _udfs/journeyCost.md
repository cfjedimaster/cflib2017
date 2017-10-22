---
layout: udf
title:  journeyCost
date:   2010-10-08T14:42:50.000Z
library: UtilityLib
argString: "miles, mpg, ppl"
author: Dave Hill
authorEmail: write2dave@gmx.co.uk
version: 1
cfVersion: CF5
shortDescription: Calculates the cost of a car journey.
tagBased: false
description: |
 Calcualte the cost of a car journey based on miles traveled, your car's MPG and the cost of fulel per litre.  Defaults set to UK values.

returnValue: Returns a number.

example: |
 <cfoutput>#journeycost(240,43,110.9)#</cfoutput>

args:
 - name: miles
   desc: Miles traveled.
   req: true
 - name: mpg
   desc: Miles per gallon.
   req: true
 - name: ppl
   desc: Price per liter.
   req: true


javaDoc: |
 /**
  * Calculates the cost of a car journey.
  * 
  * @param miles      Miles traveled. (Required)
  * @param mpg      Miles per gallon. (Required)
  * @param ppl      Price per liter. (Required)
  * @return Returns a number. 
  * @author Dave Hill (write2dave@gmx.co.uk) 
  * @version 1, October 8, 2010 
  */

code: |
 function journeyCost(miles,mpg,ppl) {
     var litresInGallon = 4.54;
     var cost = ( miles / mpg ) * litresInGallon * ( ppl / 100 );
     return decimalFormat(cost);
 }

---

