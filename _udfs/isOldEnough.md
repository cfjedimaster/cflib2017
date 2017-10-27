---
layout: udf
title:  isOldEnough
date:   2004-01-02T17:13:12.000Z
library: DateLib
argString: "dob, minAge"
author: Paul Malan
authorEmail: paul@malan.org
version: 1
cfVersion: CF5
shortDescription: Determine whether a date of birth exceeds minimum age requirement.
tagBased: false
description: |
 Given a date of birth, determine whether a user is old enough to satisfy an arbitrary minimum age requirement.  Accurate down to the day.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 isOldEnough('5/27/1977',18): #isOldEnough('5/27/1977',18)#<br>
 isOldEnough('1/30/1995',13): #isOldEnough('1/30/1995',13)#
 </cfoutput>

args:
 - name: dob
   desc: Date of birth.
   req: true
 - name: minAge
   desc: Age in years.
   req: true


javaDoc: |
 /**
  * Determine whether a date of birth exceeds minimum age requirement.
  * 
  * @param dob      Date of birth. (Required)
  * @param minAge      Age in years. (Required)
  * @return Returns a boolean. 
  * @author Paul Malan (paul@malan.org) 
  * @version 1, January 2, 2004 
  */

code: |
 function isOldEnough(dob,minAge) {
     var goldenDate = dateAdd('yyyy', -minAge, now());
     if (datecompare(goldenDate,dob) gt 0) return true;
     else return false;
 }

oldId: 985
---

