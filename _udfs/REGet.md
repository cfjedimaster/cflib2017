---
layout: udf
title:  REGet
date:   2003-06-06T19:40:07.000Z
library: StrLib
argString: "str, regex"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF5
shortDescription: Returns all the matches of a regex from a string.
description: |
 This UDF will parse a string and return every occurance of a regular expression in an array. If no matches are found, an empty array is returned.

returnValue: Returns an array.

example: |
 <cfset str = "This string contains email addresses like ray@camdenfamily.com and foo@goobers.com. We will use it to email goo@cnn.com and bill@microsoft.com">
 <cfset res = REGet(str,"[[:alnum:]_\.\-]+@([[:alnum:]_\.\-]+\.)+[[:alpha:]]{2,4}")>
 <cfdump var="#res#">

args:
 - name: str
   desc: The string to search.
   req: true
 - name: regex
   desc: The regular expression to search for.
   req: true


javaDoc: |
 /**
  * Returns all the matches of a regex from a string.
  * Bug fix by  Ruben Pueyo (ruben.pueyo@soltecgroup.com)
  * 
  * @param str      The string to search. (Required)
  * @param regex      The regular expression to search for. (Required)
  * @return Returns an array. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 2, June 6, 2003 
  */

code: |
 function REGet(str,regex) {
     var results = arrayNew(1);
     var test = REFind(regex,str,1,1);
     var pos = test.pos[1];
     var oldpos = 1;
     while(pos gt 0) {
         arrayAppend(results,mid(str,pos,test.len[1]));
         oldpos = pos+test.len[1];
         test = REFind(regex,str,oldpos,1);
         pos = test.pos[1];
     }
     return results;
 }

---

