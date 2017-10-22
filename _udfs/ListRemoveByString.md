---
layout: udf
title:  ListRemoveByString
date:   2002-06-21T17:10:57.000Z
library: StrLib
argString: "list, str[, mode][, delim]"
author: Markus Schneebeli
authorEmail: markus.schneebeli@inm.ch
version: 2
cfVersion: CF5
shortDescription: Removes values from a list by string pattern.
tagBased: false
description: |
 Removes list values which contain the string provided when mode is true (default). Removes list values which don't contain the string provided when mode is false.

returnValue: Returns a string.

example: |
 <cfset list = "TestLib, CustomLib, Demo, New">
 <cfoutput>
 Before: #list#<br>
 After: #ListRemoveByString(list, "Lib")#<br>
 </cfoutput>

args:
 - name: list
   desc: The list to modify.
   req: true
 - name: str
   desc: The string to look for.
   req: true
 - name: mode
   desc: If true, removes matches. If false, keeps matches. The default is true.
   req: false
 - name: delim
   desc: The delimiter to use. Default is comma.
   req: false


javaDoc: |
 /**
  * Removes values from a list by string pattern.
  * Mods by RCamden
  * 
  * @param list      The list to modify. (Required)
  * @param str      The string to look for. (Required)
  * @param mode      If true, removes matches. If false, keeps matches. The default is true. (Optional)
  * @param delim      The delimiter to use. Default is comma. (Optional)
  * @return Returns a string. 
  * @author Markus Schneebeli (markus.schneebeli@inm.ch) 
  * @version 2, June 21, 2002 
  */

code: |
 function ListRemoveByString(list, str) {
     var i = listLen(list);
     var mode = true;
     var delim = ",";
     
     if(arrayLen(arguments) gte 3) mode = arguments[3];
     if(arrayLen(arguments) gte 4) delim = arguments[4];
     
     for (i=ListLen(list, delim); i gte 1 ; i=i-1) {
         if(  (mode and findNoCase(str,listGetAt(list,i,delim))) or (not mode and not findNoCase(str,listGetAt(list,i,delim)))) list = listDeleteAt(list,i,delim);
     }
     return list;
 }

---

