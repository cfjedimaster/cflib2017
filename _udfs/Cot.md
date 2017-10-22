---
layout: udf
title:  Cot
date:   2001-10-09T16:17:13.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the Cotangent of an angle.
tagBased: false
description: |
 Returns the Cotangent of an angle.  If angle is 0, returns "undefined".  All angles are expressed in radians.

returnValue: Returns a numeric value or string.

example: |
 <CFSET x=(Pi()/2)>
   <CFOUTPUT>
   Given x=1<BR>
   The cotangent of #x# radians is: #Cot(x)#.
   </CFOUTPUT>

args:
 - name: x
   desc: Any angle in radians.
   req: true


javaDoc: |
 /**
  * Returns the Cotangent of an angle.
  * 
  * @param x      Any angle in radians. 
  * @return Returns a numeric value or string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function Cot(x){
   if (x EQ 0)
     return "undefined";
   else 
     return 1/Tan(x);
 }

---

