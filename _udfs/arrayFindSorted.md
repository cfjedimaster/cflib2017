---
layout: udf
title:  arrayFindSorted
date:   2005-09-30T19:01:46.000Z
library: DataManipulationLib
argString: "array, value"
author: Kenneth Fricklas
authorEmail: kenf@mallfinder.com
version: 1
cfVersion: CF5
shortDescription: Locate a value in an already-sorted array.
description: |
 Locate a value in an already-sorted array. Case-insensitive for strings. Code is useful since converting to a list would require finding a unique delimiter.

returnValue: Returns the position of the match, or 0.

example: |
 <CFSET a1 = ListToArray("1,2,4,5,10,12")>
 <CFOUTPUT>
 #arrayFindSorted(a1, "10")# <!--- displays 5 --->
 </CFOUTPUT>

args:
 - name: array
   desc: The array to check.
   req: true
 - name: value
   desc: The value to look for.
   req: true


javaDoc: |
 /**
  * Locate a value in an already-sorted array.
  * 
  * @param array      The array to check. (Required)
  * @param value      The value to look for. (Required)
  * @return Returns the position of the match, or 0. 
  * @author Kenneth Fricklas (kenf@mallfinder.com) 
  * @version 1, September 30, 2005 
  */

code: |
 function arrayFindSorted(arrayX, value) 
 {
     var m = 0;    
     var found = 0;
     var done = 0;
     var hi = arrayLen(arrayX)+1;
     var lo = 1;
     var i = 1;
     var maxtest = 500;
     do {
         m = (hi + lo) \ 2;
         if (arrayX[m] EQ value)
         {
             found = 1;
             done = 1;
         }
         else
         {
             if ((m EQ lo) or (m EQ hi))
                 done = 1; /* not found */
             else
             {    
                 if (value LT arrayX[m])
                 {
                 /* higher */
                     hi = m;
                 }
                 else
                 {
                 /* lower */
                     lo = m;
                 }
             }
         }
         if (i EQ maxtest)
             {
             done = 1;
             writeoutput("Error! overflow in search");
             }
         else
             i = i + 1;
     } while (done EQ 0);
     if (found)
         return m;
     else
         return 0;
 }

---

