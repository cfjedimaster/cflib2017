---
layout: udf
title:  Is7bit
date:   2003-08-28T09:42:20.000Z
library: StrLib
argString: "text"
author: Vaughan Allan
authorEmail: vorn@__nospam__vorn.org
version: 1
cfVersion: CF5
shortDescription: Determines whether a string is 7bit
tagBased: false
description: |
 Determines whether a string is 7bit.  Useful for guessing if a string contains binary data (after reading a file using cffile for example).

returnValue: Returns a boolean.

example: |
 <CFSET str1 = "The mat sat on the cat.">
 <CFSET str2 = "The mat sat on the c" & chr(225) & "t.">
 <CFIF Is7bit(str1)>
     Str1 is 7 bit.<br>
 </CFIF>
 <CFIF Is7bit(str2)>
     Str2 is 7 bit.<br>
 </CFIF>

args:
 - name: text
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Determines whether a string is 7bit
  * Rewritten by Ray Camden
  * 
  * @param text      String to check. (Required)
  * @return Returns a boolean. 
  * @author Vaughan Allan (vorn@__nospam__vorn.org) 
  * @version 1, August 28, 2003 
  */

code: |
 function Is7bit(text) {
     if(REFind("[\x80-\xFF]",text)) return false;
     return true;    
 }

oldId: 947
---

