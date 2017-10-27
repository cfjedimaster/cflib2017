---
layout: udf
title:  stringToAscii
date:   2010-06-17T19:46:24.000Z
library: CFMLLib
argString: "str"
author: Stephen Withington
authorEmail: steve@stephenwithington.com
version: 1
cfVersion: CF6
shortDescription: I convert a string to ASCII characters.
tagBased: false
description: |
 Pass me a string and I'll convert it into HTML-friendly ASCII characters.

returnValue: Returns a string.

example: |
 <cfset str = "I’ve ¼ got © some ™ funky € characters ? to ? convert ¥ into ® ASCII ¶ eh?" />
 <cfdump var="#stringToAscii(str)#" />

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * I convert a string to ASCII characters.
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Stephen Withington (steve@stephenwithington.com) 
  * @version 1, June 17, 2010 
  */

code: |
 function stringToAscii(str) {
     var local = StructNew();
     local.oldStr = '';
     local.newStr = '';
     if ( StructKeyExists(arguments, 'str') and IsSimpleValue(arguments.str) ) {
         local.oldStr = arguments.str;
         for ( local.i=1; local.i lte Len(arguments.str); local.i++ ) {
             local.newStr = local.newStr & '&##' & Asc(Left(local.oldStr,1)) & ';';
             local.oldStr = RemoveChars(local.oldStr,1,1);
         };
     };
     return local.newStr;
 };

oldId: 2082
---

