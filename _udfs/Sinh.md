---
layout: udf
title:  Sinh
date:   2001-10-09T15:39:34.000Z
library: MathLib
argString: "x"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the hyberbolic sine of an angle.
description: |
 Returns the hyberbolic sine of an angle.  All angles are expressed in radians.

returnValue: Returns a numeric value.

example: |
 <CFSET x=Pi()/2>
   <CFOUTPUT>
   Given x=#x#<BR>
   The Sinh of #x# radians is: #Sinh(x)#
   </CFOUTPUT>

args:
 - name: x
   desc: Any angle measured in radians.
   req: true


javaDoc: |
 /**
  * Returns the hyberbolic sine of an angle.
  * 
  * @param x      Any angle measured in radians. 
  * @return Returns a numeric value. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function Sinh(x){
   Return((Exp(x) - Exp(-x)) / 2);
 }

---

