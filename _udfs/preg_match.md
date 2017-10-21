---
layout: udf
title:  preg_match
date:   2004-02-16T01:13:19.000Z
library: StrLib
argString: "regex, str"
author: Aaron Eisenberger
authorEmail: aaron@x-clothing.com
version: 1
cfVersion: CF5
shortDescription: Emulates the preg_match function in PHP for returning a regex match along with any backreferences.
description: |
 Searches a string for all matches to the regular expression given and puts them in an array along with any backreferences.

returnValue: Returns an array.

example: |
 <cfset domain=preg_match("([^\.\/]+)\.([^\.\/]+$)", cgi.server_name)>
 <cfdump var="#domain#">

args:
 - name: regex
   desc: Regular expression.
   req: true
 - name: str
   desc: String to search.
   req: true


javaDoc: |
 /**
  * Emulates the preg_match function in PHP for returning a regex match along with any backreferences.
  * 
  * @param regex      Regular expression. (Required)
  * @param str      String to search. (Required)
  * @return Returns an array. 
  * @author Aaron Eisenberger (aaron@x-clothing.com) 
  * @version 1, February 15, 2004 
  */

code: |
 function preg_match(regex,str) {
     var results = arraynew(1);
     var match = "";
     var x = 1;
     if (REFind(regex, str, 1)) { 
         match = REFind(regex, str, 1, TRUE); 
         for (x = 1; x lte arrayLen(match.pos); x = x + 1) {
             if(match.len[x])
                 results[x] = mid(str, match.pos[x], match.len[x]);
             else
                 results[x] = '';
         }
     }
     return results;
 }

---

