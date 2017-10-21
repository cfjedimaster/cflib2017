---
layout: udf
title:  Asec
date:   2001-11-29T14:43:08.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse secant of an angle.
description: |
 Returns the inverse secant of an angle.  Returns the string "undefined" if zero (0) is passed.  All angles are expressed in radians.

returnValue: Returns a numeric value or string.

example: |
 <CFSET x=(Pi()/2)>
 
 <CFOUTPUT>
 Given x=#x#:<BR>
 Asec=#Asec(x)#
 </CFOUTPUT>

args:
 - name: x
   desc: Angle in radians.
   req: true


javaDoc: |
 /**
  * Returns the inverse secant of an angle.
  * 
  * @param x      Angle in radians. 
  * @return Returns a numeric value or string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function Asec(x){
   if (x eq 0)
     return "undefined";
   else
     return Atn(Sqr(x*x-1))+(Sgn(x)-1)*1.570796;
 }

---

