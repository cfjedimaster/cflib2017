---
layout: udf
title:  DecToOct
date:   2001-11-06T15:12:51.000Z
library: MathLib
argString: "str"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts from decimal (base10) to octal (base8).
tagBased: false
description: |
 Converts from decimal (base10) to octal (base8).  Provides a wrapper around the BIF FormatBaseN.  Converts both positive and negative numbers.

returnValue: Returns a string.

example: |
 <CFSET x=1000>
 <CFSET y=-1000>
 
 <CFOUTPUT>
 #x# represented in octal is: #DecToOct(x)#<BR>
 #y# represented in octal is: #DecToOct(y)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: Decimal number to convert to octal..
   req: true


javaDoc: |
 /**
  * Converts from decimal (base10) to octal (base8).
  * 
  * @param str      Decimal number to convert to octal.. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, November 6, 2001 
  */

code: |
 function DecToOct(str){
   return FormatBaseN(str, 8);
 }

---

