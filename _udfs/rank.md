---
layout: udf
title:  rank
date:   2008-12-04T12:53:02.000Z
library: MathLib
argString: "value, set"
author: Scott Fitchet
authorEmail: scott@figital.com
version: 1
cfVersion: CF5
shortDescription: Ranks a number within a set.
tagBased: false
description: |
 Data validation and exception handling have been purposely
 omitted for speed. If you are not using the latest version of ColdFusion or Railo you might need to change &quot;i++&quot; to &quot;i = i + 1&quot;.

returnValue: Returns a number.

example: |
 rank(3, "2,300,1,3,1")

args:
 - name: value
   desc: Value to rank.
   req: true
 - name: set
   desc: List of numbers.
   req: true


javaDoc: |
 /**
  * Ranks a number within a set.
  * 
  * @param value      Value to rank. (Required)
  * @param set      List of numbers. (Required)
  * @return Returns a number. 
  * @author Scott Fitchet (scott@figital.com) 
  * @version 1, December 4, 2008 
  */

code: |
 function rank(value, set) {
 
     // Assume the value is in first place
     var ranking = 1;
     var i = 1;
 
     // Loop over each value in the set
     for (i = 1; i lte listlen(set); i=i+1 ) {
         // If this value in the set is greater, decrease the ordinal
         if ( listgetat(set, i) gt value ) ranking=ranking+1;
     }
     
     return ranking;
 }

---

