---
layout: udf
title:  isFloat
date:   2003-04-22T10:10:32.000Z
library: MathLib
argString: "eInt"
author: Phillip Holmes
authorEmail: pholmes@mediares.com
version: 1
cfVersion: CF5
shortDescription: IsFloat() determines if a number is a float or whole number. Returns true for float.
description: |
 IsFloat() determines if a number is a float or whole number. Returns true for float.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 isFloat(3.2) = #isFloat(3.2)#<br>
 isFloat(3) = #isFloat(3)#<br>
 isFloat(3.2apple) = #isFloat("3.2apple")#<br>
 </cfoutput>

args:
 - name: eInt
   desc: Number to check
   req: true


javaDoc: |
 /**
  * IsFloat() determines if a number is a float or whole number. Returns true for float.
  * Version 2 by RCamden (ray@camdenfamily.com)
  * 
  * @param eInt      Number to check (Required)
  * @return Returns a boolean. 
  * @author Phillip Holmes (pholmes@mediares.com) 
  * @version 1, April 22, 2003 
  */

code: |
 function isFloat(eInt) {
     return (find(".",eInt) gt 0) and isNumeric(eInt);
 }

---

