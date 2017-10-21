---
layout: udf
title:  Asech
date:   2001-10-16T14:42:16.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse hyperbolic secant of a value.
description: |
 Returns the inverse hyperbolic secant of a value.  All angles are expressed in radians.

returnValue: Returns a numeric value or string.

example: |
 <CFSET x=1>
 <CFSET y=2>
 <CFOUTPUT>
 Given x=#x#:<BR>
 Given y=#y#<BR>
 Asech(x)=#Asech(x)#<BR>
 Asech(y)=#Asech(y)#<BR>
 </CFOUTPUT>

args:
 - name: x
   desc: 0 < x <= 1
   req: true


javaDoc: |
 /**
  * Returns the inverse hyperbolic secant of a value.
  * 
  * @param x      0 < x <= 1 
  * @return Returns a numeric value or string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 16, 2001 
  */

code: |
 function Asech(x){
   if (x lte 0)
     return "undefined";
   else 
     if (x gt 1)
       return "undefined";
   else
     return Log((Sqr(-x*x+1)+1)/x);
 }

---

