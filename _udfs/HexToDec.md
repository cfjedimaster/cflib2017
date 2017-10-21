---
layout: udf
title:  HexToDec
date:   2001-11-06T15:27:57.000Z
library: MathLib
argString: "str"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts from hexadecimal (base16) to decimal (base10).
description: |
 Converts from hexadecimal (base16) to decimal (base10).  Provides a wrapper around the BIF InputBaseN.  Converts both positive and negative numbers.

returnValue: Returns a number.

example: |
 <CFSET x='3E8'>
 <CFSET y='FFFFFC18'>
 <CFOUTPUT>
 #x# represented in decimal is: #HexToDec(x)#<BR>
 #y# represented in decimal is: #HexToDec(y)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: String representing hexadecimal value you want converted to decimal.
   req: true


javaDoc: |
 /**
  * Converts from hexadecimal (base16) to decimal (base10).
  * 
  * @param str      String representing hexadecimal value you want converted to decimal. 
  * @return Returns a number. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, November 6, 2001 
  */

code: |
 function HexToDec(str){
   return InputBaseN(str, 16);
 }

---

