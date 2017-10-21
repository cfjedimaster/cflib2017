---
layout: udf
title:  StdDevPop
date:   2001-09-07T12:23:19.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the standard deviation calculated using the divisor n method.
description: |
 Returns the standard deviation calculated using the divisor n method. This method is used when you have all the values for an entire population.

returnValue: Returns a simple value.

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10"> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF><BR>
   The standard deviation for the population is #StdDevPop(values)#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the standard deviation calculated using the divisor n method.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.1, September 7, 2001 
  */

code: |
 function StdDevPop(values)
 {
   Var MyArray = 0;
   Var NumValues = 0;
   Var xBar = 0;
   Var SumxBar = 0;  
   Var i=0;
   if (IsArray(values)){
      MyArray = values;
     }
   else {
      MyArray = ListToArray(values);
     }
   NumValues = ArrayLen(MyArray);
   xBar = ArrayAvg(MyArray);
   for (i=1; i LTE NumValues; i=i+1) {
     SumxBar = SumxBar + ((MyArray[i] - xBar)*(MyArray[i] - xBar));
     }
   Return Sqr(SumxBar/NumValues);
 }

---

