---
layout: udf
title:  decToBinValList
date:   2005-11-03T23:50:26.000Z
library: UtilityLib
argString: "decVal"
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF5
shortDescription: Converts decimal number to list of binary place values.
tagBased: false
description: |
 You give me a decimal number, and I return a list of numbers resulting from converting your original value to binary, and returning the non zero results. Example, you give me &quot;13&quot; and I return &quot;1,4,8&quot;.

returnValue: Returns a string.

example: |
 <cfset x = 13>
 <cfoutput>#decToBinValList(x)#</cfoutput>

args:
 - name: decVal
   desc: Decimal value.
   req: true


javaDoc: |
 /**
  * Converts decimal number to list of binary place values.
  * 
  * @param decVal      Decimal value. (Required)
  * @return Returns a string. 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, November 3, 2005 
  */

code: |
 function decToBinValList(decVal) {
     // create an empty counter
     var i = "";        
     // create an empty 'current value'
     var cur = "";
     // convert decimal val to binary
     var bVal = FormatBaseN(val(decVal), 2);
     // set our binary seed to 1, the first place in the binary system
     var b = 1;
     // create an empty list to hold the results
     var resultList = "";
     
     // loop through the places in the binary number, going from right to left.
     for(i = len(bVal); ; i = i - 1) {            
             cur = val(b * mid( bVal , i , 1 ));
             if (cur gt 0) resultList = listAppend(resultList,cur);
 
             // double the value of our binary seed
             b = 2 * b;
             //exit loop when the last bit is processed    
             if (i eq 1) break;
         }
     
     // return the list    
     return resultList;
 }

---

