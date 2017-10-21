---
layout: udf
title:  ListWrap
date:   2013-07-15T21:43:57.000Z
library: StrLib
argString: "lst, length[, br][, delimiter]"
author: Tony Brandner
authorEmail: tony@brandners.com
version: 1
cfVersion: CF5
shortDescription: Wraps a list every n elements.
description: |
 Takes in a list, a length, and an optional string and delimiter. It parses through the list, inserting &quot;string&quot; in such a way that the list will appear to be wrapped every &quot;length&quot; elements. Meant to be used with break strings like '&lt;br&gt;'.

returnValue: Returns a string.

example: |
 <cfset TempList = "a,b,c,d,e,f,g,h,i,j">
 <cfoutput>
 List:<br>#TempList#<br>
 Wrapped List:<br>#ListWrap(TempList,4,"<br>",",")#
 </cfoutput>

args:
 - name: lst
   desc: The list to modify.
   req: true
 - name: length
   desc: The place to do insertions.
   req: true
 - name: br
   desc: String to insert. Detauls to a break tag.
   req: false
 - name: delimiter
   desc: The delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Wraps a list every n elements.
  * 
  * @param lst      The list to modify. (Required)
  * @param length      The place to do insertions. (Required)
  * @param br      String to insert. Detauls to a break tag. (Optional)
  * @param delimiter      The delimiter to use. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Tony Brandner (tony@brandners.com) 
  * @version 1, July 15, 2013 
  */

code: |
 function ListWrap(lst, lngth) {
     var newList=lst;
     var br="<br>";
     var delimiter=",";
         var i = lngth;
     // check for optional arguments
     if(ArrayLen(arguments) eq 3) {
         br = arguments[3];
     } else if (ArrayLen(arguments) EQ 4) {
         br = arguments[3];
         delimiter = arguments[4];
     }
     // loop through list
     for (i=lngth; i LE ListLen(lst,delimiter); i=i+lngth) {
         if (ListLen(lst, delimiter) GT i) {
             // append the break string to the next element
             newList = ListSetAt(newList, i+1, br & ListGetAt(lst, i+1, delimiter), delimiter);
         }
     }
     return newList;
 }

---

