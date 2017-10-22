---
layout: udf
title:  BinToDec
date:   2001-11-06T15:23:09.000Z
library: MathLib
argString: "str"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts from binary (base2) to decimal (base10).
tagBased: false
description: |
 Converts from binary (base2) to decimal (base10).  Provides a wrapper around the BIF InputBaseN.  Converts both positive and negative numbers.

returnValue: Returns a number.

example: |
 <CFSET x='1111101000'>
 <CFSET y='11111111111111111111110000011000'>
 <CFOUTPUT>
 #x# represented in decimal is: #BinToDec(x)#<BR>
 #y# represented in decimal is: #BinToDec(y)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: String (binary number)  to convert to decimal.
   req: true


javaDoc: |
 /**
  * Converts from binary (base2) to decimal (base10).
  * 
  * @param str      String (binary number)  to convert to decimal. 
  * @return Returns a number. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, November 6, 2001 
  */

code: |
 function BinToDec(str){
   return InputBaseN(str, 2);
 }

---

