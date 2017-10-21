---
layout: udf
title:  ClosestWebSafeColor
date:   2013-07-15T21:43:17.000Z
library: UtilityLib
argString: "hexInput"
author: Tony Brandner
authorEmail: tony@brandners.com
version: 1
cfVersion: CF5
shortDescription: Returns the closest web safe hexadecimal color for a given hexadecimal color.
description: |
 Takes a hex color in, and returns the closest web safe hexadecimal color. Returns a NULL (empty) string if input hex string is invalid.
 Thanks to Eric Carlisle (IsWebSafeColor)

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 003366, #closestWebSafeColor('003366')#<br>
 aabbcc, #closestWebSafeColor('aabbcc')#<br>
 112233, #closestWebSafeColor('112233')#<br>
 eeffgg, #closestWebSafeColor('eeffgg')#<br>
 fffffcc, #closestWebSafeColor('fffffcc')#<br>
 ##c0c00c, #closestWebSafeColor('##c0c00c')#
 </CFOUTPUT>

args:
 - name: hexInput
   desc: 
   req: true


javaDoc: |
 /**
  * Returns the closest web safe hexadecimal color for a given hexadecimal color.
  * 
  * @param hexInput       (Required)
  * @return Returns a string. 
  * @author Tony Brandner (tony@brandners.com) 
  * @version 1, July 15, 2013 
  */

code: |
 function closestWebSafeColor(hexInput) {
   var cleanHexInput = replace(hexInput,'##','','ALL');
   var hexOutput = '';
   var i = 0;
   if (Len(ReReplace(cleanHexInput, "[0-9abcdefABCDEF]", "","ALL")) eq 0 and Len(cleanHexInput) eq 6) {
     for (i=1; i lte 5; i=i+2) {
       closestMatch = 51 * Round((InputBaseN(mid(cleanHexInput,i,2),16)/51));
       if (closestMatch eq 0) {
         hexOutput = hexOutput & '00';
     } 
       else {
         hexOutput = hexOutput & FormatBaseN(closestMatch,16);
       }
     }
     return hexOutput;
   } 
   else {
     return 'invalid';
   }
 }

---

