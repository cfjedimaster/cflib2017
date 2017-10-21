---
layout: udf
title:  quartile
date:   2009-06-11T23:26:18.000Z
library: MathLib
argString: "values, quartile"
author: Nathan Mische
authorEmail: nmische@gmail.com
version: 0
cfVersion: CF5
shortDescription: Returns the first, second, or third quartile value for a set of numeric values.
description: |
 Returns the first, second, or third quartile value for a set of numeric values.

returnValue: Returns a number.

example: |
 <cfset values=[7,15,36,39,40,41] />
 <cfset q = Quartile(values,3) />

args:
 - name: values
   desc: Values to parse.
   req: true
 - name: quartile
   desc: Numeric value between 1 and 3.
   req: true


javaDoc: |
 /**
  * Returns the first, second, or third quartile value for a set of numeric values.
  * 
  * @param values      Values to parse. (Required)
  * @param quartile      Numeric value between 1 and 3. (Required)
  * @return Returns a number. 
  * @author Nathan Mische (nmische@gmail.com) 
  * @version 0, June 11, 2009 
  */

code: |
 function quartile(values, q) {
     var valueArray = 0;
     var numValues = 0;
     var leftIndex = 0;
     var rightIndex = 0;
     var middleIndex = 0;
     var median = 0;
     var i = 0;
     var halfValues = ArrayNew(1);
     var val = 0;
 
     if (IsArray(values)){
         valueArray = Duplicate(values);
     } else {
         valueArray = ListToArray(values);
     }
 
     ArraySort(valueArray,"numeric");
     numValues = ArrayLen(valueArray);
 
     // get the median
     if((numValues mod 2) eq 0) {
         leftIndex = Int(numValues/2);
         rightIndex = Int(numValues/2) + 1;
         median = (valueArray[leftIndex] + valueArray[rightIndex]) / 2;
     } else {
         middleIndex = Int(numValues/2) + 1;
         median = valueArray[middleIndex];
     }
 
     // return the quartile
     if (q eq 1) {
         for (i = 1; i lte numValues; i = i + 1){
             val = valueArray[i];
             if ( val lt median) {
                 ArrayAppend(halfValues,val);
             } else {
                 break;
             }
         }
         return Quartile(halfValues,2);
     } else if (q eq 2) {
         return median;
     } else if (q eq 3) {
         for (i = numValues; i gt 0; i = i - 1){
             val = valueArray[i];
             if ( val gt median) {
                 ArrayAppend(halfValues,val);
             } else {
                 break;
             }
         }
         return Quartile(halfValues,2);
     }
 
     // return a blank string if invalid quartile
     return "";
 
 }

---

