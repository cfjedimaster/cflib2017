---
layout: udf
title:  ListJuxt
date:   2004-09-20T12:19:41.000Z
library: StrLib
argString: "List1, List2[, Delim1][, Delim2][, Delim3]"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: Juxtaposes two lists together in an &quot;every other value&quot; method.
tagBased: false
description: |
 Juxtaposes two lists together making the first value of list1 the first value of the new list and the first value of list2 the second value of the new list, ad nauseum. Inserts blank values if one list is longer than the other.

returnValue: Returns a string (delimited list of values).

example: |
 <CFSET List1="1;2;3;4;5;6;7">
 <CFSET List2="a,b,c,d,e,f,g">
 <CFSET List3="1,2,3,4,5,6,7">
 <CFSET List4="a,b">
 
 <CFOUTPUT>
 #ListJuxt(List1, List2, ";", ",")#<BR>
 #ListJuxt(List1, List2, ";", ",", "|")#<BR>
 #ListJuxt(List2, List3)#<BR>
 #ListJuxt(List3, List4)#
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


javaDoc: |
 /**
  * Juxtaposes two lists together in an &quot;every other value&quot; method.
  * Minor modifications by Rob Brooks-Bilson (rbils@amkor.com)
  * 
  * @param List1      First list of delimited values. (Required)
  * @param List2      Second list of delimited values. (Required)
  * @param Delim1      Delimiter used for List1.  Default is the comma. (Optional)
  * @param Delim2      Delimiter used for List2.  Default is the comma. (Optional)
  * @param Delim3      Delimiter to use for the list returned by the function.  Default is the comma. (Optional)
  * @return Returns a string (delimited list of values). 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, September 20, 2004 
  */

code: |
 function ListJuxt(list1,list2)
 {
   var i=1;
   var newList="";
   var delim1=",";
   var delim2 = ",";
   var delim3 = ",";
   switch(ArrayLen(arguments)) {
     case 3:
       {
         delim1 = Arguments[3];
         break;
       }
     case 4:
       {
         delim1 = Arguments[3];
         delim2 = Arguments[4];
         break;
       }
     case 5:
       {
         delim1 = Arguments[3];
         delim2 = Arguments[4];          
         delim3 = Arguments[5];
         break;
       }        
   }
 
   for(i=1;i lte Max(ListLen(list1, delim1),ListLen(list2, delim2));i=i+1){
     if(i lte ListLen(list1, delim1)){
       newList=ListAppend(newList,ListGetAt(list1,i,delim1),delim3);
     }
     else{
       newList=ListAppend(newList,"",delim3);
     }
     if(i lte ListLen(list2, delim2)){
       newList=ListAppend(newList,ListGetAt(list2,i,delim2),delim3);
     }
     else{
       newList=ListAppend(newList,"",delim3);
     }
   }
   return newList;
 }

---

