---
layout: udf
title:  forceWholeQuantityRange
date:   2004-09-27T12:03:04.000Z
library: UtilityLib
argString: "argNum, argMin[, argMax]"
author: Shawn Fairweather
authorEmail: psalm_119_@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Force a value to whole quantity and restrict to a given min/max range.
tagBased: false
description: |
 Force a value to whole quantity and restrict to a given min/max range.

returnValue: Returns a number.

example: |
 <cfoutput>
   #forceWholeQuantityRange(1.5, 2, 20)#
 </cfoutput>

args:
 - name: argNum
   desc: The number to check.
   req: true
 - name: argMin
   desc: The minimum value of the range.
   req: true
 - name: argMax
   desc: The maximum value of the range.
   req: false


javaDoc: |
 /**
  * Force a value to whole quantity and restrict to a given min/max range.
  * 
  * @param argNum      The number to check. (Required)
  * @param argMin      The minimum value of the range. (Required)
  * @param argMax      The maximum value of the range. (Optional)
  * @return Returns a number. 
  * @author Shawn Fairweather (psalm_119_@hotmail.com) 
  * @version 1, September 27, 2004 
  */

code: |
 function forceWholeQuantityRange(argNum, argMin){
     var qnty = argNum;
 
     if(IsNumeric(argNum)){
         qnty = int(argNum);
     } else {
         qnty = argMin;
     }
 
     if(argNum LT argMin){
         qnty = argMin;
     } else if((arrayLen(arguments) gt 2) and (argNum GT arguments[3])){
         qnty = arguments[3];                        
     }
     return qnty;
 }

oldId: 1157
---

