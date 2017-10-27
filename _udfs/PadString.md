---
layout: udf
title:  PadString
date:   2001-08-16T18:59:17.000Z
library: StrLib
argString: "string, char, count"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Pads a string with n characters.  Padding is from the left.
tagBased: false
description: |
 Pads a string with n characters.  Padding is from the left.

returnValue: Returns a string.

example: |
 <CFSET x=123>
 <CFSET y="test">
 
 <CFOUTPUT>
 #PadString(x, 0, 4)#<BR>
 #PadString(y, "a", 5)#
 </CFOUTPUT>

args:
 - name: string
   desc: String you want to pad.
   req: true
 - name: char
   desc: Character to use as the padding.
   req: true
 - name: count
   desc: Number of characters to pad the string with.
   req: true


javaDoc: |
 /**
  * Pads a string with n characters.  Padding is from the left.
  * 
  * @param string      String you want to pad. 
  * @param char      Character to use as the padding. 
  * @param count      Number of characters to pad the string with. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, August 16, 2001 
  */

code: |
 function PadString(string, char, count)
 {
   var Padding = RepeatString(char, count);
   return Padding & string;
 }

oldId: 152
---

