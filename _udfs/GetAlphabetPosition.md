---
layout: udf
title:  GetAlphabetPosition
date:   2002-01-07T18:03:45.000Z
library: UtilityLib
argString: "charornum"
author: Seth Duffey
authorEmail: sduffey@ci.davis.ca.us
version: 1
cfVersion: CF5
shortDescription: Returns the numeric value of a letter's position in the alphabet, or the returns matching letter of a number in the alphabet.
description: |
 Returns the numeric value of a letter's position in the alphabet, or returns the matching letter of a number in the alphabet.

returnValue: Returns either a character, number, or empty string on error.

example: |
 <cfoutput>
 The 3rd letter in the alphabet is #GetAlphabetPosition(3)#<br>
 The 26th letter in the alphabet is #GetAlphabetPosition(26)#<br>
 "M" is the #GetAlphabetPosition("M")#(th/rd) letter in the alphabet.<br>
 "Z" is the #GetAlphabetPosition("Z")#(th/rd) letter in the alphabet.<br>
 </cfoutput>

args:
 - name: charornum
   desc: Either a character or number.
   req: true


javaDoc: |
 /**
  * Returns the numeric value of a letter's position in the alphabet, or the returns matching letter of a number in the alphabet.
  * 
  * @param charornum      Either a character or number. 
  * @return Returns either a character, number, or empty string on error. 
  * @author Seth Duffey (sduffey@ci.davis.ca.us) 
  * @version 1, January 7, 2002 
  */

code: |
 function GetAlphabetPosition(charornum) {
   var a_numeric = asc("a");
   charornum = lCase(trim(charornum));
 
   if(isNumeric(charornum)) {
       if(charornum lte 0 OR charornum gte 27) return "";
       return chr(charornum+a_numeric-1);
   } else {
       if(len(charornum) gt 1) return "";
       if(REFind("[^a-z]",charornum)) return "";
       return asc(charornum) - a_numeric + 1;
   }
   return 1;
 }

---

