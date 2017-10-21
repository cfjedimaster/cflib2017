---
layout: udf
title:  ListMid
date:   2002-04-11T18:18:23.000Z
library: StrLib
argString: "list, startPos, numElements[, delimiter]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: A Mid() function for lists.  Returns n elements starting at the specified start position.
description: |
 A Mid() function for lists.  Returns n elements starting at the specified start position.  Accepts an optional delimiter.  Note that if the number of elements to return is greater than the number of elements in the list, the UDF simply returns all elements.

returnValue: Returns a string.

example: |
 <CFSET List="1,2,3,4,5,6,7,8,9,10">
 <CFSET List2="a;b;c;d;e;f;g;h">
 
 <CFOUTPUT>
 #ListMid(List, 3, 5)#<BR>
 #ListMid(List, 3, 99)#<BR>
 #ListMid(List2, 2, 16, ";")#<BR>
 </CFOUTPUT>

args:
 - name: list
   desc: List you want to return the elements from.
   req: true
 - name: startPos
   desc: Starting position in the list to begin returning from.
   req: true
 - name: numElements
   desc: Number of elements you want returned.
   req: true
 - name: delimiter
   desc: Delimiter for the list.  Default is the comma.
   req: false


javaDoc: |
 /**
  * A Mid() function for lists.  Returns n elements starting at the specified start position.
  * 3/25/02: Removed a line of extraneous code.
  * 4/11/02: Fixed problem with going past end of list.
  * 
  * @param list      List you want to return the elements from. 
  * @param startPos      Starting position in the list to begin returning from. 
  * @param numElements      Number of elements you want returned. 
  * @param delimiter      Delimiter for the list.  Default is the comma. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.1, April 11, 2002 
  */

code: |
 function ListMid(list, startPos, numElements){
   var tempList="";
   var i=0;
   var delimiter=",";
   var finish = startPos+numElements;
   if (ArrayLen(arguments) gt 3)
     delimiter = arguments[4];
   if (startPos+numElements gt ListLen(list, delimiter))
     finish = ListLen(list, delimiter)+1;
   for (i=startPos; i LT finish; i=i+1){
     tempList=ListAppend(tempList, ListGetAt(list, i, delimiter), delimiter);
   }
   return tempList;
 }

---

