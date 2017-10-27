---
layout: udf
title:  jsToUnicode
date:   2004-08-31T19:02:45.000Z
library: StrLib
argString: "str"
author: Harry Klein
authorEmail: klein@contens.de
version: 1
cfVersion: CF5
shortDescription: Replace javascript unicode strings with unicode strings.
tagBased: false
description: |
 Replace javascript unicode strings with unicode strings.
 
 Useful if you want to save Unicode Javascript text in WDDX files.

returnValue: Returns a string.

example: |
 <cfoutput>#jsToUnicode("\xE4")#</cfoutput>

args:
 - name: str
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Replace javascript unicode strings with unicode strings.
  * 
  * @param str      String to modify. (Required)
  * @return Returns a string. 
  * @author Harry Klein (klein@contens.de) 
  * @version 1, August 31, 2004 
  */

code: |
 function jsToUnicode(str){
     return ReReplaceNoCase(str,"\\([a-z0-9]{3})","&##\1;","all");
 }

oldId: 1109
---

