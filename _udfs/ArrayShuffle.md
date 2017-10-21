---
layout: udf
title:  ArrayShuffle
date:   2001-10-09T11:29:31.000Z
library: DataManipulationLib
argString: "ar"
author: Ivan Latunov
authorEmail: ivan@cfchat.net
version: 1
cfVersion: CF5
shortDescription: Shuffles the values in a one-dimensional array.
description: |
 Shuffles the values in a one-dimensional array.  This functions takes a one-dimensional array and returns a new one with the values from the first randomly shuffled.

returnValue: Returns an array.

example: |
 <cfset a=arrayNew(1)>
 <cfloop index="i" from="1" to="10">
     <cfset a[i]=i>
 </cfloop>
 <cfset a1=ArrayShuffle(a)><br><br>
 
 <CFLOOP FROM="1" TO="#ArrayLen(a1)#" INDEX="i">
 <CFOUTPUT>
 #a1[i]#<BR>
 </CFOUTPUT>
 </CFLOOP>

args:
 - name: ar
   desc: One dimensional array you want shuffled.
   req: true


javaDoc: |
 /**
  * Shuffles the values in a one-dimensional array.
  * 
  * @param ar      One dimensional array you want shuffled. 
  * @return Returns an array. 
  * @author Ivan Latunov (ivan@cfchat.net) 
  * @version 1, October 9, 2001 
  */

code: |
 function ArrayShuffle(ar) {
     var ar1=ArrayNew(1);
     var i=1;
     var n=1;
     var len=ArrayLen(ar);
     if (NOT IsArray(ar,1)) {
         writeoutput("Error in <Code>ArrayShuffle()</code>! Correct usage: ArrayShuffle(<I>Array</I>) - Shuffles the values in one dimensional Array");
         return 0;
     }
     
     if (ArrayLen(ar) eq 0) {
         return ar1;
     }
     
     for (i=1; i lte len; i=i+1) {
         n = RandRange(1,ArrayLen(ar));
         ArrayAppend(ar1,ar[n]);
         ArrayDeleteAt(ar,n);
     }
     return ar1;
 }

---

