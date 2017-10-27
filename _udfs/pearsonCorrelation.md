---
layout: udf
title:  pearsonCorrelation
date:   2008-09-27T22:51:44.000Z
library: MathLib
argString: "arrayOfStructures, xkey, ykey"
author: Martijn van der Woud
authorEmail: martijnvanderwoud@orange.nl
version: 0
cfVersion: CF5
shortDescription: Calculates the Pearson correlation.
tagBased: false
description: |
 Calculates the Pearson correlation for the values in two specified keys in an array of structures.

returnValue: A structure with the perasonCorrelation and a boolean indicating if the input was valid.

example: |
 <!--- An array of structs, with keys "X" and "Y"; all values in X and Y are numeric--->
 <cfset variables.arrayOfStructs = arrayNew(1)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 3>
 <cfset variables.element.Y = 1> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 6>
 <cfset variables.element.Y = 2> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 7>
 <cfset variables.element.Y = 3> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 4>
 <cfset variables.element.Y = 4> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 5>
 <cfset variables.element.Y = 5> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 3>
 <cfset variables.element.Y = 6> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 7>
 <cfset variables.element.Y = 7> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 6>
 <cfset variables.element.Y = 8> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 5>
 <cfset variables.element.Y = 9> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 2>
 <cfset variables.element.Y = 1> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 3>
 <cfset variables.element.Y = 2> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 5>
 <cfset variables.element.Y = 3> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 6>
 <cfset variables.element.Y = 4> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 <cfset variables.element = structNew()>
 <cfset variables.element.X = 7>
 <cfset variables.element.Y = 5> 
 <cfset arrayAppend(variables.arrayOfStructs, variables.element)>
 
 
 <cfset variables.pearsonCorrelation = pearsonCorrelation(
         arrayOfStructs = variables.arrayOfStructs, 
         xKey = "X", 
         yKey = "Y")>
 
 
 <cfdump var="#variables.pearsonCorrelation#">

args:
 - name: arrayOfStructures
   desc: An array of structures containing the specified keys for every element.
   req: true
 - name: xkey
   desc: A string&#58; the structKey containing the first variable.
   req: true
 - name: ykey
   desc: A string&#58; the structKey containing the second variable.
   req: true


javaDoc: |
 /**
  * Calculates the Pearson correlation.
  * 
  * @param arrayOfStructures      An array of structures containing the specified keys for every element. (Required)
  * @param xkey      A string: the structKey containing the first variable. (Required)
  * @param ykey      A string: the structKey containing the second variable. (Required)
  * @return A structure with the perasonCorrelation and a boolean indicating if the input was valid. 
  * @author Martijn van der Woud (martijnvanderwoud@orange.nl) 
  * @version 0, September 27, 2008 
  */

code: |
 function pearsonCorrelation (arrayOfStructs, xKey, yKey) {
     
     // numeric: holds the mean value for the xKey 
     var xMean = 0;
     // numercic: holds the mean value for the yKey
     var yMean = 0;
     // numeric: just a loop index
     var i=0;
     // numeric: holds the sum of all values for the xKey 
     var xSum = 0;
     // numeric: holds the sum of all values for the yKey 
     var ySum = 0;    
     // numeric: the number of elements in arrayOfStructs    
     var length = arrayLen(arguments.arrayOfStructs);
     // numeric: the sum of squared deviations for the xKey
     var sqDevX = 0;
     // numeric: the sum of squaried deviations for the yKey
     var sqDevY = 0;
     // numeric: the sum of cross-products
     var crossProductSum = 0;
     // numeric: holds the deviation from the mean for the xKey in a specific element
     var xDeviation = 0;
     // numeric: holds the deviation from the mean for the yKey in a specific element
     var yDeviation = 0;
     // numeric: the Pearson correlation
     var pearsonCorrelation = 0;
     // struct: the results to return
     var results = structNew();
     
             
     // loop over elements in argument arrayOfStructs
     for(i = 1; i lte length; i = i+1) {
     
         // add the xKey and yKey values of the current element to their corresponding sum variable
         xSum = xSum + arguments.arrayOfStructs[i][arguments.xKey];
         ySum = ySum + arguments.arrayOfStructs[i][arguments.yKey];
     
     } // end of loop over elements in argument arrayOfStructs
     
     // calculate the means of xKey and yKey
     xMean = xSum / length;
     yMean = ySum / length;
 
 
     // again, loop over elements in argument arrayOfStructs
     for(i = 1; i lte length; i = i+1) {
         
         // calculate deviations from the mean for the current element
         xDeviation = arguments.arrayOfStructs[i][arguments.xKey] - xMean;
         yDeviation = arguments.arrayOfStructs[i][arguments.yKey] - yMean;
         
         // update sums of squared deviations and cross-products
         sqDevX = sqDevX + xDeviation^2;
         sqDevY = sqDevY + yDeviation^2;            
         crossProductSum = crossProductSum + xDeviation * yDeviation;
     } // end of loop over elements in argument arrayOfStructs
 
     
     // if there is no variation in either xKey or yKey, the pearson correlation cannot be computed, so indicate an error
     if (min(sqDevX, sqDevY) eq 0) {
         results.inputValid = false;
         results.pearsonCorrelation = "";
     } else { // otherwise, calculatie the pearson correlation
 
         
         pearsonCorrelation = (crossProductSum / (length-1));
         pearsonCorrelation = pearsonCorrelation / sqr(sqDevX / (length-1));
         pearsonCorrelation = pearsonCorrelation / sqr(sqDevY / (length-1));
         
         results.inputValid = true;
         results.pearsonCorrelation = pearsonCorrelation;
     
     }
             
     return results;
 }

oldId: 1881
---

