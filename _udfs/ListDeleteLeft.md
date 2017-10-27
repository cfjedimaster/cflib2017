---
layout: udf
title:  ListDeleteLeft
date:   2002-04-24T16:41:45.000Z
library: StrLib
argString: "list, numElements[, delimiter]"
author: Shaun Ambrose
authorEmail: shaun.ambrose@arcorsys.com
version: 1
cfVersion: CF5
shortDescription: Deletes the n leftmost elements from the specified list.
tagBased: false
description: |
 Deletes the n leftmost elements from the specified list. Accepts an optional delimiter. Note that if the number of elements to delete is greater than the number of elements in the list, the UDF returns an empty string.

returnValue: Returns a string.

example: |
 <cfset list="a,b,c,d,e,f,g">
 
 <cfoutput>
 #ListDeleteLeft(list, 3)#
 </cfoutput>

args:
 - name: list
   desc: The list to modify.
   req: true
 - name: numElements
   desc: The number of elements to delete from the left hand side.
   req: true
 - name: delimiter
   desc: The delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Deletes the n leftmost elements from the specified list.
  * Modified by RCamden
  * 
  * @param list      The list to modify. 
  * @param numElements      The number of elements to delete from the left hand side. 
  * @param delimiter      The delimiter to use. Defaults to a comma. 
  * @return Returns a string. 
  * @author Shaun Ambrose (shaun.ambrose@arcorsys.com) 
  * @version 1, April 24, 2002 
  */

code: |
 function ListDeleteLeft(list, numElements) {
     var i=0;
     var delimiter=",";
     
     if (Arraylen(arguments) gt 2) {
         delimiter=arguments[3];
     }
         
     if (numElements gt ListLen(list, delimiter)) return "";
     
     for (i=1; i lte numElements; i=i+1) {
         list=listDeleteAt(list, 1, delimiter);
     }
     return list;
 }

oldId: 604
---

