---
layout: udf
title:  arrayDiff
date:   2013-04-06T02:35:48.000Z
library: DataManipulationLib
argString: "smallerArray, biggerArray"
author: Greg Nettles
authorEmail: gregnettles@gmail.com
version: 2
cfVersion: CF6
shortDescription: Compares two arrays and returns the difference between the two.
description: |
 This function compares 2 one-dimensional arrays (smallerArray &amp; biggerArray) and returns an array with the values found in biggerArray but not in smallerArray.

returnValue: Returns an array.

example: |
 <cfscript>
 aSmaller = arrayNew(1);
 aSmaller[1] = 'a';
 aSmaller[2] = 'b';
 aBigger = arrayNew(1); 
 aBigger[1] = 'a';
 aBigger[2] = 'c';
 aBigger[3] = 'b';
 aBigger[4] = 'd';
 </cfscript>
 
 Smaller Array:
 <cfdump var="#aSmaller#"><br />
 Bigger Array:
 <cfdump var="#aBigger#"><br />
 Difference between the two:
 <cfset aDifferences = arrayDiff(aSmaller,aBigger)>
 <Ccfdump var="#aDifferences#">

args:
 - name: smallerArray
   desc: First array.
   req: true
 - name: biggerArray
   desc: Second array.
   req: true


javaDoc: |
 /**
  * Compares two arrays and returns the difference between the two.
  * v1.0 by Greg Nettles
  * v2.0 by Adam Cameron under guidance from Jeff Coughlin - replaced unnecessary/ineffcient logic
  * 
  * @param smallerArray      First array. (Required)
  * @param biggerArray      Second array. (Required)
  * @return Returns an array. 
  * @author Greg Nettles (gregnettles@gmail.com) 
  * @version 2.0, April 5, 2013 
  */

code: |
 function arrayDiff(smallerArray, biggerArray) {
     biggerArray.removeAll(smallerArray);
     return biggerArray;
 }

---

