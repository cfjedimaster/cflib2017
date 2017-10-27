---
layout: udf
title:  listCountUnique
date:   2007-11-14T13:04:20.000Z
library: StrLib
argString: "lst"
author: Al Everett
authorEmail: everett.al@gmail.com
version: 1
cfVersion: CF5
shortDescription: Count unique items in a list. (Case-sensitive)
tagBased: false
description: |
 Counts the unique items in a list. Useful when you don't need to de-dupe a list.

returnValue: Returns a number.

example: |
 <cfset myList="1,1,1,2,3,4,4,4,5">
 <cfoutput>#listCountUnique(myList)# unique item(s) in a list of #listLen(myList)# item(s).</cfoutput>

args:
 - name: lst
   desc: List to parse.
   req: true


javaDoc: |
 /**
  * Count unique items in a list. (Case-sensitive)
  * 
  * @param lst      List to parse. (Required)
  * @return Returns a number. 
  * @author Al Everett (everett.al@gmail.com) 
  * @version 1, November 14, 2007 
  */

code: |
 function listCountUnique(lst) {
   var i         = 0;
   var delim     = ",";
   var countList = "";
   var lstArray  = "";
 
   if (arrayLen(arguments) gt 1) delim = arguments[2];
     
   lstArray = listToArray(lst,delim);
     
   for (i = 1; i LTE arrayLen(lstArray); i = i + 1) {
     if (listFind(countList,lstArray[i],delim) eq 0) {
       countList=listAppend(countList,lstArray[i]);
     }
   }
 
   return listLen(countList);
 }

oldId: 1661
---

