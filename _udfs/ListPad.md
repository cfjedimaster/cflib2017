---
layout: udf
title:  ListPad
date:   2001-12-07T20:14:46.000Z
library: StrLib
argString: "list, char, strLen[, delimiter]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Applys padding to each element in a list.
tagBased: false
description: |
 Applys padding to each element in a list.  Padding is applied to each element so that all elements have the same length.  If an element in the list has a greater length than that specified in the strLen parameter, no padding is applied to the element.

returnValue: Returns a list.

example: |
 <CFSET x="1234567,23,2354,45,7435,23,2,5352,353455,2298744,274,9,04">
 
 <CFOUTPUT>
 #ListPad(x, 0, 7)#
 </CFOUTPUT>

args:
 - name: list
   desc: List to apply the padding to.
   req: true
 - name: char
   desc: Character to use as the padding.
   req: true
 - name: strLen
   desc: Length to pad each list item out to.  No padding will be applied oif the length of the list item is greater than or equal to strLen.
   req: true
 - name: delimiter
   desc: Delimiter for the list.  Default is the comma.
   req: false


javaDoc: |
 /**
  * Applys padding to each element in a list.
  * 
  * @param list      List to apply the padding to. 
  * @param char      Character to use as the padding. 
  * @param strLen      Length to pad each list item out to.  No padding will be applied oif the length of the list item is greater than or equal to strLen. 
  * @param delimiter      Delimiter for the list.  Default is the comma. 
  * @return Returns a list. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, December 7, 2001 
  */

code: |
 function ListPad(list, char, strLen)
 {
   Var PaddedList = "";
   Var PadLen = 0;
   Var Delimiter = ",";
   Var i=0;
   if (ArrayLen(arguments) gt 3){
     Delimiter = arguments[4];
   }
   for (i=1; i LTE ListLen(list, delimiter); i=i+1){
     PadLen = strLen-Len(ListGetAt(list, i, delimiter));
     if (PadLen GTE 0){
           PaddedList = ListAppend(PaddedList, RepeatString(char, PadLen) & ListGetAt(list, i, delimiter), delimiter);
     }
     else {
       PaddedList = ListAppend(PaddedList, ListGetAt(list, i, delimiter), delimiter);
     }
   }
   Return PaddedList;
 }

---

