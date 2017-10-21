---
layout: udf
title:  listCountListInList
date:   2006-04-07T11:54:55.000Z
library: StrLib
argString: "lst1, lst2"
author: Trevor Orr
authorEmail: fractorr@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Count the number of occurences of items from one list to another list.
description: |
 Count the number of occurences of items from one list to another list.

returnValue: Returns a number.

example: |
 <cfset lst1 = "apples,organes,berries,star wars">
 <cfset lst2 = "berries,coconuts,kameo">
 <cfset cnt = ListCountListInList(lst1, lst2)>
 <cfoutput>#cnt#</cfoutput>

args:
 - name: lst1
   desc: The first list.
   req: true
 - name: lst2
   desc: The second list.
   req: true


javaDoc: |
 /**
  * Count the number of occurences of items from one list to another list.
  * Missing var statement fixed by Raymond Camden.
  * 
  * @param lst1      The first list. (Required)
  * @param lst2      The second list. (Required)
  * @return Returns a number. 
  * @author Trevor Orr (fractorr@yahoo.com) 
  * @version 1, April 7, 2006 
  */

code: |
 function listCountListInList(lst1, lst2) {
     var delim   = ",";
     var cnt     = 0;
     var pos     = 0;
     var item    = "";
     
     if (arrayLen(arguments) gt 2) delim = arguments[3];
         
     for(item=1; item LTE ListLen(lst2); item = item + 1) {
         pos = listFindNoCase(lst1, ListGetAt(lst2, item));
         if(pos) cnt = cnt + 1;
     }
     
     return cnt;
 }

---

