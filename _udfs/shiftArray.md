---
layout: udf
title:  shiftArray
date:   2005-08-16T12:13:31.000Z
library: DataManipulationLib
argString: "inArray, shiftOnValue"
author: Richard Nugen
authorEmail: richard@corporatemedia.com
version: 1
cfVersion: CF5
shortDescription: Returns a shifted array at the passed Shift On value.
description: |
 Allows you to move an array index and the remaining indexes below it to the top of an array. Extremly helpful in building grid based outputs such as calendars.

returnValue: Returns an array.

example: |
 <cfset dowArray = arrayNew(1)>
 <cfloop index="x" from="1" to="7">
     <cfset arrayAppend(dowArray,x)>
 </cfloop>
 
 <cfloop index="x" from="1" to="7">
     <cfdump var="#shiftArray(dowArray,x)#">
 </cfloop>

args:
 - name: inArray
   desc: Array to shift.
   req: true
 - name: shiftOnValue
   desc: Index to shift.
   req: true


javaDoc: |
 /**
  * Returns a shifted array at the passed Shift On value.
  * 
  * @param inArray      Array to shift. (Required)
  * @param shiftOnValue      Index to shift. (Required)
  * @return Returns an array. 
  * @author Richard Nugen (richard@corporatemedia.com) 
  * @version 1, August 16, 2005 
  */

code: |
 function shiftArray(inArray,ShiftOnVal) {
     var tmpArray = arrayNew(1);
     var x = 0;
         
     for(x=1; x lte arrayLen(inArray); x=x+1) {
         if(inArray[x] EQ ShiftOnVal) { break; }
         else {
             arrayAppend(tmpArray,inArray[x]);
             arrayDeleteAt(inArray,x);
             x=0;
         }
     }
 
     for(x=1;x lte arrayLen(tmpArray); x=x+1) arrayAppend(inArray,tmpArray[x]);
         
     return inArray;
 }

---

