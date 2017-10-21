---
layout: udf
title:  verityClean
date:   2009-04-24T22:47:58.000Z
library: StrLib
argString: "input"
author: Simon Potter
authorEmail: spotter@redbanner.com
version: 6
cfVersion: CF5
shortDescription: Creates a verity &quot;safe&quot; search string.
description: |
 Verity_clean strips all invalid characters and word combinations from a search strign to prevent verity from crashing.

returnValue: Returns a string.

example: |
 <cfset strs = arrayNew(1)>
 <cfset strs[1] = "foo      oo  ooo">
 <cfset strs[2] = "foo@moo">
 <cfset strs[3] = "andfoo">
 <cfset strs[4] = "and foo">
 <cfset strs[5] = "or and foo">
 <cfset strs[6] = "\and and foo and">
 <cfloop index="x" from=1 to="#arrayLen(strs)#">
     <cfoutput><b>#strs[x]#</b> passed to VerityClean is: <b>#verityClean(strs[x])#</b><P></cfoutput>
 </cfloop>

args:
 - name: input
   desc: String to Verity clean.
   req: true


javaDoc: |
 /**
  * Creates a verity &quot;safe&quot; search string.
  * Version 2 rewritten by Raymond Camden
  * Version 3 - made \ into \\ thanks to user comment
  * Version 4 - Fixed bugs identified by John Salonich II (21 JAN 2003), Neal Todd (06 FEB 04), Jeremy Halliwell (01 APR 03). Also added fix for curly brackets, comma, funny quote and plus.
  * v5 bug fixed by Dominic OConnor
  * v6 fix by Mark, when we remove bad chars, replace with space, not nothing
  * 
  * @param input      String to Verity clean. (Required)
  * @return Returns a string. 
  * @author Simon Potter (spotter@redbanner.com) 
  * @version 6, April 24, 2009 
  */

code: |
 function verityClean(input) {
     //Value to return after cleaning
     var cleanText = trim(input);
     // List of special characters to remove
     var reBadChars = "\\|@|#chr(34)#|'|<|>|\(|\)|!|=|\[|\]|\{|\}|\#chr(44)#|`|\#chr(43)#";
     // List of words to watch for
     var arProblemWords = "and,or,not";    
     var x = 1;
     var y = 1;
     var temp = "";
     
     //=-=-=-=-=-=-=-=-=-=-=-=-=-=
     //Turn list into arrays for the loop
     //=-=-=-=-=-=-=-=-=-=-=-=-=-=
     arProblemWords = ListToArray(arProblemWords);    
     
     //=-=-=-=-=-=-=-=-
     // Strip double spaces 
     //=-=-=-=-=-=-=-=-
     cleanText = reReplace(cleanText," {2,}"," ","all");
 
     //=-=-=-=-=-=-=-=-=-
     // Strip bad characters 
     //=-=-=-=-=-=-=-=-=
     cleanText = reReplace(cleanText,reBadChars," ","all");
     
     //=-=-=-=-=-=-=-=-
     // Clean up sequences of space characters
     //=-=-=-=-=-=-=-=-
     cleanText = reReplace(cleanText,"[[:space:]]+"," ","all");
 
     //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     // Remove dupes and start/end bad words
     //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     for (x = 1; x lte arraylen(arProblemWords); x = x + 1) {
     
         //remove dupes
         cleanText = trim(reReplace(cleanText,"(#arProblemWords[x]#[[:space:]]+){2,}","","all"));
 
         //remove arProblemWord[x] + any of the others
         temp = arProblemWords[x] & "[[:space:]]+(";
         for(y = 1; y lte arrayLen(arProblemWords); y=y+1) {
             if(x neq y) {
                 temp = temp & arProblemWords[y] & "[[:space:]]+|";
             }
         }
         //remove last |
         temp = left(temp, len(temp)-1);
         //add closing )
         temp = temp & ")";
         cleanText = trim(reReplace(cleanText,temp,"","all"));
         
         //remove from beginning 
         if(
             findNoCase(arProblemWords[x],cleanText) is 1 and 
             reFind("[[:space:]]+",mid(cleanText,len(arProblemWords[x])+1,1)) and 
             mid(cleanText,1,3) NEQ "not"
         ) cleanText = trim(right(cleantext,len(cleantext) - len(arProblemWords[x])));
         
         if(
             findNoCase(arProblemWords[x],cleanText) gt 0 and 
             len(cleanText) eq len(arProblemWords[x])
         ) cleanText = "";
         
         //remove from end
         if(
             findNoCase(arProblemWords[x],cleanText) gt 0 and
             findNoCase(arProblemWords[x],cleanText,len(cleanText) - len(arProblemWords[x])) is (len(cleanText) - len(arProblemWords[x]) + 1)
             and
             reFind("[[:space:]]+",mid(cleanText,len(cleanText) - len(arProblemWords[x]),1))
         ) cleanText = trim(left(cleanText, len(cleanText) - len(arProblemWords[x])));                    
     }    
     
     // Return the cleaned value
     return cleanText;
 }

---

