---
layout: udf
title:  ListLeft
date:   2002-04-24T16:34:51.000Z
library: StrLib
argString: "list, numElements[, delimiter]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: A Left() function for lists.  Returns the n leftmost elements from the specified list.
description: |
 A Left() function for lists.  Returns the n leftmost elements from the specified list.  Accepts an optional delimiter.  Note that if the number of elements to return is greater than the number of elements in the list, the UDF simply returns all elements.

returnValue: Returns a string,

example: |
 <CFSET List="1,2,3,4,5,6,7,8,9,10">
 <CFSET List2="a,b,c,d,e,f,g,h">
 
 <CFOUTPUT>
 #ListLeft(List, 3)#<BR>
 #ListLeft(List2, 50)#
 </CFOUTPUT>

args:
 - name: list
   desc: List you want to return the n leftmost elements from.
   req: true
 - name: numElements
   desc: Number of leftmost elements you want returned.
   req: true
 - name: delimiter
   desc: Delimiter for the list.  Default is the comma.
   req: false


javaDoc: |
 /**
  * A Left() function for lists.  Returns the n leftmost elements from the specified list.
  * 
  * @param list      List you want to return the n leftmost elements from. 
  * @param numElements      Number of leftmost elements you want returned. 
  * @param delimiter      Delimiter for the list.  Default is the comma. 
  * @return Returns a string, 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, April 24, 2002 
  */

code: |
 function ListLeft(list, numElements){
   var tempList="";
   var i=0;
   var delimiter=",";
   if (ArrayLen(arguments) gt 2){
     delimiter = arguments[3];
   }
   if (numElements gte ListLen(list, delimiter)){
     return list;
   }
   for (i=1; i LTE numElements; i=i+1){
     tempList=ListAppend(tempList, ListGetAt(list, i, delimiter), delimiter);
   }
   return tempList;
 }

---

