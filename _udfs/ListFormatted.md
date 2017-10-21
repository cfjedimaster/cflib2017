---
layout: udf
title:  ListFormatted
date:   2002-06-26T19:00:57.000Z
library: StrLib
argString: "theList, beginStr, endStr[, theDelim]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Adds formatting to list elements, for displaying lists in a more readable fashion.
description: |
 Adds formatting to list elements by wrapping each element between beginStr and endStr. Special delimeters (non-comma) can be specified in the optional final argument.

returnValue: Returns a string.

example: |
 <cfset my_list = "one,two,three">
 <cfoutput><ol>#ListFormatted(my_list,"<li>","</li>")#</ol></cfoutput>

args:
 - name: theList
   desc: The list to modify.
   req: true
 - name: beginStr
   desc: The string to prepend to each list element.
   req: true
 - name: endStr
   desc: The string to append to each list element.
   req: true
 - name: theDelim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Adds formatting to list elements, for displaying lists in a more readable fashion.
  * 
  * @param theList      The list to modify. (Required)
  * @param beginStr      The string to prepend to each list element. (Required)
  * @param endStr      The string to append to each list element. (Required)
  * @param theDelim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function ListFormatted(theList, beginStr, endStr) {
     var theDelim = ",";
     if(ArrayLen(Arguments) GTE 4) theDelim = Arguments[4];
 
     return beginStr & Replace(theList, theDelim, endStr & beginStr, "ALL") & endStr;
 }

---

