---
layout: udf
title:  ListSortByLen
date:   2002-07-02T13:00:50.000Z
library: StrLib
argString: "list[, sortDir][, delimiters]"
author: Rob Baxter
authorEmail: rob@microjuris.com
version: 1
cfVersion: CF5
shortDescription: Sorts a list by the length of its elements.
description: |
 Sorts the elements on a list (either asc or desc, default is &quot;asc&quot;) by their Len() value. Uses bubble sort internally and as such is not recommended for large lists.

returnValue: Returns a string.

example: |
 <cfset list = "55555,1,4444,333,7777777,88888888,22,999999999,666666">
 <cfoutput>
 original list = #list#<br>
 Sorted Ascending = #ListSortByLen(list, "asc", ",")#<br>
 Sorted Descending = #ListSortByLen(list, "desc", ",")#
 </cfoutput>

args:
 - name: list
   desc: The list to sort.
   req: true
 - name: sortDir
   desc: Direction of sort. Default is "asc."
   req: false
 - name: delimiters
   desc: List delimiter. Default is a comma.
   req: false


javaDoc: |
 /**
  * Sorts a list by the length of its elements.
  * 
  * @param list      The list to sort. (Required)
  * @param sortDir      Direction of sort. Default is "asc." (Optional)
  * @param delimiters      List delimiter. Default is a comma. (Optional)
  * @return Returns a string. 
  * @author Rob Baxter (rob@microjuris.com) 
  * @version 1, April 30, 2003 
  */

code: |
 function ListSortByLen(ListToSort) {
     var SortOrder = "asc";
     var Delimiters = ",";
     var ListIsSorted = "no";
     var ListLen = ListLen(ListToSort, Delimiters);
     var CurListItem = "";
     var NextListItem = "";
 
     if (ArrayLen(Arguments) gt 1) SortOrder = Arguments[2];
     
     if (ArrayLen(Arguments) gt 2) Delimiters = Arguments[3];
         
     while (Not ListIsSorted) {
         ListIsSorted = "yes";
         for (N = 1; N+1 lte ListLen; N=N+1) {
             CurListItem = ListGetAt(ListToSort, N, Delimiters);
             NextListItem = ListGetAt(ListToSort, N+1, Delimiters);
             
             if( (sortOrder is "asc" and len(curListItem) gt len(nextListItem)) or (sortOrder is "desc" and len(curListItem) lt len(nextListItem))) {
                 listToSort = listSetAt(listToSort,n,nextListItem,delimiters);
                 listToSort = listSetAt(listToSort,n+1,curListItem,delimiters);
                 ListIsSorted = "no";
             }
         }
     }
     return ListToSort;
 }

---

