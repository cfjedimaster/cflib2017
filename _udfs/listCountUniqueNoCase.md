---
layout: udf
title:  listCountUniqueNoCase
date:   2007-11-14T13:04:56.000Z
library: StrLib
argString: "lst"
author: Al Everett
authorEmail: everett.al@gmail.com
version: 1
cfVersion: CF5
shortDescription: Count unique items in a list. (Case-insensitive)
description: |
 Counts the unique items in a list. Useful when you don't need to de-dupe a list.

returnValue: Returns a number.

example: |
 <cfset myList="a,A,B,C,D,d,d,E,e">
 <cfoutput>#listCountUniqueNoCase(myList)# unique item(s) in a list of #listLen(myList)# item(s).</cfoutput>

args:
 - name: lst
   desc: List to parse.
   req: true


javaDoc: |
 /**
  * Count unique items in a list. (Case-insensitive)
  * 
  * @param lst      List to parse. (Required)
  * @return Returns a number. 
  * @author Al Everett (everett.al@gmail.com) 
  * @version 1, November 14, 2007 
  */

code: |
 function listCountUniqueNoCase(lst) {
   var i         = 0;
   var delim     = ",";
   var countList = "";
   var lstArray  = "";
 
   if (arrayLen(arguments) gt 1) delim = arguments[2];
     
   lstArray = listToArray(lst,delim);
     
   for (i = 1; i LTE arrayLen(lstArray); i = i + 1) {
     if (listFindNoCase(countList,lstArray[i],delim) eq 0) {
       countList=listAppend(countList,lstArray[i]);
     }
   }
 
   return listLen(countList);
 }

---

