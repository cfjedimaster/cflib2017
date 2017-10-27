---
layout: udf
title:  CountLines
date:   2003-06-03T11:53:02.000Z
library: StrLib
argString: "text"
author: Matheus Antonelli
authorEmail: matheus_antonelli@ig.com.br
version: 1
cfVersion: CF5
shortDescription: This function returns the number of lines in a text file.
tagBased: false
description: |
 This function returns the number of lines in a text file loaded into a string. For this UDF, a line is defined as a string ending with Chr(13) or Chr(10). 
 
 As a reminder, note that list functions only take single character delimiters. When you pass N characters as the delimiter, list functions will use any of the characters as the delimiter.

returnValue: Returns a number.

example: |
 <cfsavecontent variable="foo">
 This is Foo.
 This is not foo.
 Who cares about foo?
 </cfsavecontent>
 
 <cfoutput>#CountLines(foo)#</cfoutput>

args:
 - name: text
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * This function returns the number of lines in a text file.
  * 
  * @param text      String to parse. (Required)
  * @return Returns a number. 
  * @author Matheus Antonelli (matheus_antonelli@ig.com.br) 
  * @version 1, June 3, 2003 
  */

code: |
 function CountLines(text) {
   var CRLF = Chr(13) & Chr(10);
   return ListLen(text,CRLF);
 }

oldId: 929
---

