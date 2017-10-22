---
layout: udf
title:  ListDeleteRange
date:   2002-04-24T16:48:16.000Z
library: StrLib
argString: "list, from, to[, delimiter]"
author: Shaun Ambrose
authorEmail: shaun.ambrose@arcorsys.com
version: 1
cfVersion: CF5
shortDescription: This function deletes a range of items from a list.
tagBased: false
description: |
 This function deletes a range of items from a list. If the ending position is greater than the length of the list, every item from the starting position until the end of the list is deleted.
 
 The range specified is inclusive.

returnValue: Returns a string.

example: |
 <cfset list="a,b,c,d,e,f">
 
 <cfoutput>
 #listDeleteRange(list, 1, 3)#
 </cfoutput>
 
 Returns:
 d,e,f

args:
 - name: list
   desc: The list to modify.
   req: true
 - name: from
   desc: The position to begin deleting.
   req: true
 - name: to
   desc: The position to stop deleting. 
   req: true
 - name: delimiter
   desc: The delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * This function deletes a range of items from a list.
  * 
  * @param list      The list to modify. 
  * @param from      The position to begin deleting. 
  * @param to      The position to stop deleting.  
  * @param delimiter      The delimiter to use. Defaults to a comma. 
  * @return Returns a string. 
  * @author Shaun Ambrose (shaun.ambrose@arcorsys.com) 
  * @version 1, April 24, 2002 
  */

code: |
 function ListDeleteRange(list, from, to) {
     var delimiter = ",";
     var i = from;
         
     if(arrayLen(arguments) gt 3) {
         delimiter = arguments[4];
     }
     
     if(to gt listLen(list,delimiter)) to = listLen(delimiter);
     
     for(; i lte to; i=i+1) {    
         list=listDeleteAt(list, from, delimiter);
     }
 
     return list;
 }

---

