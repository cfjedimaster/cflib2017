---
layout: udf
title:  LogN
date:   2001-10-09T14:13:38.000Z
library: MathLib
argString: "value, base"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the logarithm of a value to the specified base.
description: |
 Returns the logarithm of a value to the specified base.

returnValue: Returns a simpe value.

example: |
 <CFSET n=8>
   <CFSET b=2>
   <CFOUTPUT>
   Given n=8
   Given b=2
   The LogN of #n# to the base #b# is: #LogN(n, b)#
   </CFOUTPUT>

args:
 - name: value
   desc: real number > 0.
   req: true
 - name: base
   desc: real number > 0.
   req: true


javaDoc: |
 /**
  * Returns the logarithm of a value to the specified base.
  * 
  * @param value      real number > 0. 
  * @param base      real number > 0. 
  * @return Returns a simpe value. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function LogN(x, b)
 {
   if (x GT 0)
       Return(Log(x) / Log(b));
   else
       Return("undefined");
 }

---

