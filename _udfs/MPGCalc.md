---
layout: udf
title:  MPGCalc
date:   2010-10-08T14:39:30.000Z
library: UtilityLib
argString: "journeyStart, journeyEnd, liters"
author: Dave Hill
authorEmail: write2dave@gmx.co.uk
version: 1
cfVersion: CF5
shortDescription: Calculate a vehicles Miles Per Gallon (MPG)
description: |
 Calculate the Miles Per Gallon (MPG) for your vehicle.  Defaults set to UK values.

returnValue: Returns a number.

example: |
 <cfoutput>
     Your MPG is #mpgcalc(4995,5235,25)#
 </cfoutput>

args:
 - name: journeyStart
   desc: Miles on odometer at start.
   req: true
 - name: journeyEnd
   desc: Miles on odometer at end.
   req: true
 - name: liters
   desc: Liters of gas consumed.
   req: true


javaDoc: |
 /**
  * Calculate a vehicles Miles Per Gallon (MPG)
  * 
  * @param journeyStart      Miles on odometer at start. (Required)
  * @param journeyEnd      Miles on odometer at end. (Required)
  * @param liters      Liters of gas consumed. (Required)
  * @return Returns a number. 
  * @author Dave Hill (write2dave@gmx.co.uk) 
  * @version 1, October 8, 2010 
  */

code: |
 function mpgcalc(journeyStart,journeyEnd,litres) {
     var litresInGallon = 4.54;
     
     var miles = journeyEnd - journeyStart;
     var gallons = litres/litresInGallon;
     var mpg = miles/gallons;
     return decimalFormat(mpg);
     
 }

---

