---
layout: udf
title:  StdDevSamp
date:   2001-09-07T12:24:12.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the standard deviation calculated using the divisor n-1 method.
description: |
 Returns the standard deviation calculated using the divisor n-1 method. This method is used when you have values representing a population sample.

returnValue: Returns a simple value.

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10"> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF><BR>
   The standard deviation for the sample is #StdDevSamp(values)#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values
   req: true


javaDoc: |
 /**
  * Returns the standard deviation calculated using the divisor n-1 method.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.1, September 7, 2001 
  */

code: |
 function StdDevSamp(values)
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
   Return Sqr(SumxBar/(NumValues-1));
 }

---

