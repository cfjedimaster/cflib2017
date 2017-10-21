---
layout: udf
title:  PercentageChange
date:   2002-07-03T17:50:02.000Z
library: MathLib
argString: "var1, var2"
author: Guillermo Cruz
authorEmail: gcruz@elkiwa.com
version: 1
cfVersion: CF5
shortDescription: Check the percentage change between 2 numbers.
description: |
 This function can be used with any 2 numbers you want the percentage change on.
 
 Imagine two numbers that pertain to someone's weight. The first number is what they use to weigh and the second is what they currently weigh. You want to know the percentage difference with the + or minus attached to the outcome.

returnValue: Returns a string.

example: |
 <cfoutput>
 PercentageChange(210,175) = #PercentageChange(210,175)#
 </cfoutput>

args:
 - name: var1
   desc: The first number.
   req: true
 - name: var2
   desc: The second number.
   req: true


javaDoc: |
 /**
  * Check the percentage change between 2 numbers.
  * 
  * @param var1      The first number. (Required)
  * @param var2      The second number. (Required)
  * @return Returns a string. 
  * @author Guillermo Cruz (gcruz@elkiwa.com) 
  * @version 1, July 3, 2002 
  */

code: |
 function PercentageChange(var1,var2){            
     var maxNumber = max(var1,var2);
     var minNumber = min(var1,var2);
     var change = maxNumber - minNumber;
     var symbol = "";
         
     if (var1 EQ var2)   return 0;
     change = NumberFormat(change / var1 * 100, 0.00);    
     
     if(var1 GT var2) symbol = "-";
     else symbol = "+";
 
     return symbol & " " & change;    
 }

---

