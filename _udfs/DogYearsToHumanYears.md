---
layout: udf
title:  DogYearsToHumanYears
date:   2002-02-14T12:08:28.000Z
library: UtilityLib
argString: "age"
author: David Fekke
authorEmail: david@fekke.com
version: 1
cfVersion: CF5
shortDescription: This UDF translates a dogs age to a humans age.
tagBased: false
description: |
 This function translates a dogs age to human years. This function is merely an approximation and does not take into effect such factors as the dogs breed or size.

returnValue: 

example: |
 <cfset dog1 = 2>
 <cfset dog2 = 5>
 <cfset dog3 = 10>
 <cfset dog4 = 12>
 
 <cfoutput>
 Dog 1 is #dog1# years old which is #DogYearsToHumanYears(dog1)# in human years.<br>
 Dog 2 is #dog2# years old which is #DogYearsToHumanYears(dog2)# in human years.<br>
 Dog 3 is #dog3# years old which is #DogYearsToHumanYears(dog3)# in human years.<br>
 Dog 4 is #dog4# years old which is #DogYearsToHumanYears(dog4)# in human years.<br>
 </cfoutput>

args:
 - name: age
   desc: The age of the dog.
   req: true


javaDoc: |
 /**
  * This UDF translates a dogs age to a humans age.
  * 
  * @param age      The age of the dog. 
  * @author David Fekke (david@fekke.com) 
  * @version 1, February 14, 2002 
  */

code: |
 function DogYearsToHumanYears(DogAge) {
  return ((DogAge - 1)* 7) + 9;
 }

---

