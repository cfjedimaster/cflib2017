---
layout: udf
title:  StripAscii
date:   2002-12-10T19:34:32.000Z
library: StrLib
argString: "string"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 2
cfVersion: CF5
shortDescription: Removes ASCII character codes from the string.
tagBased: false
description: |
 Strips all ASCII character codes from str.

returnValue: Returns a string.

example: |
 <CFSET str="This&nbsp; is&##155; a test&trade;">
 <CFOUTPUT>
 Given str=#str#<BR>
 Stripped: #StripAscii(str)#
 </CFOUTPUT>

args:
 - name: string
   desc: String to be modified.
   req: true


javaDoc: |
 /**
  * Removes ASCII character codes from the string.
  * 
  * @param string      String to be modified. (Required)
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 2, December 10, 2002 
  */

code: |
 function StripAscii(str)
 {
   return REReplace(str, "&(##[0-9]{1,3}|[[:alpha:]]*[[:alnum:]]+);", "", "ALL");
 }

---

