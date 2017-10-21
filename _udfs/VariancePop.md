---
layout: udf
title:  VariancePop
date:   2001-10-16T14:45:58.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the population variance for a set of numeric values.
description: |
 Returns the population variance for a set of numeric values.  Variance is a measure of how spread out a distribution of data is.  This method is used when you have all the values for an entire population.

returnValue: Returns a numeric value.

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10"> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF><BR>
   The variance for the population is #VariancePop(values)#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the population variance for a set of numeric values.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a numeric value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 16, 2001 
  */

code: |
 function VariancePop(values)
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
   Return SumxBar/NumValues;
 }

---

