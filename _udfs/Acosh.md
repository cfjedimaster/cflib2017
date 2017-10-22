---
layout: udf
title:  Acosh
date:   2001-11-29T14:37:54.000Z
library: MathLib
argString: "x"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse hyperbolic cosine of a value.
tagBased: false
description: |
 Returns the inverse hyberbolic cosine of a value.  All angles are expressed in radians.

returnValue: Returns an angle in radians.

example: |
 <CFSET x=1.5>
   <CFOUTPUT>
   Given x=1.5<BR>
   The Acosh of #x# is: #Acosh(x)# radians
   </CFOUTPUT>

args:
 - name: x
   desc: Any real number.
   req: true


javaDoc: |
 /**
  * Returns the inverse hyperbolic cosine of a value.
  * 
  * @param x      Any real number. 
  * @return Returns an angle in radians. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function Acosh(x)
 {
   Var RetVal = 0;
   if (x LTE 1.0) 
     RetVal = 0.0;
   else if (x GTE 1.0e10) 
     RetVal = Log(2) + Log(x);
   else
     RetVal = Log(x + Sqr((x - 1.0) * (x + 1.0)));
   Return(RetVal);
 }

---

