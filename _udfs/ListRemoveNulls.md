---
layout: udf
title:  ListRemoveNulls
date:   2003-05-26T10:45:12.000Z
library: StrLib
argString: "list[, delim]"
author: Craig Fisher
authorEmail: craig@altainteractive.com
version: 1
cfVersion: CF5
shortDescription: Removes null entries from lists.
tagBased: false
description: |
 Rather than replacing null entries with a &quot;countable&quot; value (like NULL) ListRemoveNulls() simply removes then from the list entrely. This is a modified version of the ListFix UDF written by Patrick McElhaney which is a modified version of the ListFix UDFwritten by Raymond Camden.

returnValue: Returns a string.

example: |
 <cfset list1="1,2,,3,4">
 <cfset list2=",1,2,,,,,3,4,,">
 <cfset list3=",,,1,,,,2,,,3,,,,4,">
 <cfoutput>
 List one:#list1#<br>
 List one without nulls: #ListRemoveNulls(list1)#<br>
 List two:#list2#<br>
 List two without nulls: #ListRemoveNulls(list2)#<br>
 List three:#list3#<br>
 List three without nulls: #ListRemoveNulls(list3)#<br>
 
 </cfoutput>

args:
 - name: list
   desc: List to parse.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Removes null entries from lists.
  * 
  * @param list      List to parse. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Craig Fisher (craig@altainteractive.com) 
  * @version 1, May 26, 2003 
  */

code: |
 function ListRemoveNulls(list) {
   var delim = ",";
        
   if(arrayLen(arguments) gt 1) delim = arguments[2];
   while (Find(delim & delim, list) GT 0){
       list = replace(list, delim & delim, delim, "ALL");
   }
   
   if (left(list, 1) eq delim) list = right(list, Len(list) - 1);
   if (right(list, 1) eq delim) list = Left(list, Len(list) - 1);
   return list;
 }

oldId: 919
---

