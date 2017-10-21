---
layout: udf
title:  ListInCommon
date:   2001-08-20T11:55:43.000Z
library: StrLib
argString: "List1, List2[, Delim1][, Delim2][, Delim3]"
author: Michael Slatoff
authorEmail: michael@slatoff.com
version: 1
cfVersion: CF5
shortDescription: Returns elements in list1 that are found in list2.
description: |
 Returns elements in list1 that are found in list2.  Based on ListCompare by Rob Brooks-Bilson (rbils@amkor.com) .

returnValue: Returns a delimited list of values.

example: |
 <CFSET FullList = "1;2;3;4;5;6;7;8;9;10">
 <CFSET PartialList = "1,3,5,7,9">
 <CFSET FullList2 = "1,2,3,4,5,6,7,8,9,10">
 <CFSET PartialList2 = "1,3,5,7,9">
 <CFSET FullList3 = "a,b,c,d,e,f,g">
 <CFSET PartialList3 = "a,c">
 
 <CFOUTPUT>
 #ListInCommon(FullList, PartialList, ";", ",", "|")#<BR>
 #ListInCommon(FullList2, PartialList2)#<BR>
 #ListInCommon(FullList3, PartialList3)#<BR>
 </CFOUTPUT>

args:
 - name: List1
   desc: Full list of delimited values. 
   req: true
 - name: List2
   desc: Delimited list of values you want to compare to List1. 
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


javaDoc: |
 /**
  * Returns elements in list1 that are found in list2.
  * Based on ListCompare by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param List1      Full list of delimited values.  
  * @param List2      Delimited list of values you want to compare to List1.  
  * @param Delim1      Delimiter used for List1.  Default is the comma.  
  * @param Delim2      Delimiter used for List2.  Default is the comma.  
  * @param Delim3      Delimiter to use for the list returned by the function.  Default is the comma.  
  * @return Returns a delimited list of values. 
  * @author Michael Slatoff (michael@slatoff.com) 
  * @version 1, August 20, 2001 
  */

code: |
 function ListInCommon(List1, List2)
 {
   var TempList = "";
   var Delim1 = ",";
   var Delim2 = ",";
   var Delim3 = ",";
   var i = 0;
   // Handle optional arguments
   switch(ArrayLen(arguments)) {
     case 3:
       {
         Delim1 = Arguments[3];
         break;
       }
     case 4:
       {
         Delim1 = Arguments[3];
         Delim2 = Arguments[4];
         break;
       }
     case 5:
       {
         Delim1 = Arguments[3];
         Delim2 = Arguments[4];          
         Delim3 = Arguments[5];
         break;
       }        
   } 
    /* Loop through the second list, checking for the values from the first list.
     * Add any elements from the second list that are found in the first list to the
     * temporary list
     */  
   for (i=1; i LTE ListLen(List2, "#Delim2#"); i=i+1) {
     if (ListFindNoCase(List1, ListGetAt(List2, i, "#Delim2#"), "#Delim1#")){
      TempList = ListAppend(TempList, ListGetAt(List2, i, "#Delim2#"), "#Delim3#");
     }
   }
   Return TempList;
 }

---

