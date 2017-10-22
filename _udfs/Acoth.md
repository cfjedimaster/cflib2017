---
layout: udf
title:  Acoth
date:   2001-11-29T14:38:58.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse hyperbolic cotangent of a value.
tagBased: false
description: |
 Returns the inverse hyperbolic cotangent of a value.  All angles are expressed in radians.

returnValue: Returns a numeric value or string.

example: |
 <CFSET x=1.5>
 <CFSET y=0>
 <CFSET z=-1.5>
 <CFOUTPUT>
 Given x=#x#<BR>
 Given y=#y#<BR>
 Given z=#z#<BR>
 The Acoth of #x# is: #Acoth(x)# radians<BR>
 The Acoth of #y# is: #Acoth(y)# radians<BR>
 The Acoth of #z# is: #Acoth(z)# radians<BR>
 </CFOUTPUT>

args:
 - name: x
   desc: x>1, x<-1
   req: true


javaDoc: |
 /**
  * Returns the inverse hyperbolic cotangent of a value.
  * 
  * @param x      x>1, x<-1 
  * @return Returns a numeric value or string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function Acoth(x){
   if (x lt -1)
     return Log((x+1)/(x-1))/2;
   else
     if (x gt 1)
       return Log((x+1)/(x-1))/2;
   else
     return "undefined";
 }

---

