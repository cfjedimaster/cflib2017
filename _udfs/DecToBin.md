---
layout: udf
title:  DecToBin
date:   2001-11-06T15:02:03.000Z
library: MathLib
argString: "str"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Converts from decimal (base10) to binary (base2).
description: |
 Converts from decimal (base10) to binary (base2).  Provides a wrapper around the BIF FormatBaseN.  Converts both positive and negative numbers.

returnValue: Returns a string.

example: |
 <CFSET x=1000>
 <CFSET y=-1000>
 <CFOUTPUT>
 #x# represented in binary is: #DecToBin(x)#<BR>
 #y# represented in binary is: #DecToBin(y)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: Decimal number to convert to binary.
   req: true


javaDoc: |
 /**
  * Converts from decimal (base10) to binary (base2).
  * 
  * @param str      Decimal number to convert to binary. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, November 6, 2001 
  */

code: |
 function DecToBin(str){
   return FormatBaseN(str, 2);
 }

---

