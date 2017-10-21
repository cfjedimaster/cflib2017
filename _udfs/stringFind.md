---
layout: udf
title:  stringFind
date:   2012-09-29T19:01:04.000Z
library: StrLib
argString: "pattern, string[, all][, start][, caseSensitive]"
author: Adam Cameron
authorEmail: adamcameroncoldfusion@gmail.com
version: 1
cfVersion: CF9
shortDescription: Returns matched substrings and subexpressions from a string based on a regular expression pattern
description: |
 stringFind() is a melding of reFind() and reMatch().  It returns the match as well as all sub-expression matches as pos and len values (similar to reFind()), as well as the substring that the pos &amp; len values refer to (like reMatch()). Finds one or all matches.
 
 This is similar to existing CFLib functions, preg_match_all() and reFindAll(), but more-closely matches its native counterparts.

returnValue: An array of structs, similar to reFind() when set to return subexpressions.

example: |
 string = "This is a string that has words of differing lengths, and I'm gonna use stringFind() to return the words that are five or six characters long";
 pattern = "\b(\w{5,6})\b";
 result = stringFind(pattern, string, true, 1, false);
 writeDump(result);

args:
 - name: pattern
   desc: A regular expression to match.
   req: true
 - name: string
   desc: A string to find matches in.
   req: true
 - name: all
   desc: Whether to match one (default) or all matches.
   req: false
 - name: start
   desc: The position in the string to start looking for matches.
   req: false
 - name: caseSensitive
   desc: Whether to do a case-sensitive or case-insensitive (default) match.
   req: false


javaDoc: |
 /**
  * Returns matched substrings and subexpressions from a string based on a regular expression pattern
  * v1.0 by Adam Cameron
  * 
  * @param pattern      A regular expression to match. (Required)
  * @param string      A string to find matches in. (Required)
  * @param all      Whether to match one (default) or all matches. (Optional)
  * @param start      The position in the string to start looking for matches. (Optional)
  * @param caseSensitive      Whether to do a case-sensitive or case-insensitive (default) match. (Optional)
  * @return An array of structs, similar to reFind() when set to return subexpressions. 
  * @author Adam Cameron (adamcameroncoldfusion@gmail.com) 
  * @version 1.0, September 29, 2012 
  */

code: |
 array function stringFind(required string pattern, required string string, boolean all=false, numeric start=1, boolean caseSensitive=false){
     var result    = [];
     var matches    = [];
     var i        = 0;
     var match    = "";
 
     do {
         if (caseSensitive){
             matches = reFind(pattern, string, start, true);
         }else{
             matches = reFindNoCase(pattern, string, start, true);
         }
         // if we have a match, we need to extract the matched strings too
         if (matches.pos[1]){
             matches.string = [];
             for (i=1; i <= arrayLen(matches.pos); i++){
                 if (matches.len[i]){
                     match = mid(string, matches.pos[i], matches.len[i]);
                 }else{
                     match = "";
                 }
                 arrayAppend(matches.string, match);
             }
             arrayAppend(result, matches);
             // if we were only after one match: we're done...
             if (!all){
                 break;
             }
             // ... otherwise shimmy along to after this match, ready to look for the next one
             start = matches.pos[1] + matches.len[1];
         }
     } while(matches.pos[1]);
     return result;
 }

---

