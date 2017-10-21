---
layout: udf
title:  ListDeleteMid
date:   2002-04-24T16:35:47.000Z
library: StrLib
argString: "list, startPos, numElements[, delimiter]"
author: Shaun Ambrose
authorEmail: shaun.ambrose@arcorsys.com
version: 1
cfVersion: CF5
shortDescription: Deletes n elements starting at the specified start position.
description: |
 Deletes n elements starting at the specified start position. Accepts an optional delimiter. Note that if the number of items to delete at startPos is greater than the length of the list, the function will remove delete all items from startPos onward.

returnValue: Returns a string.

example: |
 <cfset list="a,b,c,d,e,f,g">
 
 <cfoutput>
 #ListDeleteMid(list, 3, 1)#
 </cfoutput>

args:
 - name: list
   desc: The list to modify.
   req: true
 - name: startPos
   desc: The starting position.
   req: true
 - name: numElements
   desc: Number of items to delete, including item at startPos.
   req: true
 - name: delimiter
   desc: The delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Deletes n elements starting at the specified start position.
  * Modified by RCamden
  * 
  * @param list      The list to modify. 
  * @param startPos      The starting position. 
  * @param numElements      Number of items to delete, including item at startPos. 
  * @param delimiter      The delimiter to use. Defaults to a comma. 
  * @return Returns a string. 
  * @author Shaun Ambrose (shaun.ambrose@arcorsys.com) 
  * @version 1, April 24, 2002 
  */

code: |
 function ListDeleteMid(list, startPos, numElements) {
     var i=0;
     var delimiter=",";
     var finish=startPos+numElements-1;
 
     if (Arraylen(arguments) gt 3) {
         delimiter=arguments[4];
     }
     if (finish gt ListLen(list, delimiter)) {
         finish = listLen(list,delimiter);
       }
     for (i=startPos; i lte finish; i=i+1) {
         list=listDeleteAt(list, startpos, delimiter);
     }
     return list;
 }

---

