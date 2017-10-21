---
layout: udf
title:  Acsch
date:   2001-10-09T17:01:49.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse hyperbolic cosecant of an angle.
description: |
 Returns the inverse hyperbolic cosecant of an angle.  If angle is 0, returns "undefined".  All angles are expressed in radians.

returnValue: Returns a numeric value or string.

example: |
 <CFSET x=(Pi()/2)>
 <CFOUTPUT>
 Given x=#x#<BR>
 The Acsch of #x# radians is: #Acsch(x)#
 </CFOUTPUT>

args:
 - name: x
   desc: Any angle expressed in radians.
   req: true


javaDoc: |
 /**
  * Returns the inverse hyperbolic cosecant of an angle.
  * 
  * @param x      Any angle expressed in radians. 
  * @return Returns a numeric value or string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, October 9, 2001 
  */

code: |
 function Acsch(x){
   if (x EQ 0)
     return "undefined";
   else 
     return Log((Sgn(x)*Sqr(x*x+1)+1)/x);
 }

---

