---
layout: udf
title:  XMLSafe
date:   2002-06-27T16:42:23.000Z
library: StrLib
argString: "str"
author: Mark Knox
authorEmail: mark@3pss.com
version: 1
cfVersion: CF5
shortDescription: Extends XMLFormat to include stripping non-printable characters.
description: |
 XMLFormat escapes special XML characters so that you can put arbitrary strings safely into XML. However, it does not filter non-printable characters which can cause some XML Parser Engines to crash.

returnValue: Returns a string.

example: |
 <!--- Build the string inserting a non-printable
       character.  CHR(146) will typically show
       up as an apostrophe in most editors and
       data-dump programs --->
 
 <cfset myvar = "Joe" & Chr(146) & "s Cafe'">
 
 <!--- Output the string to view --->
 Value before the function: <cfoutput>#myvar#</cfoutput><br>
 
 <!--- Now view the output with the function --->
 Value after the function: <cfoutput>#XMLSafe(myvar)#</cfoutput>

args:
 - name: str
   desc: The string to format.
   req: true


javaDoc: |
 /**
  * Extends XMLFormat to include stripping non-printable characters.
  * 
  * @param str      The string to format. (Required)
  * @return Returns a string. 
  * @author Mark Knox (mark@3pss.com) 
  * @version 1, June 27, 2002 
  */

code: |
 function XMLSafe(str) {
   return XMLFormat(REReplace(str, "[^[:print:]]", "", "ALL"));
 }

---

