---
layout: udf
title:  removeNullAndDangleDelimFromList
date:   2010-03-07T06:01:10.000Z
library: StrLib
argString: "lst[, delim]"
author: Bharat Patel
authorEmail: bharat@isummation.com
version: 0
cfVersion: CF5
shortDescription: Remove null element and dangel delimiter from the list
description: |
 This is the simplest way to remove null element and dangle delimiter from the given list.

returnValue: Returns a string.

example: |
 <cfset List1 = '1,2,,CF,,Oracle,Sql,,7,'>
 <cfoutput>
     #List1#<br />
     #removeNullAndDangleDelimFromList(List1,',')#    
 </cfoutput>

args:
 - name: lst
   desc: list to remove null elements and dangling delimiter
   req: true
 - name: delim
   desc: list delimiter, defaults to comma ","
   req: false


javaDoc: |
 /**
  * Remove null element and dangel delimiter from the list
  * 
  * @param lst      list to remove null elements and dangling delimiter (Required)
  * @param delim      list delimiter, defaults to comma "," (Optional)
  * @return Returns a string. 
  * @author Bharat Patel (bharat@isummation.com) 
  * @version 0, March 7, 2010 
  */

code: |
 function removeNullAndDangleDelimFromList(lst){
     var listDelim=",";
     if (arraylen(arguments) gt 1)
         listDelim=arguments[2];
     return ArrayToList(ListToArray(arguments.lst,listDelim));
 }

---

