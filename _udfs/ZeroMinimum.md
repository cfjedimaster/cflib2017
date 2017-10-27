---
layout: udf
title:  ZeroMinimum
date:   2002-01-10T19:00:42.000Z
library: MathLib
argString: "x"
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF5
shortDescription: Returns zero if the value passed into ZeroMinimum() is less than zero.
tagBased: false
description: |
 Returns zero if the value passed into NotLessThanZero() is less than zero. If the input value is greater than zero, the iput value is returned.

returnValue: Returns a numeric value.

example: |
 <CFOUTPUT>
 ZeroMinimum(9): #ZeroMinimum(9)#<BR>
 ZeroMinimum(0): #ZeroMinimum(0)#<BR>
 ZeroMinimum(-7): #ZeroMinimum(-7)#
 </CFOUTPUT>

args:
 - name: x
   desc: Value you want to ensure is greater than or equal to zero.
   req: true


javaDoc: |
 /**
  * Returns zero if the value passed into ZeroMinimum() is less than zero.
  * 
  * @param x      Value you want to ensure is greater than or equal to zero. 
  * @return Returns a numeric value. 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, January 10, 2002 
  */

code: |
 function ZeroMinimum(x){      
   return max(x,0);
 }

oldId: 457
---

