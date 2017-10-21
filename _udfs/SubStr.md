---
layout: udf
title:  SubStr
date:   2002-07-02T13:48:37.000Z
library: StrLib
argString: "buf, start[, length]"
author: Rudi Roselli Pettazzi
authorEmail: rhodion@tiscalinet.it
version: 2
cfVersion: CF5
shortDescription: Returns the substring of a string. It mimics the behaviour of the homonymous php function so it permits negative indexes too.
description: |
 It mimics the behaviour of php &quot;substr&quot;, enclosing mid, left and right functionalities into a single function and adding some extra-functionality and trick. 
 
 For instance:
 
 - substr(&quot;abcdef&quot;, -2) is the same as right(&quot;abcdef&quot;, 2),
 
 - substr(&quot;abcdef&quot;, 1, 3) is the same as left(&quot;abcdef&quot;, 3),
 
 - substr(&quot;abcdef&quot;, 2, 4) is the same as mid(&quot;abcdef&quot;, 2, 4)
 
 At the same time, it permits things like
 
 - substr(&quot;abcdef&quot;, 2) instead of mid(&quot;abcdef&quot;, 2, len(&quot;abcdef&quot;)-2)
 
 - substr(&quot;abcdef&quot;, -2, 1)  to say &quot;start 2 chars before the end of the string, and take 1 char.&quot;
 
 - substr(&quot;abcdef&quot;, -4, -1) to say &quot;start 4 chars before the end of the string, and throw away the last char.&quot; 
 
 It returns an empty string in case of inconsistent indexes.

returnValue: Returns a string.

example: |
 <cfset buffer = "Sailors">
 <cfoutput>
 substr(buffer, 2) = #substr(buffer, 2)#<br>
 substr(buffer, -2) = #substr(buffer, -2)#<br>
 substr(buffer, 1, 3) = #substr(buffer, 1, 3)#<br>
 substr(buffer, 2, 4) = #substr(buffer, 2, 4)#<br>
 substr(buffer, 2, -3) = #substr(buffer, 2, -3)#<br>
 substr(buffer, -4, 2) = #substr(buffer, -4, 2)#<br>
 substr(buffer, -4, -1) = #substr(buffer, -4, -1)#<br>
 </cfoutput>

args:
 - name: buf
   desc: The string to parse.
   req: true
 - name: start
   desc: The start position index. If negative, counts from the right side.
   req: true
 - name: length
   desc: Number of characters to return. If not passed, returns from start to end (if positive start value).
   req: false


javaDoc: |
 /**
  * Returns the substring of a string. It mimics the behaviour of the homonymous php function so it permits negative indexes too.
  * 
  * @param buf      The string to parse. (Required)
  * @param start      The start position index. If negative, counts from the right side. (Required)
  * @param length      Number of characters to return. If not passed, returns from start to end (if positive start value). (Optional)
  * @return Returns a string. 
  * @author Rudi Roselli Pettazzi (rhodion@tiscalinet.it) 
  * @version 2, July 2, 2002 
  */

code: |
 function SubStr(buf, start) {
     // third argument (optional)
     var length = 0;
     var sz = 0;
         
     sz = len(buf);
     
     if (arrayLen(arguments) EQ 2) {
 
         if (start GT 0) {
             length = sz;
         } else if (start LT 0) {
             length = sz + start;
             start = 1;
         }
     
     } else {
     
         length = Arguments[3];
         if (start GT 0) {
             if (length LT 0)   length = 1+sz+length-start;
         } else if (start LT 0) {
             if (length LT 0) length = length-start;
             start = 1+sz+start;
             
         }
     } 
     
     if (isNumeric(start) AND isNumeric(length) AND start GT 0 AND length GT 0) return mid(buf, start, length);
     else return "";
 }

---

