---
layout: udf
title:  Range
date:   2001-07-18T15:35:41.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the range for a set of numbers.
tagBased: false
description: |
 Returns the range for a set of numbers. The range is calculated by subtracting the smallest number in a set from the largest.

returnValue: Returns a simple value.

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10"> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF>
   The range is #Range(values)#
   </CFOUTPUT>

args:
 - name: values
   desc:            Comma delimited list or one dimensional array of numeric values
   req: true


javaDoc: |
 /**
  * Returns the range for a set of numbers.
  * 
  * @param values                 Comma delimited list or one dimensional array of numeric values 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Range(values)
 {
   Var MyArray = 0;
   if (IsArray(values)){
      MyArray = values;
     }
   else {
      MyArray = ListToArray(values);
     }  
   Return ArrayMax(MyArray) - ArrayMin(MyArray);
 }

oldId: 80
---

