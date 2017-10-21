---
layout: udf
title:  listVenn
date:   2006-02-14T13:13:26.000Z
library: StrLib
argString: "listA, listB, returnListType[, listADelimiter][, listBDelimiter][, returnListDelimiter]"
author: Christopher Jordan
authorEmail: cjordan@placs.net
version: 1
cfVersion: CF5
shortDescription: Performs venn type operations on two lists.
description: |
 ListVenn requires two lists and a return list type. The possible return list types are:
 AandB (intersection)
 AorB (union)
 AnotB (unique to list A)
 BnotA (unique to list B)
 
 This one UDF accomplishes the tasks currently served by ListCompare, ListInCommon, and ListUnion (with the exception of the sorting option that ListUnion offers).

returnValue: Returns a list.

example: |
 <CFSet ListA = "a|b|c|d|e|f|g|h">
 <CFSet ListB = "a,v,e,g,h,j,q,r,c,m,t,y">
 <CFSet ListC = "">
 
 <CFSet AandB    = listVenn(ListA,ListB,"AandB","|",",","~")>
 <CFSet AorB        = listVenn(ListA,ListB,"AorB","|",",")>
 <CFSet AnotB    = listVenn(ListA,ListB,"AnotB","|",",","+")>
 <CFSet BnotA    = listVenn(ListA,ListB,"BnotA","|",",","-")>
 
 <CFOutput>
     Original lists:<br>
     ListA : #ListA#<br>
     ListB : #ListB#<br>
     
     NewLists:<br>
     AandB : #AandB#<br>
     AorB  : #AorB#<br>
     AnotB : #AnotB#<br>
     BnotA : #BnotA#<br>
 </CFOutput>

args:
 - name: listA
   desc: The first list.
   req: true
 - name: listB
   desc: The second list.
   req: true
 - name: returnListType
   desc: Return list type. Values can be&#58; AandB, AorB, AnotB, BnotA 
   req: true
 - name: listADelimiter
   desc: List A delimiter. Defaults to a comma.
   req: false
 - name: listBDelimiter
   desc: List B delimiter. Defaults to a comma.
   req: false
 - name: returnListDelimiter
   desc: Return list delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Performs venn type operations on two lists.
  * 
  * @param listA      The first list. (Required)
  * @param listB      The second list. (Required)
  * @param returnListType      Return list type. Values can be: AandB, AorB, AnotB, BnotA  (Required)
  * @param listADelimiter      List A delimiter. Defaults to a comma. (Optional)
  * @param listBDelimiter      List B delimiter. Defaults to a comma. (Optional)
  * @param returnListDelimiter      Return list delimiter. Defaults to a comma. (Optional)
  * @return Returns a list. 
  * @author Christopher Jordan (cjordan@placs.net) 
  * @version 1, February 14, 2006 
  */

code: |
 function listVenn(ListA,ListB,ReturnListType){
     var i                    = "";
     var ThisListItem        = "";
     var ListADelimeter        = ",";
     var ListBDelimeter        = ",";
     var ReturnListDelimeter    = ",";
     var ReturnList            = "";
     var TempListA            = ListA;
     var TempListB            = ListB;
     
     
     // Handle optional arguments
     switch(ArrayLen(arguments)) {
         case 4:
         {
             ListADelimeter    = Arguments[4];
             break;
         }
         case 5:
         {
             ListADelimeter        = Arguments[4];
             ListBDelimeter        = Arguments[5];        
             break;
         }       
         case 6:
         {
             ListADelimeter        = Arguments[4];
             ListBDelimeter        = Arguments[5];        
             ReturnListDelimeter = Arguments[6];
             break;
         }
          }
     // change delimeters on both lists to match
     // couldn't get listchangedelims to work, otherwise I'd have used that.
     ListA = "";
     ListB = "";
     for (i = 1; i lte listlen(TempListA,ListADelimeter); i = i + 1){
         ThisListItem = listgetat(TempListA,i,ListADelimeter);
         ListA = ListAppend(ListA,ThisListItem,ReturnListDelimeter);
     }
     for (i = 1; i lte listlen(TempListB,ListBDelimeter); i = i + 1){
         ThisListItem = listgetat(TempListB,i,ListBDelimeter);
         ListB = ListAppend(ListB,ThisListItem,ReturnListDelimeter);
     }
 
     // A and B (aka Intersection)
     if (ReturnListType eq "AandB"){
         for(i = 1; i lte listlen(ListA,ReturnListDelimeter); i = i + 1){
             ThisListItem = listgetat(ListA,i,ReturnListDelimeter);
             if (ListFindNoCase(ListB,thisListItem,ReturnListDelimeter)){
                 ReturnList = ListAppend(ReturnList,ThisListItem,ReturnListDelimeter);
             }
         }
     }
     // A or B (aka Union)
     else if(ReturnListType eq "AorB"){
         ReturnList = ListA;
         ReturnList = ListAppend(ReturnList,ListB,ReturnListDelimeter);
         
     }
     // A not B
     else if (ReturnListType eq "AnotB"){
         for(i = 1; i lte listlen(ListA,ReturnListDelimeter); i = i + 1){
             ThisListItem = listgetat(ListA,i,ReturnListDelimeter);
             if (not ListFindNoCase(ListB,thisListItem,ReturnListDelimeter)){
                 ReturnList = ListAppend(ReturnList,ThisListItem,ReturnListDelimeter);
             }
         }
     }
     // B not A
     else if (ReturnListType eq "BnotA"){
         for(i = 1; i lte listlen(ListB,ReturnListDelimeter); i = i + 1){
             ThisListItem = listgetat(ListB,i,ReturnListDelimeter);
             if (not ListFindNoCase(ListA,thisListItem,ReturnListDelimeter)){
                 ReturnList = ListAppend(ReturnList,ThisListItem,ReturnListDelimeter);
             }
         }
     }
     return ReturnList;
 }

---

