---
layout: udf
title:  DecToHex
date:   2001-11-06T15:14:19.000Z
library: MathLib
argString: "str"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts from decimal(base10) to hexadecimal (base16).
description: |
 Converts from decimal (base10) to hexadecimal (base16).  Provides a wrapper around the BIF FormatBaseN.  Converts both positive and negative numbers.

returnValue: Returns a string.

example: |
 <CFSET x=1000>
 <CFSET y=-1000>
 <CFOUTPUT>
 #x# represented in hexadecimal is: #DecToHex(x)#<BR>
 #y# represented in hexadecimal is: #DecToHex(y)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: Decimal number to convert to hexadecimal.
   req: true


javaDoc: |
 /**
  * Converts from decimal(base10) to hexadecimal (base16).
  * 
  * @param str      Decimal number to convert to hexadecimal. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 6, 2001 
  */

code: |
 function DecToHex(str){
   return Ucase(FormatBaseN(str, 16));
 }

---

