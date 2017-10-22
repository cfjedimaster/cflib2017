---
layout: udf
title:  Atanh
date:   2001-11-29T14:58:26.000Z
library: MathLib
argString: "x"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the inverse hyberbolic tangent of a value.
tagBased: false
description: |
 Returns the inverse hyberbolic tangent of a value.  All angles are expressed in radians.

returnValue: Returns an angle in radians.

example: |
 <CFSET x=0.5>
   <CFOUTPUT>
   Given x=0.5<BR>
   The Atanh of #x# is: #Atanh(x)# radians
   </CFOUTPUT>

args:
 - name: x
   desc: Real number < 1.0
   req: true


javaDoc: |
 /**
  * Returns the inverse hyberbolic tangent of a value.
  * 
  * @param x      Real number < 1.0 
  * @return Returns an angle in radians. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function Atanh(x)
 {
   Var RetVal = 0;
   Var Neg = False;
   if (x LTE 1.0) 
     RetVal = 0.0;
   else
     if (x LT 0) 
           Neg = True;
     x = Abs(x);
     if (X GTE 1)
       RetVal = "overflow";
     else
       RetVal = 0.5 * Log(((2.0 * x) / (1.0 - x)) + 1);
     if (Neg) 
         RetVal = -RetVal;
   Return(RetVal);
 }

---

