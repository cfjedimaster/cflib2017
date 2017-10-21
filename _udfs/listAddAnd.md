---
layout: udf
title:  listAddAnd
date:   2003-07-07T11:44:19.000Z
library: StrLib
argString: "list[, delimiter]"
author: Deanna Schneider
authorEmail: deanna.schneider@ces.uwex.edu
version: 2
cfVersion: CF5
shortDescription: Returns a list as an &quot;English language&quot; list.
description: |
 Accepts lists with any delimiter, and returns a list with elements separated by a comma-space. Inserts an &quot;and&quot; before the last list element.

returnValue: Returns a string.

example: |
 <cfset mylist = "1,2,3">
 <cfset myotherlist = "A-B-C">
 <cfset mylist2 = "1,2">
 <cfset mylist3 = "1">
 <cfoutput>
 #listAddAnd(mylist)#<br>
 #listAddAnd(myotherlist, "-")#<br>
 #listAddAnd(mylist2)#<br>
 #listAddAnd(mylist3)#<br>
 </cfoutput>

args:
 - name: list
   desc: List to format.
   req: true
 - name: delimiter
   desc: Delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns a list as an &quot;English language&quot; list.
  * 
  * @param list      List to format. (Required)
  * @param delimiter      Delimiter to use. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Deanna Schneider (deanna.schneider@ces.uwex.edu) 
  * @version 2, July 7, 2003 
  */

code: |
 function listAddAnd(list) {
   var i = 1;
   var delimiter = ',';
   var returnValue = '';
   if(ArrayLen(arguments) GTE 2)
     delimiter = arguments[2];
   list = ListToArray(list, delimiter);
   if(arrayLen(list) eq 1) return list[1];
   if(arrayLen(list) eq 2) return list[1] & ' and ' & list[2];
 
   for(i = 1; i LTE ArrayLen(list); i = i + 1)
   if (i LTE (Arraylen(list) - 1)) returnValue = returnValue & list[i] & ', ';
   else returnValue = returnValue &   ' and ' & list[i];
   return returnValue;
 }

---

