---
layout: udf
title:  MaxLength
date:   2002-02-25T00:35:49.000Z
library: StrLib
argString: "string, length"
author: John Reed
authorEmail: johnreed1972@yahoo.com.au
version: 1
cfVersion: CF5
shortDescription: Limit a string's output to the desired length.
description: |
 Limits the length of string output to a specified length and appends &quot;...&quot; to indicate the string has been trimmed. Ideal for limiting a string's length in a table without wrapping.

returnValue: Returns a string.

example: |
 <cfset tmp = "This a short sample string.">
 <cfoutput>
     #maxLength(tmp, 12)#
 </cfoutput>

args:
 - name: string
   desc: The string to modify.
   req: true
 - name: length
   desc: The max length to use.
   req: true


javaDoc: |
 /**
  * Limit a string's output to the desired length.
  * 
  * @param string      The string to modify. 
  * @param length      The max length to use. 
  * @return Returns a string. 
  * @author John Reed (johnreed1972@yahoo.com.au) 
  * @version 1, February 24, 2002 
  */

code: |
 function maxLength(string, length) {
     var padding = 3;
     var tmp = "...";    
         
     if ( len(string) gte length )
         return removeChars(trim(string), length, len(string) - padding) & tmp;
     else return string;
 }

---

