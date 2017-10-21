---
layout: udf
title:  ArrayReverse
date:   2001-10-09T11:46:29.000Z
library: DataManipulationLib
argString: "InArray"
author: Raymond Simmons
authorEmail: raymond@terraincognita.com
version: 1
cfVersion: CF5
shortDescription: Reverses the order of elements in a one-dimensional array.
description: |
 Reverses the order of elements in a one-dimensional array.  This function takes a one-dimensional array and returns a new one with the values from the first in reverse order.

returnValue: Returna a new one dimensional array.

example: |
 <CFSET Numbers = "1,2,3,4,5">
 <CFSET NumbersArray = ListToArray(Numbers)>
 <CFSET NumbersArray = ArrayReverse(NumbersArray)>
 
 <CFLOOP INDEX="I" FROM="1" TO="#ArrayLen(NumbersArray)#">
 <CFOUTPUT>
 #NumbersArray[I]#<BR>
 </CFOUTPUT>
 </CFLOOP>

args:
 - name: InArray
   desc: One-dimensional array to be reversed.
   req: true


javaDoc: |
 /**
  * Reverses the order of elements in a one-dimensional array.
  * 
  * @param InArray      One-dimensional array to be reversed. 
  * @return Returna a new one dimensional array. 
  * @author Raymond Simmons (raymond@terraincognita.com) 
  * @version 1.0, October 9, 2001 
  */

code: |
 function ArrayReverse(inArray){
     var outArray = ArrayNew(1);
     var i=0;
         var j = 1;
     for (i=ArrayLen(inArray);i GT 0;i=i-1){
         outArray[j] = inArray[i];
         j = j + 1;
     }
     return outArray;
 }

---

