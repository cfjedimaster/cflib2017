---
layout: udf
title:  listFindMaxOccurance
date:   2005-02-23T15:51:54.000Z
library: StrLib
argString: "list[, delim]"
author: Qasim Rasheed
authorEmail: qasimrasheed@hotmail.com
version: 2
cfVersion: CF5
shortDescription: This function will return the item with the most occurances in a list.
description: |
 This function will return the item with the most occurances in a list.

returnValue: Returns a string.

example: |
 <cfset list = "A1,A2,A3,A1,A3,A1,A2,A1,A1">
 <cfset temp = listFindMaxOccurance(list)>
 <cfdump var="#temp#">

args:
 - name: list
   desc: The list to check.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * This function will return the item with the most occurances in a list.
  * V2 by Raymond Camden
  * 
  * @param list      The list to check. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Qasim Rasheed (qasimrasheed@hotmail.com) 
  * @version 2, February 23, 2005 
  */

code: |
 function listFindMaxOccurance(list){
     var i = "";
     var delim = ",";
     var maxitem = "";
     var maxcount = 0;
     var thisItem = "";
     if(arrayLen(arguments) gte 2) delim = arguments[2];
         
     for(i=1;i lte listLen(list,delim );i=i+1) {
         thisItem = listGetAt(list,i,delim);
         if(listValueCount(list,thisItem,delim) gt maxcount) {
             maxcount = listValueCount(list,thisItem,delim);
             maxitem = thisItem;
         }
     }
     return maxitem;
 }

---

