---
layout: udf
title:  MinMax
date:   2001-07-18T15:15:36.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the smallest and largest value in a set of values.
description: |
 Returns a structure containing the smallest and largest value in a set of values.

returnValue: Returns a structure.

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10">
   <CFSET MinMax=MinMax(values)> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF>
   The min is #MinMax.MinVal#
   The max is #MinMax.MaxVal#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the smallest and largest value in a set of values.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a structure. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function MinMax(values)
 {
   Var MyArray = 0;
   Var mMinMax = StructNew();
   if (IsArray(values)){
      MyArray = values;
     }
   else {
      MyArray = ListToArray(values);
     }
   mMinMax["MinVal"] = ArrayMin(MyArray);
   mMinMax["MaxVal"] = ArrayMax(MyArray);
   Return mMinMax;
 }

---

