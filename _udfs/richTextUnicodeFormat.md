---
layout: udf
title:  richTextUnicodeFormat
date:   2005-09-01T12:10:41.000Z
library: StrLib
argString: "str"
author: Sierra Bufe
authorEmail: sierra@brighterfusion.com
version: 1
cfVersion: CF5
shortDescription: Returns a rich text format unicode string, suitable for keyword replacement in rtf documents.
description: |
 This function allows for the insertion of foreign characters into Rich Text Format (RTF) documents.  Strings are formatted into RTF Unicode characters.  This is especially handy for replacing keywords (such as name) in a translated RTF.

returnValue: Returns a string.

example: |
 <cfset replacename = richTextUnicodeFormat(Form.ChineseName)>
 
 <cfoutput>#replacename#</cfoutput>

args:
 - name: str
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Returns a rich text format unicode string, suitable for keyword replacement in rtf documents.
  * 
  * @param str      String to format. (Required)
  * @return Returns a string. 
  * @author Sierra Bufe (sierra@brighterfusion.com) 
  * @version 1, September 1, 2005 
  */

code: |
 function richTextUnicodeFormat(str) {
     var u = "";
     var i = 1;
     var ch = "";
     
     for (;i lte Len(str);i=i+1) {
         ch = Mid(str, i, 1);
         u = u & "\u" & Asc(ch) & " ~";
     }
     return u;
 }

---

