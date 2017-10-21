---
layout: udf
title:  unicodeToJS
date:   2004-08-31T18:13:17.000Z
library: StrLib
argString: "str"
author: Harry Klein
authorEmail: klein@contens.de
version: 1
cfVersion: CF5
shortDescription: Replace html unicode strings with strings in javascript format.
description: |
 Replace html unicode strings with strings in javascript format.
 
 Useful if you save Javascript Strings in WDXX Files.

returnValue: Returns a string.

example: |
 <cfoutput>#unicodeToJS("&##xE4;")#</cfoutput>

args:
 - name: str
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Replace html unicode strings with strings in javascript format.
  * 
  * @param str      String to modify. (Required)
  * @return Returns a string. 
  * @author Harry Klein (klein@contens.de) 
  * @version 1, August 31, 2004 
  */

code: |
 function unicodeToJS(str){
     str = JSStringFormat(str);
     return ReReplaceNoCase(str,"&##([a-z0-9]{3});","\\1","all");
 }

---

