---
layout: udf
title:  FormattedValueOrString
date:   2002-06-26T19:01:38.000Z
library: StrLib
argString: "begin_str, str, end_str, default_str"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns either a formatted value or the passed default string.
description: |
 Returns either a formatted value (wrapped within begin_str and end_str) or the passed default string. Useful for wrapping non-empty values in parenthesis, or in anchor tags, or for other similar conditional formattings.

returnValue: Returns a string.

example: |
 <cfset email   = "me@host.com">
 <cfset email2  = "">
 
 <cfoutput>
 #FormattedValueOrString("<A HREF='mailto:#email#'>", email, "</A>", "(unspecified)")#<br>
 #FormattedValueOrString("<A HREF='mailto:#email2#'>", email2, "</A>", "(unspecified)")#<br>
 </cfoutput>

args:
 - name: begin_str
   desc: String to prepend to output.
   req: true
 - name: str
   desc: Variable to check.
   req: true
 - name: end_str
   desc: String to append to output.
   req: true
 - name: default_str
   desc: String to return if  str is empty.
   req: true


javaDoc: |
 /**
  * Returns either a formatted value or the passed default string.
  * 
  * @param begin_str      String to prepend to output. (Required)
  * @param str      Variable to check. (Required)
  * @param end_str      String to append to output. (Required)
  * @param default_str      String to return if  str is empty. (Required)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function FormattedValueOrString(begin_str, str, end_str, default_str) {
     if (str IS "") return default_str;
     return begin_str & str & end_str;
 }

---

