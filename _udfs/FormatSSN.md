---
layout: udf
title:  FormatSSN
date:   2001-07-16T12:18:36.000Z
library: StrLib
argString: "string"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Translates a 9 digit string into a social security number.
description: |
 Formats a 9 digit number as a social security number (xxx-xx-xxxx).

returnValue: Returns a string.

example: |
 <CFSET str="999999999">
 <CFOUTPUT>
 Given str=#str#<BR>
 Stripped: #FormatSSN(str)#
 </CFOUTPUT>

args:
 - name: string
   desc: String to be modified.
   req: true


javaDoc: |
 /**
  * Translates a 9 digit string into a social security number.
  * 
  * @param string      String to be modified. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, July 16, 2001 
  */

code: |
 function FormatSSN(str)
 {
   var SSN = "";
   if (Not IsNumeric(str)) return "Error, str must be numeric";
   if (Len(Str) NEQ 9) return "Error, str must be 9 digits long";
   SSN = ReReplace(str,'([0-9]{3})([0-9]{2})([0-9]{4})','\1-\2-\3');
   return SSN;
 }

---

