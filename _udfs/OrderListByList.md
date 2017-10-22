---
layout: udf
title:  OrderListByList
date:   2002-10-03T12:34:07.000Z
library: StrLib
argString: "list1, list2[, delim1][, delim2][, delim3]"
author: Erik Madsen
authorEmail: emadsenus@yahoo.com
version: 2
cfVersion: CF5
shortDescription: Reorders a list to the order of another, placing elements from the complete list not found in the second at the end of the reordered list.
tagBased: false
description: |
 Reorders a list to the order of another, placing elements from the complete list not found in the second at the end of the reordered list.

returnValue: Returns a list.

example: |
 <cfset complete = "a/b/c/d/e/f/g/h/i">
 
 <cfset orderby = "e\d\c\b">
 
 <Cfoutput>
 #complete# to #orderby# = <br>
 #OrderListByList(complete, orderby, "/", "\")#
 </CFOUTPUT>

args:
 - name: list1
   desc: Initial list.
   req: true
 - name: list2
   desc: List to use for ordering.
   req: true
 - name: delim1
   desc: Delimiter for list1. Defaults to comma.
   req: false
 - name: delim2
   desc: Delimiter for list2. Defaults to comma.
   req: false
 - name: delim3
   desc: Delimiter to use for returned list. Defaults to comma.
   req: false


javaDoc: |
 /**
  * Reorders a list to the order of another, placing elements from the complete list not found in the second at the end of the reordered list.
  * 
  * @param list1      Initial list. (Required)
  * @param list2      List to use for ordering. (Required)
  * @param delim1      Delimiter for list1. Defaults to comma. (Optional)
  * @param delim2      Delimiter for list2. Defaults to comma. (Optional)
  * @param delim3      Delimiter to use for returned list. Defaults to comma. (Optional)
  * @return Returns a list. 
  * @author Erik Madsen (emadsenus@yahoo.com) 
  * @version 2, October 3, 2002 
  */

code: |
 function OrderListByList(List1, List2) {
      var ExtraList = "";
     var ResultList = "";
       var Delim1 = ",";
       var Delim2 = ",";
       var Delim3 = ",";
       var i = 0;
     var j = 0;
     var o = 1;
     var o2 = 1;
     
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
     for (i=1; i LTE ListLen(List2, "#Delim2#"); i=i+1)
     {
          if (ListFindNoCase(List1, ListGetAt(List2, i, "#Delim2#"), "#Delim1#")){
              for(o=1; o LTE ListValueCount(List1, ListGetAt(List2, i, "#Delim2#") , "#Delim1#"); o=o+1){
                  ResultList = ListAppend(ResultList, ListGetAt(List2, i, "#Delim2#"), "#Delim3#");
             }
          }
     }
     for (j=1; j LTE ListLen(List1, "#Delim1#"); j=j+1)
     {
          if (not ListFindNoCase(ResultList, ListGetAt(List1, j, "#Delim1#"), "#Delim3#")){
              for(o2=1; o2 LTE ListValueCount(List1, ListGetAt(List1, j, "#Delim1#") , "#Delim1#"); o2=o2+1){
                  ResultList = ListAppend(ResultList, ListGetAt(List1, j, "#Delim1#"), "#Delim3#");
             }
          }
     }
     Return ResultList;
  }

---

