---
layout: udf
title:  ListCountSubstring
date:   2003-06-03T11:19:07.000Z
library: StrLib
argString: "lst, str[, delim]"
author: John King
authorEmail: arocheking@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Counts the number of list elements that contain a given substring.
description: |
 Modified from Peini Wu's CountIt(). This version works on lists.

returnValue: Returns a number.

example: |
 <CFSET LST = "trip,trim,trombone">
 <CFOUTPUT>
 LST = #LST#<BR>
 ListCountSubstring(LST,"tr") = 
 #ListCountSubstring(LST,"tr")#<BR>
 ListCountSubstring(LST,"tri") = 
 #ListCountSubstring(LST,"tri")#<BR>
 </CFOUTPUT>

args:
 - name: lst
   desc: List to search.
   req: true
 - name: str
   desc: Substring to search for.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Counts the number of list elements that contain a given substring.
  * 
  * @param lst      List to search. (Required)
  * @param str      Substring to search for. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a number. 
  * @author John King (arocheking@yahoo.com) 
  * @version 1, June 3, 2003 
  */

code: |
 function ListCountSubstring(lst, str) {
   var pos = 1;
   var count = 0;
   var newlst = "";
   var delim = ",";
 
   if(arrayLen(arguments) gte 3) delim = arguments[3];
 
   newlst = lst; //list to work on
   while(pos neq 0){
     pos = listContainsNoCase(newlst, str, delim);
     if (pos neq 0){ 
       newlst = listDeleteAt(newlst,pos,delim);
       count = count + 1;
     }
   }
   return count;
 }

---

