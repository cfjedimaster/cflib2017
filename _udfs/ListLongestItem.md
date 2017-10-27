---
layout: udf
title:  ListLongestItem
date:   2004-09-21T19:46:08.000Z
library: StrLib
argString: "list[, delim]"
author: Joseph Flanigan
authorEmail: joseph@switch-box.org
version: 1
cfVersion: CF5
shortDescription: Returns the first occurrence of the longest item  in  a list.
tagBased: false
description: |
 Returns the first occurrence of the longest item  in  a list.

returnValue: Returrns a string.

example: |
 <cfscript>
 myList = "CFLib has the greatest collection of UDF functions.";
 writeoutput(ListLongestItem(myList," "));
 </cfscript>

args:
 - name: list
   desc: The list to parse.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns the first occurrence of the longest item  in  a list.
  * 
  * @param list      The list to parse. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returrns a string. 
  * @author Joseph Flanigan (joseph@switch-box.org) 
  * @version 1, September 21, 2004 
  */

code: |
 function listLongestItem(list){
     var delim = ","; 
     var item = "";
     var i = 0;
     
     if(arrayLen(arguments) EQ 2) delim = arguments[2];
     for(i = 1 ; i lte listLen(list,delim); i = i + 1 )  {
         if (len(listGetAt(list,i,delim)) gt len(item)) item = listGetAt(list,i,delim); 
     }
     return item; 
 }

oldId: 1128
---

