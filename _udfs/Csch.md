---
layout: udf
title:  Csch
date:   2001-10-09T17:04:49.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the hyperbolic cosecant of an angle.
description: |
 Returns the hyperbolic cosecant of an angle.  If angle is 0, returns "undefined".  All angles are expressed in radians.

returnValue: Returns a numeric value or string.

example: |
 <CFSET x=(Pi()/2)>
 <CFOUTPUT>
 Given x=#x#<BR>
 The Csch of #x# radians is: #Csch(x)#
 </CFOUTPUT>

args:
 - name: x
   desc: Any angle expressed in radians.
   req: true


javaDoc: |
 /**
  * Returns the hyperbolic cosecant of an angle.
  * 
  * @param x      Any angle expressed in radians. 
  * @return Returns a numeric value or string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function Csch(x){
   if (x EQ 0)
     return "undefined";
   else 
     return 2/(Exp(x)-Exp(-x));
 }

---

