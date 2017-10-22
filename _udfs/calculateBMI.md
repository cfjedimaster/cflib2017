---
layout: udf
title:  calculateBMI
date:   2005-01-21T13:26:52.000Z
library: UtilityLib
argString: "weightlbs, heightinches"
author: Elyse Nielsen
authorEmail: Elyse@anticlue.net
version: 1
cfVersion: CF6
shortDescription: Calculates the Body Mass Index.
tagBased: true
description: |
 This function calculates the Body Mass Index based on Lbs and Inches.
 
 It receives 2 numeric arguments, one for weight in pounds, and another for height in inches.

returnValue: Returns a number.

example: |
 <cfset bmi = calculateBMI(140, 72)>
 <cfoutput>#bmi#</cfoutput>

args:
 - name: weightlbs
   desc: Weight in pounds.
   req: true
 - name: heightinches
   desc: Height in inches.
   req: true


javaDoc: |
 <!---
  Calculates the Body Mass Index.
  
  @param weightlbs      Weight in pounds. (Required)
  @param heightinches      Height in inches. (Required)
  @return Returns a number. 
  @author Elyse Nielsen (Elyse@anticlue.net) 
  @version 1, April 14, 2005 
 --->

code: |
 <cffunction name="calculateBMI" returntype="numeric" hint="This function calculates an individuals Body Mass Index">
     <cfargument name="WeightLbs" type="numeric" required="yes" hint="The person's weight in pounds">
     <cfargument name="HeightInches" type="numeric" required="yes" hint="The person's height in inches">
     <cfset var HI2 = "">
     <cfset var WHI = "">
     <cfset var BMI = "">
     <cfset HI2 = HeightInches * HeightInches>
     <cfset WHI = WeightLbs / HI2>
     <cfset BMI = WHI * 703>
     <cfreturn decimalFormat(BMI)>
 </cffunction>

---

