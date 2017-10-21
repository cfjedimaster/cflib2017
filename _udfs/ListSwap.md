---
layout: udf
title:  ListSwap
date:   2002-06-21T11:48:27.000Z
library: StrLib
argString: "list, positionA, positionB[, delims]"
author: Rob Baxter
authorEmail: rob@microjuris.com
version: 1
cfVersion: CF5
shortDescription: Swaps two elements in a list.
description: |
 ListSwap(list, A, B) will swap the list element at position A and the list element at position B and return a new list with the swapped elements. If either position is not a valid element in the string, the original list is returned. The fourth (optional) argument to the UDF is the delimiter definition for the list (default is &quot;,&quot;).

returnValue: Returns a string.

example: |
 <cfset list = "a,bb,ccc,dddd,eeeee,ffffff,ggggggg,hhhhhhh,iiiiiiiii,kkkkkkkkkk">
 <cfoutput>
 original list = #list#<br>
 swap positions 3 and 4 = #listswap(list, 3, 4)#
 </cfoutput>

args:
 - name: list
   desc: The list to modify.
   req: true
 - name: positionA
   desc: The first position to swap.
   req: true
 - name: positionB
   desc: The second position to swap.
   req: true
 - name: delims
   desc: The delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Swaps two elements in a list.
  * 
  * @param list      The list to modify. (Required)
  * @param positionA      The first position to swap. (Required)
  * @param positionB      The second position to swap. (Required)
  * @param delims      The delimiter to use. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Rob Baxter (rob@microjuris.com) 
  * @version 1, June 21, 2002 
  */

code: |
 function ListSwap(list, PositionA, PositionB)
 {
     var elementA = "";
     var elementB = "";
     var Delims = ",";
 
     if (ArrayLen(Arguments) gt 3)
         Delims = Arguments[4];
             
     if (PositionA gt ListLen(list) Or PositionB gt ListLen(list) Or PositionA lt 1 or PositionB lt 1)
         return list;    
     
     elementA = ListGetAt(list, PositionA, Delims);
     elementB = ListGetAt(list, PositionB, Delims);
     
     //do the swap
     list = ListSetAt(list, PositionA, elementB, Delims);
     list = ListSetAt(list, PositionB, elementA, Delims); 
 
     return list;
 }

---

