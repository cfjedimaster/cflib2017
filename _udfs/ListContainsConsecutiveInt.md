---
layout: udf
title:  ListContainsConsecutiveInt
date:   2003-05-09T18:11:17.000Z
library: StrLib
argString: "lsIncoming[, strDelimiter]"
author: Teri Stewart
authorEmail: terilynnstewart@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Determines if a list consists of consecutive integers, regardless or order.
description: |
 Returns true if a list consists of integers that are consecutive, false if it does not. The minimum number in the list has no bearing; it may be any integer, negative or positive.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 <!--- consecutive but unordered --->
 #ListContainsConsecutiveInt("9,10,12,11")#<br>
 <!--- consecutive with pipe delimiter --->
 #ListContainsConsecutiveInt("-1|0|1","|")#<br>
 <!--- consecutive, but repeated number --->
 #ListContainsConsecutiveInt("4,4,5")#<br>
 <!--- not consecutive --->
 #ListContainsConsecutiveInt("6,4")#<br>
 <!--- consecutive but not integers --->
 #ListContainsConsecutiveInt("2.5,3.5")#<br>
 <!--- alpha --->
 #ListContainsConsecutiveInt("1,2,a")#<br>
 </cfoutput>

args:
 - name: lsIncoming
   desc: List to check.
   req: true
 - name: strDelimiter
   desc: Delimiter for the list. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Determines if a list consists of consecutive integers, regardless or order.
  * 
  * @param lsIncoming      List to check. (Required)
  * @param strDelimiter      Delimiter for the list. Defaults to a comma. (Optional)
  * @return Returns a boolean. 
  * @author Teri Stewart (terilynnstewart@hotmail.com) 
  * @version 1, May 9, 2003 
  */

code: |
 function ListContainsConsecutiveInt(lsIncoming){
   var arrSorted=ArrayNew(1);
   var i=0;
   var strDelimiter=",";
 
  //default list delimiter to a comma unless otherwise specified
  if(ArrayLen(arguments) gte 2){
   strDelimiter=arguments[2];
  }
   //change list to array for faster processing
   arrSorted=ListToArray(lsIncoming,strDelimiter);
   //make sure all array elements are numeric and itegers
   for(i=1; i lte ArrayLen(arrSorted); i=i+1){
     if(not isNumeric(arrSorted[i]) or round(arrSorted[i]) is not arrSorted[i]){
       return false;
     }
   }
   //sort the array
   arraySort(arrSorted,"numeric");
   //loop sorted array
   for(i=0; i lt ArrayLen(arrSorted); i=i+1){
     //see if item at array position i+1 equals the first array element + i
     if(arrSorted[i+1] neq arrSorted[1]+i){
       return false;
       break;
     }
   }
   return true;
 }

---

