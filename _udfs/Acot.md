---
layout: udf
title:  Acot
date:   2001-11-29T14:38:21.000Z
library: MathLib
argString: "x"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse cotangent of a value.
tagBased: false
description: |
 Returns the inverse cotangent of a value.  All angles are expressed in radians.

returnValue: Returns an angle in radians.

example: |
 <CFSET x=1>
 
 <CFOUTPUT>
 Given x=#x#:<BR>
 Acot=#Acot(x)#
 </CFOUTPUT>

args:
 - name: x
   desc: Any real number.
   req: true


javaDoc: |
 /**
  * Returns the inverse cotangent of a value.
  * 
  * @param x      Any real number. 
  * @return Returns an angle in radians. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function Acot(x){
     return -Atn(x)+1.570796;
 }

oldId: 310
---

