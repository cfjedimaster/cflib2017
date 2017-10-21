---
layout: udf
title:  Sec
date:   2001-10-09T16:01:58.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the secant of an angle.
description: |
 Returns the Secant of an angle.  The secant of a 90 degree angle is infinity.  All angles are expressed in radians.

returnValue: Returns a numeric value or string.

example: |
 <CFSET x=0.785398163397>
 <CFSET y=90*(Pi()/180)>
 <CFOUTPUT>
   Given x=#x#<BR>
   Given y=#y#<BR>
   The Secant of #x# radians is: #Sec(x)#<BR>
   The Secant of #y# radians is: #Sec(y)#<BR>
   </CFOUTPUT>

args:
 - name: x
   desc: Any angle measured in radians.
   req: true


javaDoc: |
 /**
  * Returns the secant of an angle.
  * 
  * @param x      Any angle measured in radians. 
  * @return Returns a numeric value or string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function Sec(x)
 {
   if (x EQ 90*(Pi()/180)){
     return "infinity";
     }
   else {
     return 1/cos(x);
   }
 }

---

