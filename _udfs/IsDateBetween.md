---
layout: udf
title:  IsDateBetween
date:   2001-11-29T16:33:52.000Z
library: DateLib
argString: "dateObj , dateObj1, dateObj2"
author: Bill King
authorEmail: bking@hostworks.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the date provided in the first argument lies between the two dates in the second and third arguments.
description: |
 Returns True if the date provided in the first argument lies between the two dates in the second and third arguments.

returnValue: Returns a Boolean.

example: |
 <CFOUTPUT>
 IS Today IN November of 2001? #IsDateBetween(Now(),"11/1/01","11/30/01")#
 </CFOUTPUT>

args:
 - name: dateObj 
   desc: CF Date Object you want to test.
   req: true
 - name: dateObj1
   desc: CF Date Object for the starting date.
   req: true
 - name: dateObj2
   desc: CF Date Object for the ending date.
   req: true


javaDoc: |
 /**
  * Returns True if the date provided in the first argument lies between the two dates in the second and third arguments.
  * 
  * @param dateObj       CF Date Object you want to test. 
  * @param dateObj1      CF Date Object for the starting date. 
  * @param dateObj2      CF Date Object for the ending date. 
  * @return Returns a Boolean. 
  * @author Bill King (bking@hostworks.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function IsDateBetween(dateObj, dateCompared1, dateCompared2)
 {
  return YesNoFormat((DateCompare(dateObj, dateCompared1) gt -1) AND (DateCompare(dateObj, dateCompared2) lt 1));
 }

---

