---
layout: udf
title:  IsInt
date:   2002-04-10T18:52:05.000Z
library: MathLib
argString: "varToCheck"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Checks to see if a var is an integer.
description: |
 Why doesn't CF have a function for checking to see if something is an integer?  isNumeric() is all well and good, but sometimes you need an int and you want to check.  Well, here's one way to do it.

returnValue: Returns a Boolean.

example: |
 <table border="1">
 <cfoutput>
 <cfloop list="1,1.4,abc,ab12,12ab,1 2 3,12 abc 34,42" index="var">
 <tr>
     <td>#var#</td>
     <td>#YesNoFormat(isInt(var))#</td>
 </tr>
 </cfloop>
 </cfoutput>
 </table>

args:
 - name: varToCheck
   desc: Value you want to validate as an integer.
   req: true


javaDoc: |
 /**
  * Checks to see if a var is an integer.
  * version 1.1 - mod by Raymond Camden
  * 
  * @param varToCheck      Value you want to validate as an integer. 
  * @return Returns a Boolean. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1.1, April 10, 2002 
  */

code: |
 function isInt(varToCheck){
   return isNumeric(varToCheck) and round(varToCheck) is vartoCheck;
 }

---

