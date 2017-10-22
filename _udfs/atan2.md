---
layout: udf
title:  atan2
date:   2005-09-14T22:55:35.000Z
library: MathLib
argString: "x, y"
author: Rick Root
authorEmail: rick.root@webworksllc.com
version: 1
cfVersion: CF5
shortDescription: Calculates the arc tangent of the two variables, x and y.
tagBased: false
description: |
 This function calculates the arc tangent of the two variables x and y, utilizing java.lang.Math class.
 It is similar to calculating the arc tangent of y / x, except that the signs of both arguments are used to determine the quadrant of  the result.

returnValue: Returns a number.

example: |
 <cfscript>
     c = atan2(2.5,3);
 </cfscript>
 
 <cfoutput>#c#</cfoutput>

args:
 - name: x
   desc: First value.
   req: true
 - name: y
   desc: Second value.
   req: true


javaDoc: |
 /**
  * Calculates the arc tangent of the two variables, x and y.
  * 
  * @param x      First value. (Required)
  * @param y      Second value. (Required)
  * @return Returns a number. 
  * @author Rick Root (rick.root@webworksllc.com) 
  * @version 1, September 14, 2005 
  */

code: |
 function atan2(firstArg, secondArg) {    
     var Math = createObject("java","java.lang.Math");    
     return Math.atan2(javacast("double",firstArg), javacast("double",secondArg)); 
 }

---

