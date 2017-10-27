---
layout: udf
title:  ListUnion
date:   2001-11-14T20:11:05.000Z
library: StrLib
argString: "List1, List2[, Delim1][, Delim2][, Delim3][, SortType][, SortOrder]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Combines two lists, automatically removing duplicate values and returning a sorted list.
tagBased: false
description: |
 Combines two lists, automatically removing duplicate values.  Allows for optional delimiters for all lists.  Also allows for optional sort type and sort order.

returnValue: Returns a string.

example: |
 <CFSET List1="20,13,15,18,12,19,11,13,13,14,20,21,11,14">
 <CFSET List2="10|2|3|4|4|4|4|5|6|1|7|8|8|9|10">
 
 <CFOUTPUT>
 List1: #List1#<BR>
 List2: #List2#<BR>
 <P>
 Union: #ListUnion(List1,List2, ",", "|", ":", "numeric", "asc")#
 </CFOUTPUT>

args:
 - name: List1
   desc: First list of delimited values.
   req: true
 - name: List2
   desc: Second list of delimited values.
   req: true
 - name: Delim1
   desc: Delimiter used for List1.  Default is the comma.
   req: false
 - name: Delim2
   desc: Delimiter used for List2.  Default is the comma.
   req: false
 - name: Delim3
   desc: Delimiter to use for the list returned by the function.  Default is the comma.
   req: false
 - name: SortType
   desc: Type of sort&#58;  Text or Numeric.  The default is Text.
   req: false
 - name: SortOrder
   desc: Asc for ascending, DESC for descending.  Default is Asc
   req: false


javaDoc: |
 /**
  * Combines two lists, automatically removing duplicate values and returning a sorted list.
  * 
  * @param List1      First list of delimited values. 
  * @param List2      Second list of delimited values. 
  * @param Delim1      Delimiter used for List1.  Default is the comma. 
  * @param Delim2      Delimiter used for List2.  Default is the comma. 
  * @param Delim3      Delimiter to use for the list returned by the function.  Default is the comma. 
  * @param SortType      Type of sort:  Text or Numeric.  The default is Text. 
  * @param SortOrder      Asc for ascending, DESC for descending.  Default is Asc 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 14, 2001 
  */

code: |
 function ListUnion(List1, List2)
 {
   var TempList = "";
   var CombinedList = "";  
   Var SortType="text";
   Var SortOrder="asc";
   var Delim1 = ",";
   var Delim2 = ",";
   var Delim3 = ",";
   var i = 0;
   // Handle optional arguments
   switch(ArrayLen(arguments)) {
     case 3:
       {
         Delim1    = Arguments[3];
         break;
       }
     case 4:
       {
         Delim1    = Arguments[3];
         Delim2    = Arguments[4];        
         break;
       }
     case 5:
       {
         Delim1    = Arguments[3];
         Delim2    = Arguments[4];        
         Delim3    = Arguments[5];  
         break;
       }       
     case 6:
       {
         Delim1    = Arguments[3];
         Delim2    = Arguments[4];        
         Delim3    = Arguments[5];  
         SortType  = Arguments[6];
         break;
       }       
     case 7:
       {
         Delim1    = Arguments[3];
         Delim2    = Arguments[4];        
         Delim3    = Arguments[5];  
         SortType  = Arguments[6];
         SortOrder = Arguments[7];
         break;
       }                    
   } 
   
   // Combine list 1 and list 2 with the proper delimiter
   CombinedList = ListChangeDelims(List1, Delim3, Delim1) & Delim3 &  ListChangeDelims(List2, Delim3, Delim2);
   // Strip duplicates if indicated
   for (i=1; i LTE ListLen(CombinedList, Delim3); i=i+1) {
     if (NOT ListFindNoCase(TempList, ListGetAt(CombinedList, i, Delim3), Delim3)){
      TempList = ListAppend(TempList, ListGetAt(CombinedList, i, Delim3), Delim3);
     }
   }
   Return ListSort(TempList, SortType, SortOrder, Delim3);
 }

oldId: 371
---

