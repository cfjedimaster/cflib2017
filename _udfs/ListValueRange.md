---
layout: udf
title:  ListValueRange
date:   2001-08-27T13:04:42.000Z
library: StrLib
argString: "min, max[, delimiter]"
author: Brad Breaux
authorEmail: bbreaux@blipz.com
version: 1
cfVersion: CF5
shortDescription: Returns a comma delimited list filled with the positive intergers from the specified range.
tagBased: false
description: |
 Returns a comma delimited list filled with the positive intergers from the specified range.

returnValue: Returns a string (delimited list).

example: |
 <CFOUTPUT>
  #ListValueRange(1,45)#
 </CFOUTPUT>

args:
 - name: min
   desc: Minimum positive integer of range.
   req: true
 - name: max
   desc: Maximum positive integer  of range.
   req: true
 - name: delimiter
   desc: Delimiter for the list of returned values.  Default is the comma.
   req: false


javaDoc: |
 /**
  * Returns a comma delimited list filled with the positive intergers from the specified range.
  * Minor modifications by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param min      Minimum positive integer of range. 
  * @param max      Maximum positive integer  of range. 
  * @param delimiter      Delimiter for the list of returned values.  Default is the comma. 
  * @return Returns a string (delimited list). 
  * @author Brad Breaux (bbreaux@blipz.com) 
  * @version 1, August 27, 2001 
  */

code: |
 function ListValueRange(min,max)
 {
   Var cnt=0;
   Var outstring="";
   Var delimiter=",";
   if (ArrayLen(arguments) eq 3){
     Delimiter = arguments[3];
   }
   for(cnt=min;cnt lte max;cnt=cnt+1){
     if (cnt eq 1){
       outstring=""&cnt;
     }
     else{
       outstring=""&outstring&","&cnt;
     }
   }
   return outstring;
 }

oldId: 205
---

