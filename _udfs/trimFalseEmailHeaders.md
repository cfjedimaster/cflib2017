---
layout: udf
title:  trimFalseEmailHeaders
date:   2006-02-03T13:33:19.000Z
library: SecurityLib
argString: "str"
author: Tony Brandner
authorEmail: tony@brandners.com
version: 1
cfVersion: CF5
shortDescription: Clean variables, such as form input, to modify values that may have been entered to perform e-mail injection.
description: |
 Clean variables, such as form input, to modify values that may have been entered to perform e-mail injection. This includes 'content-type','mime-version','to','bcc' and 'subject'. It keeps the value intact, but replaces colons to avoid injection.
 
 Credit to: http://www.webmasterworld.com/forum10/9776-2-10.htm
 
 E-mail injection:
 http://en.wikipedia.org/wiki/Email_Injection

returnValue: Returns a string.

example: |
 <cfset mailTo = "test@domain.com">
 <cfset mailBody = "test injection#CHR(10)#Content-type: text/plain#CHR(10)#">
 
 <cfset cleanMailBody = trimFalseEmailHeaders(mailBody )>

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Clean variables, such as form input, to modify values that may have been entered to perform e-mail injection.
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Tony Brandner (tony@brandners.com) 
  * @version 1, February 3, 2006 
  */

code: |
 function trimFalseEmailHeaders(str) {
     str = replaceNoCase(str, "Content-Type:", "content-type;", "ALL" );
     str = replaceNoCase(str, "MIME-Version:", "mime-version;", "ALL" );
     str = replaceNoCase(str, "To: ", "to; ", "ALL" );
     str = replaceNoCase(str, "From: ", "from; ", "ALL" );
     str = replaceNoCase(str, "bcc: ", "bcc; ", "ALL" );
     str = replaceNoCase(str, "Subject: ", "subject; ", "ALL" );
     return str;
 }

---

