---
layout: udf
title:  GetWords
date:   2001-07-30T13:34:45.000Z
library: StrLib
argString: "str, words"
author: David Grant
authorEmail: david@insite.net
version: 2
cfVersion: CF5
shortDescription: Shortens a string without cutting words in half.
tagBased: false
description: |
 Supply a string and number of words to return, this returns that number of words with an ellipsis at the end.  If the number of words argument is greater than the actual number of words, the original string will be returned without the ellipsis.

returnValue: 

example: |
 <cfset sentance = "Hello, this is a sentance with many words and spaces.">
 <cfoutput>#getWords(sentance,4)#</cfoutput>

args:
 - name: str
   desc: The string to modify.
   req: true
 - name: words
   desc: The number of words to display.
   req: true


javaDoc: |
 /**
  * Shortens a string without cutting words in half.
  * Modified by Raymond Camden on July 30, 2001
  * 
  * @param str      The string to modify. 
  * @param words      The number of words to display. 
  * @author David Grant (david@insite.net) 
  * @version 2, July 30, 2001 
  */

code: |
 function getWords(str,words) {
     var numWords = 0;
     var oldPos = 1;
     var i = 1;
     var strPos = 0;
     
     str = trim(str);
     str = REReplace(str,"[[:space:]]{2,}"," ","ALL");
     numWords = listLen(str," ");
     if (words gte numWords) return str;
     for (i = 1; i lte words; i=i+1) {
         strPos = find(" ",str,oldPos);
         oldPos = strPos + 1;
     }
     if (len(str) lte strPos) return left(str,strPos-1);
     return left(str,strPos-1) & "...";
 }

---

