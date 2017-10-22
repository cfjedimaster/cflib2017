---
layout: udf
title:  ListLenIncNulls
date:   2003-09-29T17:06:44.000Z
library: StrLib
argString: "list[, delimiters]"
author: Tom Litt
authorEmail: tom@oxbowbooks.com
version: 1
cfVersion: CF5
shortDescription: Length of list including empty elements.
tagBased: false
description: |
 Returns the number of list element in a given list, but counts empty-strings as bona-fide list elements.

returnValue: Returns a number.

example: |
 <cfset TestList = "1|2|3||5">
 <cfset TestList2 = "||">
 <cfoutput>
 List #TestList# has #ListLenIncNulls(TestList,"|")# element(s) when empty strings 
 are counted as list elements.<br>
 List #TestList2# has #ListLenIncNulls(TestList2,"|")# element(s) when empty strings 
 are counted as list elements.
 </cfoutput>

args:
 - name: list
   desc: List to parse.
   req: true
 - name: delimiters
   desc: List delimiters. Only one character allow.  Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Length of list including empty elements.
  * 
  * @param list      List to parse. (Required)
  * @param delimiters      List delimiters. Only one character allow.  Defaults to a comma. (Optional)
  * @return Returns a number. 
  * @author Tom Litt (tom@oxbowbooks.com) 
  * @version 1, September 29, 2003 
  */

code: |
 function listLenIncNulls(list) {
     var delimiter = ",";
     if(arrayLen(Arguments) GT 1) delimiter = left(arguments[3],1);
     return val(len(list) - len(replace(list,delimiter,"","ALL")) + 1);
 }

---

