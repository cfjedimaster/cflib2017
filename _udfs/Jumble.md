---
layout: udf
title:  Jumble
date:   2001-12-16T11:02:12.000Z
library: StrLib
argString: "str"
author: Brad Roberts
authorEmail: broberts@nxs.net
version: 1
cfVersion: CF5
shortDescription: Takes a string and scrambles the characters.
tagBased: false
description: |
 Takes a string and scrambles the characters in a random fashion.  If no string is given, it scrambles the default string (numbers 1-10).

returnValue: Returns a string.

example: |
 <cfset string="coldfusion">
 
 <cfoutput>
 The scrambled string is: #jumble(string)#<BR>
 </cfoutput>

args:
 - name: str
   desc: String you want to jumble.
   req: true


javaDoc: |
 /**
  * Takes a string and scrambles the characters.
  * 
  * @param str      String you want to jumble. 
  * @return Returns a string. 
  * @author Brad Roberts (broberts@nxs.net) 
  * @version 1, December 16, 2001 
  */

code: |
 function jumble(str) {
   var tempstring=""; 
   var temp=0;
   while (len(str) gt 0) {
     temp = randrange(1, len(str));
     tempstring = tempstring & mid(str, temp, 1);
     str = removechars(str, temp, 1);
   }
   return tempstring;
 }

---

