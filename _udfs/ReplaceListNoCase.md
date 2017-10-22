---
layout: udf
title:  ReplaceListNoCase
date:   2001-12-11T11:59:15.000Z
library: StrLib
argString: "str, list1, list2"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 2
cfVersion: CF5
shortDescription: Replace all occurences of elements in list one with elements in list two. Case insensitive version of ReplaceList.
tagBased: false
description: |
 Returns string with all occurrences of the elements from the specified comma-delimited list being replaced with their corresponding elements from another comma-delimited list. The search is case-insensitive. If an item does not appear in the second list, the item from the first list is replaced with an empty string.
 
 Chr(31) is used to mark empty elements, so if there is the possibility of a string containing (and needing) this character, the function should not be used as is.

returnValue: Returns a modified list.

example: |
 <cfset orig = "It's too soon to say">
 <cfoutput>
 original list: #orig#<br>
 modified list: #ReplaceListNoCase(orig, "it's,soon,say", "early,tell")#
 </cfoutput>

args:
 - name: str
   desc: The string to modify.
   req: true
 - name: list1
   desc: The list of terms to search for.
   req: true
 - name: list2
   desc: The list of corresponding items to use as replacements.
   req: true


javaDoc: |
 /**
  * Replace all occurences of elements in list one with elements in list two. Case insensitive version of ReplaceList.
  * Modified by Raymond Camden
  * 
  * @param str      The string to modify. 
  * @param list1      The list of terms to search for. 
  * @param list2      The list of corresponding items to use as replacements. 
  * @return Returns a modified list. 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 2, December 11, 2001 
  */

code: |
 function ReplaceListNoCase(str,list1,list2) {
     var i = 1;
     var newval = "";
     for(; i lte listLen(list1); i=i+1) {
         if(i gt listLen(list2)) newval = "";
         else newval = listGetAt(list2,i);
         str = ReplaceNoCase(str,listGetAt(list1,i),newval,"all");        
     }
     return str;
 }

---

