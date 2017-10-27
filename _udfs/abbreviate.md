---
layout: udf
title:  abbreviate
date:   2005-09-06T22:24:29.000Z
library: StrLib
argString: "string, len"
author: Gyrus
authorEmail: gyrus@norlonto.net
version: 3
cfVersion: CF5
shortDescription: Abbreviates a given string to roughly the given length, stripping any tags, making sure the ending doesn't chop a word in two, and adding an ellipsis character at the end.
tagBased: false
description: |
 Similar to the MaxLength UDF, but designed for outputting abbreviated lengths of HTML code (e.g. in list tables). Strips all tags, and makes sure any abbreviation is done to the last space within the given length. Also appends a properly escaped ellipsis character to the returned string.

returnValue: Returns a string.

example: |
 <cfoutput>
 #abbreviate("<p>This bit of HTML copy is going to get <em>real</em> chopped up!</p>", 40)#
 </cfoutput>

args:
 - name: string
   desc: String to use.
   req: true
 - name: len
   desc: Length to use.
   req: true


javaDoc: |
 /**
  * Abbreviates a given string to roughly the given length, stripping any tags, making sure the ending doesn't chop a word in two, and adding an ellipsis character at the end.
  * Fix by Patrick McElhaney
  * v3 by Ken Fricklas kenf@accessnet.net, takes care of too many spaces in text.
  * 
  * @param string      String to use. (Required)
  * @param len      Length to use. (Required)
  * @return Returns a string. 
  * @author Gyrus (gyrus@norlonto.net) 
  * @version 3, September 6, 2005 
  */

code: |
 function abbreviate(string,len) {
     var newString = REReplace(string, "<[^>]*>", " ", "ALL");
     var lastSpace = 0;
     newString = REReplace(newString, " \s*", " ", "ALL");
     if (len(newString) gt len) {
         newString = left(newString, len-2);
         lastSpace = find(" ", reverse(newString));
         lastSpace = len(newString) - lastSpace;
         newString = left(newString, lastSpace) & "  &##8230;";
     }    
     return newString;
 }

oldId: 1106
---

