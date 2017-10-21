---
layout: udf
title:  ListRemoveDuplicates
date:   2005-08-22T12:09:31.000Z
library: StrLib
argString: "lst[, delim]"
author: Keith Gaughan
authorEmail: keith@digital-crew.com
version: 1
cfVersion: CF5
shortDescription: Remove duplicates from a list.
description: |
 This is a faster alternative to the listDeleteDuplicates() currently in CFLib. It does the same thing, but uses a struct as a set so as to remove the duplicate elements. However, this loses the original order of the list.

returnValue: Returns a string.

example: |
 <cfoutput>#listRemoveDuplicates("a,list,with,a,few,duplicates")#</cfoutput>

args:
 - name: lst
   desc: List to parse.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Remove duplicates from a list.
  * 
  * @param lst      List to parse. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Keith Gaughan (keith@digital-crew.com) 
  * @version 1, August 22, 2005 
  */

code: |
 function listRemoveDuplicates(lst) {
     var i       = 0;
     var delim   = ",";
     var asArray = "";
     var set     = StructNew();
 
     if (ArrayLen(arguments) gt 1) delim = arguments[2];
 
     asArray = ListToArray(lst, delim);
     for (i = 1; i LTE ArrayLen(asArray); i = i + 1) set[asArray[i]] = "";
 
     return structKeyList(set, delim);
 }

---

