---
layout: udf
title:  Mode
date:   2001-09-07T11:58:05.000Z
library: MathLib
argString: "values"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns the mode and frequency for a given set of values.
tagBased: false
description: |
 Returns a structure that contains 2 keys: Mode and Frequency.  Mode is the value with the greatest frequency in the set.

returnValue: Returns a structure.

example: |
 <CFSET Values="4,1,2,4,2,4,6,7,4,6,3,2,5,3,8,4">
   <CFSET Mode=Mode(values)> 
 
   <CFOUTPUT>
   Given <CFIF IsArray(Values)>{#ArrayToList(Values)#}<CFELSE>{#Values#}</CFIF>
   The mode is #Mode.Mode#
   The frequency is #Mode.Frequency#
   </CFOUTPUT>

args:
 - name: values
   desc: Comma delimited list or one dimensional array of numeric values.
   req: true


javaDoc: |
 /**
  * Returns the mode and frequency for a given set of values.
  * 
  * @param values      Comma delimited list or one dimensional array of numeric values. 
  * @return Returns a structure. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, September 7, 2001 
  */

code: |
 function Mode(values)
 {
   Var MyStruct = StructNew();
   Var Frequency = 0;
   Var Mode = "";
   Var mMode = StructNew();
   Var i=0;
   if (IsArray(values)){
      values = ArrayToList(values);
     }
   for (i=1; i LTE ListLen(values); i=i+1) {  
     element = ListGetAt(values, i);
     if (StructKeyExists(MyStruct, element)) {
       StructUpdate(MyStruct, element,  IncrementValue(MyStruct[element]));        
       }
     else {
       StructInsert(MyStruct, element, "1");
     }
   }
   MyKeyArray = StructKeyArray(MyStruct);
   for (i=1; i LTE ArrayLen(MyKeyArray); i=i+1) {
       if (MyStruct[MyKeyArray[i]] GTE Frequency) {
           Frequency = MyStruct[MyKeyArray[i]];
       }
   }
   for (i=1; i LTE ArrayLen(MyKeyArray); i=i+1) {
     if (MyStruct[MyKeyArray[i]] eq Frequency) {
         Mode = ListAppend(Mode, MyKeyArray[i]);
       }
   }
  mMode["Mode"] = ListSort(Mode, "Numeric");
  mMode["Frequency"] = Frequency;
  Return mMode;
 }

---

