---
layout: udf
title:  stringToHex
date:   2006-05-08T11:45:20.000Z
library: StrLib
argString: "str"
author: Chris Dary
authorEmail: umbrae@gmail.com
version: 1
cfVersion: CF5
shortDescription: Counterpart to HexToString - converts an ASCII string to hexadecimal.
tagBased: false
description: |
 Counterpart to HexToString - converts an ASCII string to hexadecimal.

returnValue: Returns a string.

example: |
 <cfoutput>#stringToHex("hello")#</cfoutput>

args:
 - name: str
   desc: String to convert to hex.
   req: true


javaDoc: |
 /**
  * Counterpart to HexToString - converts an ASCII string to hexadecimal.
  * 
  * @param str      String to convert to hex. (Required)
  * @return Returns a string. 
  * @author Chris Dary (umbrae@gmail.com) 
  * @version 1, May 8, 2006 
  */

code: |
 function stringToHex(str) {
     var hex = "";
     var i = 0;
     for(i=1;i lte len(str);i=i+1) {
         hex = hex & right("0" & formatBaseN(asc(mid(str,i,1)),16),2);
     }
     return hex;
 }

---

