---
layout: udf
title:  HTMLTrans
date:   2003-08-28T09:38:14.000Z
library: StrLib
argString: "string"
author: Oblio
authorEmail: oleitch@locustcreek.com
version: 2
cfVersion: CF5
shortDescription: Converts the characters in a string to encoded special characters.
description: |
 This function is intended to obfuscate strings on a page.  It converts characters to their ASCII decimal equivalent, and outputs the concatenated result in place of the original.  This is particularly useful for protecting email addresses from harvesters (or at least until they figure it out).  Best of all, you can still use href=&quot;mailto:#HTMLTrans(example)#&quot;.

returnValue: Returns a string.

example: |
 <cfset example="name@example.com">
 
 <cfoutput>#HTMLTrans(example)#</cfoutput>

args:
 - name: string
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Converts the characters in a string to encoded special characters.
  * Rewritten by Raymond Camden
  * 
  * @param string      String to format. (Required)
  * @return Returns a string. 
  * @author Oblio (oleitch@locustcreek.com) 
  * @version 2, August 28, 2003 
  */

code: |
 function HTMLTrans(string) {
     var slen = len(string);
     var encoded = "";
 
     while (slen) {
         encoded = encoded & "&##" & Asc(left(string,1)) & ";";
         string = mid(string,2,slen-1);
         slen=len(string);
     }
     return encoded;
 }

---

