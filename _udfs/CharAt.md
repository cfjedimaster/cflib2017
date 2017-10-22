---
layout: udf
title:  CharAt
date:   2001-08-27T14:16:23.000Z
library: StrLib
argString: "str, pos"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF5
shortDescription: Returns the character at a certain position in a string.
tagBased: false
description: |
 Returns the character at a certain position in a string.

returnValue: Returns a character.

example: |
 <CFSET STR = "This is the end.">
 <CFOUTPUT>
 2nd char: #CharAt(Str,2)#<BR>
 4th char: #CharAt(Str,4)#<BR>
 6th char: #CharAt(Str,6)#<BR>
 8th char: #CharAt(Str,8)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: String to be checked.
   req: true
 - name: pos
   desc: Position to get character from.
   req: true


javaDoc: |
 /**
  * Returns the character at a certain position in a string.
  * 
  * @param str      String to be checked. 
  * @param pos      Position to get character from. 
  * @return Returns a character. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 1, December 3, 2001 
  */

code: |
 function CharAt(str,pos) {
     return Mid(str,pos,1);
 }

---

