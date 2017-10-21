---
layout: udf
title:  Median
date:   2001-07-18T14:50:14.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the median (middle) value for a set of numberic values.
description: |
 Returns the median (middle) value for a set of numberic values. The values can come from a list or a one dimensional array.

returnValue: Returns a simple value.

example: |
 <CFSET Values1="1,2,3,4,5,6,7,8,9,10">
 <CFSET Values2="1,2,3,4,5,6,7,8,9,10,11">
 
 <CFOUTPUT>
 Given Values1 = <CFIF IsArray(Values1)>{#ArrayToList(Values1)#}<CFELSE>{#Values1#}</CFIF><BR>
 Given Values2 = <CFIF IsArray(Values2)>{#ArrayToList(Values2)#}<CFELSE>{#Values2#}</CFIF><BR>
 The median of Values1 is #Median(values1)#<BR>
 The median of Values2 is #Median(values2)#<BR>
 </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the median (middle) value for a set of numberic values.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a simple value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, July 18, 2001 
  */

code: |
 function Median(values)
 {
   Var x = 0;
   Var NumberOfElements = 0;
   Var LeftCenterPosition = 0;
   Var RightCenterPosition = 0;
   Var MyArray = 0;
   if (IsArray(values)){
      MyArray = values;
     }
   else {
      MyArray = ListToArray(values);
     }
   ArraySort(MyArray, "numeric");
   x = ArrayToList(MyArray);
   NumberOfElements = ListLen(x);
   if ((NumberOfElements MOD 2) EQ 0) {
       LeftCenterPosition = ListGetAt(x, (Int(NumberOfElements/2)), ",");
       RightCenterPosition = ListGetAt(x, (Int(NumberOfElements/2)+1), ",");
       Return (LeftCenterPosition + RightCenterPosition)/2;
     }
   else {
       Return ListGetAt(x, Int(NumberOfElements/2)+1, ",");
     }
 }

---

