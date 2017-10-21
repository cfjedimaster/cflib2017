---
layout: udf
title:  titleCaseList
date:   2014-05-22T17:33:06.000Z
library: StrLib
argString: "list[, delimiters]"
author: Adrian Lynch
authorEmail: adrian.l@thoughtbubble.net
version: 1
cfVersion: CF9
shortDescription: Title cases all elements in a list.
description: |
 Title cases all elements in a list. Will change &quot;adrian lynch&quot; to &quot;Adrian Lynch&quot;, &quot;a.lynch&quot; to &quot;A.Lynch&quot; and &quot;a.christopher lynch-smith&quot; to &quot;A.Christopher Lynch-Smith&quot;

returnValue: Returns a string.

example: |
 <cfset myString = "a.christopher lynch-smith">
 
 <cfoutput>
 Before: #myString#<br>
 After: #TitleCaseList(myString, ".- ")#
 </cfoutput>

args:
 - name: list
   desc: List to modify.
   req: true
 - name: delimiters
   desc: Delimiters to use. Defaults to a space.
   req: false


javaDoc: |
 /**
  * Title cases all elements in a list.
  * v1.0 by Adrian Lynch 
  * v1.1 by Adam Cameron. Simplified logic &amp; fixed a coupla bugs
  * 
  * @param list      List to modify. (Required)
  * @param delimiters      Delimiters to use. Defaults to a space. (Optional)
  * @return Returns a string. 
  * @author Adrian Lynch (adrian.l@thoughtbubble.net) 
  * @version 1.1, May 22, 2014 
  */

code: |
 string function titleCaseList(required string list, string delimiters=" ") {
     var regexSafeDelims = reReplace(delimiters, "(.)(?=.)", "\1|", "ALL");
     return reReplace(list, "(^|[#regexSafeDelims#])(\w)", "\1\u\2", "ALL");
 }

---

