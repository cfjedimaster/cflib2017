---
layout: udf
title:  Sech
date:   2001-10-09T15:52:53.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the hyperbolic secant of an angle.
description: |
 Returns the hyperbolic secant of an angle.  All angles are expressed in radians.

returnValue: Returns a numeric value.

example: |
 <CFSET x=Pi()/2>
 <CFOUTPUT>
 Given x=#x#<BR>
 The Sech of #x# radians is: #Sech(x)#
 </CFOUTPUT>

args:
 - name: x
   desc: Any angle expressed in radians.
   req: true


javaDoc: |
 /**
  * Returns the hyperbolic secant of an angle.
  * 
  * @param x      Any angle expressed in radians. 
  * @return Returns a numeric value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, October 9, 2001 
  */

code: |
 function Sech(x){
   return 2/(Exp(X)+Exp(-x));
 }

---

