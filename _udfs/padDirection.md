---
layout: udf
title:  padDirection
date:   2003-05-09T18:57:10.000Z
library: StrLib
argString: "string, char, number[, charD]"
author: Ron Gambill
authorEmail: rgambill@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Basic padding function that allows user to decide which side of the submitted string that the characters should be added to (via L or R).
tagBased: false
description: |
 Basic padding function that allows user to decide which side of the submitted string that the characters should be added to (via L or R). See also  padString().

returnValue: Returns a string.

example: |
 <cfset aString="Fred">
 <cfoutput>
 #padDirection(aString,"X",10,"R")#
 </cfoutput>

args:
 - name: string
   desc: String to pad.
   req: true
 - name: char
   desc: Character to use as pad.
   req: true
 - name: number
   desc: Number of characters to pad.
   req: true
 - name: charD
   desc: Direction to pad. Should be "L" (left) or "R" (right). Defaults to R.
   req: false


javaDoc: |
 /**
  * Basic padding function that allows user to decide which side of the submitted string that the characters should be added to (via L or R).
  * 
  * @param string      String to pad. (Required)
  * @param char      Character to use as pad. (Required)
  * @param number      Number of characters to pad. (Required)
  * @param charD      Direction to pad. Should be "L" (left) or "R" (right). Defaults to R. (Optional)
  * @return Returns a string. 
  * @author Ron Gambill (rgambill@hotmail.com) 
  * @version 1, May 9, 2003 
  */

code: |
 function padDirection(string,char,number) {
    // set up variables
    var strLen = len(string);
    var padLen = number - strLen;
    var returnValue = string;
    var charD = "R";
 
    if(arrayLen(arguments) gte 4) charD = arguments[4]; 
    if (strLen gte number) return string;
    
    if (charD eq "R") return string & RepeatString(char, padLen);
    else return RepeatString(char, padLen) & string;
 }

oldId: 869
---

