---
layout: udf
title:  Midrange
date:   2001-07-18T15:10:02.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the midrange value for a set of numbers.
description: |
 Returns the midrange value for a set of numbers. The midrange value is found by adding the min value in a set to the max value, then dividing by 2.

returnValue: Returns a simple value.

example: |
 <CFSET Values="1,3,5,7,9,99"> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF>
   The midrange is #Midrange(values)#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the midrange value for a set of numbers.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Midrange(values)
 {
   Var MyArray = 0;
   if (IsArray(values)){
      MyArray = values;
     }
   else {
      MyArray = ListToArray(values);
     }
   Return ((ArrayMax(MyArray) + ArrayMin(MyArray))/2);
 }

---

