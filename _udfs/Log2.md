---
layout: udf
title:  Log2
date:   2001-10-09T14:13:24.000Z
library: MathLib
argString: "value"
author: Joel Cox
authorEmail: jlcox@goodyear.com
version: 1
cfVersion: CF5
shortDescription: Returns the logarithm to the base 2 of the value.
tagBased: false
description: |
 Returns the logarithm to the base 2 of the value.

returnValue: Returns a simple value.

example: |
 <CFSET n=8>
   <CFOUTPUT>
   Given n=8
   The Log2 of #n# is: #Log2(n)#
   </CFOUTPUT>

args:
 - name: value
   desc: real number > 0.
   req: true


javaDoc: |
 /**
  * Returns the logarithm to the base 2 of the value.
  * 
  * @param value      real number > 0. 
  * @return Returns a simple value. 
  * @author Joel Cox (jlcox@goodyear.com) 
  * @version 1, October 9, 2001 
  */

code: |
 function Log2(x)
 {
   if (x GT 0)
       Return(Log(x) / Log(2));
   else
       Return("undefined");
 }

---

