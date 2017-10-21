---
layout: udf
title:  camelToSpace
date:   2010-03-08T15:06:39.000Z
library: StrLib
argString: "str[, capitalize]"
author: Richard
authorEmail: acdhirr@trilobiet.nl
version: 0
cfVersion: CF6
shortDescription: Breaks a camelCased string into separate words
description: |
 This is not about furry puppets in a rocket ship, but a function that takes a camel cased string and returns it lower-cased with spaces between the words. Comes in handy if you want to generate human readable captions from (camel cased) table column names.

returnValue: Returns a string

example: |
 <cfoutput>
 <cfset str='aCamelCasedVariable'>
 #camelToSpace(str,true)#
 <br/>
 #camelToSpace(str)#
 </cfoutput>
 
 a very fancy column name 
 id column

args:
 - name: str
   desc: String to use
   req: true
 - name: capitalize
   desc: Boolean to return capitalized words
   req: false


javaDoc: |
 /**
  * Breaks a camelCased string into separate words
  * 8-mar-2010 added option to capitalize parsed words Brian Meloche brianmeloche@gmail.com
  * 
  * @param str      String to use (Required)
  * @param capitalize      Boolean to return capitalized words (Optional)
  * @return Returns a string 
  * @author Richard (acdhirr@trilobiet.nl) 
  * @version 0, March 8, 2010 
  */

code: |
 function camelToSpace(str) {
     var rtnStr=lcase(reReplace(arguments.str,"([A-Z])([a-z])","&nbsp;\1\2","ALL"));
     if (arrayLen(arguments) GT 1 AND arguments[2] EQ true) {
         rtnStr=reReplace(arguments.str,"([a-z])([A-Z])","\1&nbsp;\2","ALL");
         rtnStr=uCase(left(rtnStr,1)) & right(rtnStr,len(rtnStr)-1);
     }
 return trim(rtnStr);
 }

---

