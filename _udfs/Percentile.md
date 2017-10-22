---
layout: udf
title:  Percentile
date:   2001-07-30T13:14:35.000Z
library: MathLib
argString: "number, aPopulation[, insertNumber]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Function for calculating the percentile of a given number from a population of numbers.
tagBased: false
description: |
 This function is used to get the percentile rank of a given number from a population of numbers. The percentile refers to the percent of numbers in the set that are below the number you pass in.

returnValue: Returns a numeric percent value

example: |
 <cfset population="33,29,29,31,32,33,33,35,37,25,28">
 <cfset array = listToArray(population)>
 <table>
     <tr>
         <td>Number to Check</td>
         <td>Percentile</td>
     </tr>
 <cfoutput>
 <cfloop from="1" to="#arraylen(array)#" index="ii">
     <cfset thisNumber = array[ii]>
     <tr>
         <td>#thisNumber#</td>
         <td>#percentile(thisNumber,array)#</td>
     </tr>
 </cfloop>
 </cfoutput>
 </table>

args:
 - name: number
   desc: The number you want to get the percentile rank of
   req: true
 - name: aPopulation
   desc: An array of numbers which is the population to find the percentile in
   req: true
 - name: insertNumber
   desc: Boolean value to decide if the number should be inserted into the population before calculation.  By default this is false.
   req: false


javaDoc: |
 /**
  * Function for calculating the percentile of a given number from a population of numbers.
  * 
  * @param number      The number you want to get the percentile rank of 
  * @param aPopulation      An array of numbers which is the population to find the percentile in 
  * @param insertNumber      Boolean value to decide if the number should be inserted into the population before calculation.  By default this is false. 
  * @return Returns a numeric percent value 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, July 30, 2001 
  */

code: |
 function percentile(numberToCheck,populationArray){
     // (Thanks to Jim Flannery for pointing me at the formula).
     var ii = 1;
     //set a counter for the number below this value
     var countBelow = 0;
     //set a counter for how many instances of thisNumber there are
     var countWithin = 0;
     // deal with the optional parameter as to whether the number to check is to be added to the population.
     //if there a third argument and it is a boolean and it is true, insert the number to check 
     if(arraylen(arguments) gt 2 AND isBoolean(arguments[3]) and arguments[3])
         arrayAppend(populationArray,numberToCheck);
     //now, let's sort the array to make it easier to find the values
     arraySort(populationArray,"numeric");
     //loop through the array, setting the counters appropriately
     for(ii = 1; ii lte arraylen(populationArray); ii = ii + 1){
         //if this number is below numberToCheck, increment the countBelow
         if(populationArray[ii] lt numberToCheck){
             countBelow = countBelow + 1;
         }
         else{
             //if this number is equal to numberToCheck, increment the counterWithin
             if(populationArray[ii] eq numberToCheck){
                 countWithin = countWithin + 1;
             }
             //if this number is above the numberToCheck break
             else{
                 break;
             }
         }
     }
     //run the percentile formula and return
     return ((countBelow + 0.5 * countWithin)/arraylen(populationArray))*100;
 }

---

