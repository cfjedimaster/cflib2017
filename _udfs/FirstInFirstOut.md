---
layout: udf
title:  FirstInFirstOut
date:   2003-05-13T16:19:42.000Z
library: DataManipulationLib
argString: "array, valueToAdd"
author: Adrian Lynch
authorEmail: adrian.l@thoughtbubble.net
version: 1
cfVersion: CF5
shortDescription: Removes the element at index one and inserts a new element at the highest index plus one.
description: |
 Deletes the first element in a given array, then inserts a new element at the end of the array, creating a first in first out effect.

returnValue: Returns an array.

example: |
 <cfset myArray = ArrayNew(1)>
 
 <cfset myArray[1] = "First In"> 
 <cfset myArray[2] = "Second In"> 
 <cfset myArray[3] = "Third In"> 
 <cfset myArray[4] = "Fourth In">
 
 <cfoutput>
 Before:<br>
 <cfloop from="1" to="#ArrayLen(myArray)#" index="i">
    #myArray[i]#<br>
 </cfloop>
 </cfoutput>
 
 <cfset myArray = FirstInFirstOut( myArray, "New Value" )>
 
 <cfoutput>
 <br>After:<br>
 <cfloop from="1" to="#ArrayLen(myArray)#" index="i">
    #myArray[i]#<br>
 </cfloop>
 </cfoutput>

args:
 - name: array
   desc: Array to modify.
   req: true
 - name: valueToAdd
   desc: Value to add.
   req: true


javaDoc: |
 /**
  * Removes the element at index one and inserts a new element at the highest index plus one.
  * 
  * @param array      Array to modify. (Required)
  * @param valueToAdd      Value to add. (Required)
  * @return Returns an array. 
  * @author Adrian Lynch (adrian.l@thoughtbubble.net) 
  * @version 1, May 13, 2003 
  */

code: |
 function FirstInFirstOut( array, valueToAdd ) {
 
     // Delete element at index 1
     ArrayDeleteAt( array, 1 );
     
     // Add new element at last index plus one
     array[ArrayLen( array ) + 1] = valueToAdd;
     
     return array;
     
 }

---

