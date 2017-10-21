---
layout: udf
title:  Coth
date:   2001-10-09T16:58:54.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the hyperbolic cotangent of an angle.
description: |
 Returns the hyperbolic cotangent of an angle.  All angles are expressed in radians.

returnValue: Returns a numeric value.

example: |
 <CFSET x=(Pi()/2)>
 <CFOUTPUT>
 Given x=#x#<BR>
 The Coth of #x# radians is: #Coth(x)#
 </CFOUTPUT>

args:
 - name: x
   desc: Any angle in radians.
   req: true


javaDoc: |
 /**
  * Returns the hyperbolic cotangent of an angle.
  * 
  * @param x      Any angle in radians. 
  * @return Returns a numeric value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function Coth(x){
     return Exp(-x)/(Exp(x)-Exp(-x))*2+1;
 }

---

