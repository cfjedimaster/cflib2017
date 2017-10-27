---
layout: udf
title:  RESplit
date:   2002-01-29T11:43:47.000Z
library: StrLib
argString: "str, regex"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF5
shortDescription: Splits a string into arrays based on a regex.
tagBased: false
description: |
 This UDF will split a string into an array based on the regular expression passed in. If the regex is not found, the entire string is returned in the first element of the array.

returnValue: Returns an array.

example: |
 <cfset str = "This is the end of the sentence. This is the second sentence, it's not quite as interesting.">
 <cfset res = RESplit(str,"[\.[:space:],]+")>
 <cfdump var="#res#">

args:
 - name: str
   desc: The string to search.
   req: true
 - name: regex
   desc: The regular expression to split on.
   req: true


javaDoc: |
 /**
  * Splits a string into arrays based on a regex.
  * Fix for missing end item by Thomas Muck (tommuck@basic-drumbeat.com)
  * 
  * @param str      The string to search. 
  * @param regex      The regular expression to split on. 
  * @return Returns an array. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 2, January 29, 2002 
  */

code: |
 function RESplit(str,regex) {
     var results = arrayNew(1);
     var test = REFind(regex,str,1,1);
     var pos = test.pos[1];
     var oldpos = 1;
     if(not pos) results[1] = str;
     while(pos gt 0) {
         arrayAppend(results,mid(str,oldpos,pos-oldpos));
         oldpos = pos+test.len[1];
         test = REFind(regex,str,oldpos+1,1);
         pos = test.pos[1];
     }
         //Thanks to Thomas Muck
         if(len(str) GT oldpos) arrayappend(results,right(str,len(str)-oldpos + 1));
     return results;
 }

oldId: 424
---

