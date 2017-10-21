---
layout: udf
title:  OctToBin
date:   2001-11-06T15:30:53.000Z
library: MathLib
argString: "str"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts from octal (base8) to decimal (base10).
description: |
 Converts from octal (base8) to decimal (base10).  Provides a wrapper around the BIF InputBaseN.  Converts both positive and negative numbers.

returnValue: Returns a number.

example: |
 <CFSET x='1750'>
 <CFSET y='37777776030'>
 <CFOUTPUT>
 #x# represented in decimal is: #OctToDec(x)#<BR>
 #y# represented in decimal is: #OctToDec(y)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: String (hexadecimal number)  to convert to decimal.
   req: true


javaDoc: |
 /**
  * Converts from octal (base8) to decimal (base10).
  * 
  * @param str      String (hexadecimal number)  to convert to decimal. 
  * @return Returns a number. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, November 6, 2001 
  */

code: |
 function OctToDec(str){
   return InputBaseN(str, 8);
 }

---

