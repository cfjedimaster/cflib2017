---
layout: udf
title:  Mean
date:   2001-07-18T14:37:31.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the mean (average) value for a set of numberic values.
description: |
 Returns the mean (average) value for a set of numberic values.  These values can be passed as a list or one dimensional array.

returnValue: Returns a simple value.

example: |
 <CFSET Values="1,2,3,4,5,6,7,8,9,10"> 
 
   <CFOUTPUT>
   Given {#Values#}
   The mean is #Mean(values)#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the mean (average) value for a set of numberic values.
  * Although you could use the ArrayAvg function on an array, this funciton handles arrays so that it can be called from other functions in this library (see CVpop and CVsamp for examples).
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Mean(values)
 {
   if (IsArray(values)){
      Return ArrayAvg(values);
     }
   else {
      Return ArrayAvg(ListToArray(values));
     }  
 }

---

