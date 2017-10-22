---
layout: udf
title:  ListReFindNoCase
date:   2003-05-26T10:19:46.000Z
library: StrLib
argString: "list, regexp[, delimiter]"
author: Tony Kenny
authorEmail: tony@kenny.net
version: 1
cfVersion: CF5
shortDescription: Searches a given list for a given regexp and returns the index number of the first item found.
tagBased: false
description: |
 Searches a given list for a given regexp and returns the index number
 of the first item it finds in the list that matches the regexp. Returns 0 (zero) if not found.

returnValue: Returns a number.

example: |
 <cfset mylist = "this,that,other,thing">
 <cfoutput>#ListReFindNoCase(mylist, ".th")#
 </cfoutput>

args:
 - name: list
   desc: The list to search.
   req: true
 - name: regexp
   desc: The regular expression to use.
   req: true
 - name: delimiter
   desc: The list delimiter, defaults to a comma.
   req: false


javaDoc: |
 /**
  * Searches a given list for a given regexp and returns the index number of the first item found.
  * 
  * @param list      The list to search. (Required)
  * @param regexp      The regular expression to use. (Required)
  * @param delimiter      The list delimiter, defaults to a comma. (Optional)
  * @return Returns a number. 
  * @author Tony Kenny (tony@kenny.net) 
  * @version 1, May 26, 2003 
  */

code: |
 function ListReFindNoCase(list, regexp) {
     var i = 1;
     var delimiter = ",";
     
     if(arrayLen(arguments) gte 3) delimiter = arguments[3];
 
     for (i=1; i le listLen(list, delimiter); i=i+1) {
         if ( ReFindNoCase(regexp, listGetAt(list, i, delimiter)) )     return i;
     }
     
     return 0;
 }

---

