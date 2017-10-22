---
layout: udf
title:  IsScientific
date:   2003-07-10T11:56:22.000Z
library: MathLib
argString: "inNum"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 2
cfVersion: CF5
shortDescription: Returns true if passed value is formatted in &quot;baseEexp&quot; scientific notation.
tagBased: false
description: |
 Returns true if passed value is formatted in &quot;baseEexp&quot; scientific notation.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 IsScientific("9.457382E6"): #IsScientific("9.457382E6")#<br>
 IsScientific("6.732E6"): #IsScientific("6.732E6")#<br>
 IsScientific("1.23E-3"):#IsScientific("1.23E-3")#<br>
 IsScientific("1.0"): #IsScientific("1.0")#<br>
 IsScientific("1.23 x 10 -3"):#IsScientific("1.23 x 10 -3")#<br>
 </cfoutput>

args:
 - name: inNum
   desc: Number to check.
   req: true


javaDoc: |
 /**
  * Returns true if passed value is formatted in &quot;baseEexp&quot; scientific notation.
  * Modified to allow D since versions prior to MX would allow D.
  * 
  * @param inNum      Number to check. (Required)
  * @return Returns a boolean. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 2, July 10, 2003 
  */

code: |
 function IsScientific(inNum) {
     if(IsNumeric(inNum) AND (FindNoCase("E", inNum) OR FindNoCase("D",inNum))) return true;
     else return false;
 }

---

