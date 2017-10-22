---
layout: udf
title:  ListRight
date:   2002-04-24T16:35:42.000Z
library: StrLib
argString: "list, numElements[, delimiter]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: A Right() function for lists.  Returns the n rightmost elements from the specified list.
tagBased: false
description: |
 A Right() function for lists.  Returns the n rightmost elements from the specified list.  Accepts an optional delimiter.  Note that if the number of elements to return is greater than the number of elements in the list, the UDF simply returns all elements.

returnValue: Returns a string.

example: |
 <CFSET List="1,2,3,4,5,6,7,8,9,10">
 <CFSET List2="a,b,c,d,e,f,g,h">
 
 <CFOUTPUT>
 #ListRight(List, 3)#<BR>
 #ListRight(List2, 50)#
 </CFOUTPUT>

args:
 - name: list
   desc: List you want to return the n rightmost elements from.
   req: true
 - name: numElements
   desc: Number of rightmost elements you want returned.
   req: true
 - name: delimiter
   desc: Delimiter for the list.  Default is the comma.
   req: false


javaDoc: |
 /**
  * A Right() function for lists.  Returns the n rightmost elements from the specified list.
  * 
  * @param list      List you want to return the n rightmost elements from. 
  * @param numElements      Number of rightmost elements you want returned. 
  * @param delimiter      Delimiter for the list.  Default is the comma. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, April 24, 2002 
  */

code: |
 function ListRight(list, numElements){
   var tempList="";
   var i=0;
   var delimiter=",";
   var totalLen=0;
   if (ArrayLen(arguments) gt 2){
     delimiter = arguments[3];
   }
   if (numElements gt ListLen(list, delimiter)){
     return list;
   }
   totalLen=ListLen(list, delimiter);
   for (i=(totalLen-numElements)+1; i LTE totalLen; i=i+1){
     tempList=ListAppend(tempList, ListGetAt(list, i, delimiter), delimiter);
   }
   return tempList;
 }

---

