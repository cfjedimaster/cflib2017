---
layout: udf
title:  PadStringToLen
date:   2002-06-18T12:04:24.000Z
library: StrLib
argString: "string, char, count"
author: Stephen Rittler
authorEmail: scrittler@etechsolutions.com
version: 1
cfVersion: CF5
shortDescription: Pads a string to a length of n characters.  Padding is from the left.
tagBased: false
description: |
 Pads a string to a length of n characters.  Padding is from the left.  If the length of the string is greater than or equal to the number of characters to pad the string out to, the string is returned unchanged.

returnValue: Returns a string.

example: |
 <CFSET x=123>
 <CFSET y="test">
 
 <CFOUTPUT>
 #PadStringToLen(x, 0, 8)#<BR>
 #PadStringToLen(y, "a", 8)#<BR>
 #PadStringToLen(y, "a", 2)#
 </CFOUTPUT>

args:
 - name: string
   desc: String you want to pad.
   req: true
 - name: char
   desc: Character to use as the padding.
   req: true
 - name: count
   desc: Total number of characters to pad the string out to.
   req: true


javaDoc: |
 /**
  * Pads a string to a length of n characters.  Padding is from the left.
  * Based on the UDF PadString() by Rob Brooks-Bilson (rbils@amkor.com).
  * 
  * @param string      String you want to pad. (Required)
  * @param char      Character to use as the padding. (Required)
  * @param count      Total number of characters to pad the string out to. (Required)
  * @return Returns a string. 
  * @author Stephen Rittler (scrittler@etechsolutions.com) 
  * @version 1, June 18, 2002 
  */

code: |
 function PadStringToLen(string, char, count)
 {
   var strLen = len(string);
   var padLen = count - strLen;
   if (padLen lte 0) {
     return string;
   }
   else {
     return RepeatString(char, padLen) & string;
   }
 }

---

