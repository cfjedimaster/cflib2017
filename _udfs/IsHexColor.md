---
layout: udf
title:  IsHexColor
date:   2013-07-15T21:43:40.000Z
library: UtilityLib
argString: "hexInput"
author: Tony Brandner
authorEmail: tony@brandners.com
version: 1
cfVersion: CF5
shortDescription: Returns true if valid hexadecimal color.
tagBased: false
description: |
 Boolean check for a valid hexidecimal color.
 Thanks to Eric Carlisle (IsWebSafeColor).

returnValue: Returns a Boolean.

example: |
 <CFOUTPUT>
 003366, #IsHexColor('003366')#<br>
 aabbcc, #IsHexColor('aabbcc')#<br>
 ffee, #IsHexColor('ffee')#<br>
 eeffgg, #IsHexColor('eeffgg')#
 </CFOUTPUT>

args:
 - name: hexInput
   desc: Hex value you want to validate.
   req: true


javaDoc: |
 /**
  * Returns true if valid hexadecimal color.
  * 
  * @param hexInput      Hex value you want to validate. (Required)
  * @return Returns a Boolean. 
  * @author Tony Brandner (tony@brandners.com) 
  * @version 1, July 15, 2013 
  */

code: |
 function IsHexColor(hexInput) {
   var cleanHexInput = replace(hexInput,'##','','ALL');
   if (Len(ReReplace(cleanHexInput, "[0-9abcdefABCDEF]", "","ALL")) eq 0 and Len(cleanHexInput) gt 5) {
     return True;
   } else {
       return False;
     }
 }

oldId: 387
---

