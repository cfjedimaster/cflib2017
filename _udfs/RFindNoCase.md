---
layout: udf
title:  RFindNoCase
date:   2002-02-14T17:14:36.000Z
library: StrLib
argString: "Substr, String[, Spos]"
author: Charles Naumer
authorEmail: cmn@v-works.com
version: 2
cfVersion: CF5
shortDescription: Returns the last index (case insensitive) of an occurrence of a substring in a string from a specified starting position.
tagBased: false
description: |
 Returns the last index (case insensitive) of an occurrence of a substring in a string from a specified starting position. (The reverse of find.)

returnValue: Returns the last position where a match is found, or 0 if no match is found.

example: |
 <CFSET STR = "This is the test, the test of all tests.">
 <CFSET STR2 = "Ray's World">
 <CFOUTPUT>
 Test: #RFindNoCase("t",STR)#<BR>
 Test2: #RFindNoCase("T",STR)#<BR>
 Test3: #RFindNoCase("/",STR2)#<BR>
 </CFOUTPUT>

args:
 - name: Substr
   desc: Substring to look for.
   req: true
 - name: String
   desc: String to search.
   req: true
 - name: Spos
   desc: Starting position.
   req: false


javaDoc: |
 /**
  * Returns the last index (case insensitive) of an occurrence of a substring in a string from a specified starting position.
  * Big update by Shawn Seley (shawnse@aol.com) -
  * UDF was not accepting third arg for start pos 
  * and was returning results off by one.
  * 
  * @param Substr      Substring to look for. 
  * @param String      String to search. 
  * @param Spos      Starting position. 
  * @return Returns the last position where a match is found, or 0 if no match is found. 
  * @author Charles Naumer (cmn@v-works.com) 
  * @version 2, February 14, 2002 
  */

code: |
 function RFindNoCase(substr,str) {
   var rsubstr  = reverse(substr);
   var rstr     = "";
   var i        = len(str);
   var rcnt     = 0;
 
   if(arrayLen(arguments) gt 2 and arguments[3] gt 0 and arguments[3] lte len(str)) i = len(str) - arguments[3] + 1;
 
   rstr = reverse(Right(str, i));
   rcnt = findNoCase(rsubstr, rstr);
 
   if(not rcnt) return 0;
   return len(str)-rcnt-len(substr)+2;
 }

---

