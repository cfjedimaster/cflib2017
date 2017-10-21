---
layout: udf
title:  preg_match_all
date:   2004-02-16T01:11:01.000Z
library: StrLib
argString: "regex, str"
author: Aaron Eisenberger
authorEmail: aaron@x-clothing.com
version: 1
cfVersion: CF5
shortDescription: Emulates the preg_match_all function in PHP for returning all regex matches along with their backreferences.
description: |
 Searches a string for all matches to the regular expression given and puts them in an array along with any backreferences.
 
 After the first match is found, the subsequent searches are continued on from end of the last match.

returnValue: Returns an array.

example: |
 <cfset phones=preg_match_all("[1\-\(]*?(\d{3})?[\-\)\s]*?(\d{3}-\d{4})", "Call 555-1212 or 1-800-555-1212 or (310) 555-1212")>
 <cfdump var=#phones#>

args:
 - name: regex
   desc: Regular expression.
   req: true
 - name: str
   desc: String to search.
   req: true


javaDoc: |
 /**
  * Emulates the preg_match_all function in PHP for returning all regex matches along with their backreferences.
  * 
  * @param regex      Regular expression. (Required)
  * @param str      String to search. (Required)
  * @return Returns an array. 
  * @author Aaron Eisenberger (aaron@x-clothing.com) 
  * @version 1, February 15, 2004 
  */

code: |
 function preg_match_all(regex,str) {
     var results = arraynew(2);
     var pos = 1;
     var loop = 1;
     var match = "";
     var x= 1;
     
     while (REFind(regex, str, pos)) { 
         match = REFind(regex, str, pos, TRUE); 
         for (x = 1; x lte arrayLen(match.pos); x = x + 1) {
             if(match.len[x])
                 results[x][loop] = mid(str, match.pos[x], match.len[x]);
             else
                 results[x][loop] = '';
         }
         pos = match.pos[1] + match.len[1];
         loop = loop + 1;
     }
     return results;
 }

---

