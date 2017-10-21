---
layout: udf
title:  Csc
date:   2001-10-09T16:07:28.000Z
library: MathLib
argString: "angle"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the cosecant of an angle.
description: |
 Returns the cosecant of an angle.  If angle is 0, returns "undefined".  All angles are expressed in radians.

returnValue: Returns a numeric value.

example: |
 <CFSET x=(Pi()/2)>
 <CFOUTPUT>
 Given x=#x#<BR>
 The Csc of #x# radians is: #Csc(x)#
 </CFOUTPUT>

args:
 - name: angle
   desc: Any angle measured in radians.
   req: true


javaDoc: |
 /**
  * Returns the cosecant of an angle.
  * 
  * @param angle      Any angle measured in radians. 
  * @return Returns a numeric value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function Csc(x){
   if (x EQ 0)
     return "undefined";
   else 
     return 1/sin(x);
 }

---

