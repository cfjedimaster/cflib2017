---
layout: udf
title:  ListAggregate
date:   2002-03-26T01:01:10.000Z
library: MathLib
argString: "list[, delim]"
author: Jesse Monson
authorEmail: jesse@ixstudios.com
version: 1
cfVersion: CF5
shortDescription: Turn a list of numbers into a summation sequence.
tagBased: false
description: |
 Pass in any list of numbers and an optional delimiter set (&quot;,&quot; is default) and it returns a list of the positional summations of that list.  This function is great for financial numbers, time sensitive numbers or any order specific numbers.

returnValue: Returns a string.

example: |
 <cfset numbers = "1,2,3,4,5">
 <cfset alphanum = "x;y;z;5;5;5;n">
 
 <cfoutput>
 #listAggregate(numbers)#<BR>
 #listAggregate(alphanum,";")#
 </cfoutput>

args:
 - name: list
   desc: List of values you want to return a summation sequence for.
   req: true
 - name: delim
   desc: Delimiter used to separate list elements.  Default is the comma.
   req: false


javaDoc: |
 /**
  * Turn a list of numbers into a summation sequence.
  * 
  * @param list      List of values you want to return a summation sequence for. 
  * @param delim      Delimiter used to separate list elements.  Default is the comma. 
  * @return Returns a string. 
  * @author Jesse Monson (jesse@ixstudios.com) 
  * @version 1, March 25, 2002 
  */

code: |
 function listAggregate(list) {
   var a=1;
   var sum=0;
   var sumList="";
   var delims=",";
   if (arrayLen(arguments) gte 2) {
     delims = arguments[2];
   }
     for ( ;a lte listLen(list,delims);a=a+1) {
       sum = sum + val(listGetAt(list,a,delims));
       sumList = ListAppend(sumList,sum,delims);
     }
   return sumList;
 }

---

