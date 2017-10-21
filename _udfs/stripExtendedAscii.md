---
layout: udf
title:  stripExtendedAscii
date:   2011-08-30T15:25:10.000Z
library: CFMLLib
argString: "str"
author: Kevin Benore
authorEmail: Kevin@Benore.net
version: 2
cfVersion: CF5
shortDescription: Removes all extended and non-printing ASCII characters from a string.
description: |
 Removes all extended and non-printing ASCII characters for a string. For example you may have data that has TABs, LINE FEEDs (or CARRIAGE RETURNs), international letters, or non-printing characters that you simply want to remove, this function will delete them.

returnValue: Returns a string.

example: |
 USAGE:
 
 <cfscript>stripExtendedAscii(VariableWithBadChars);</cfscript>
 
 OR
 
 <cfoutput>
 #stripExtendedAscii(VariableWithBadChars)#
 </cfoutput>

args:
 - name: str
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Removes all extended and non-printing ASCII characters from a string.
  * v2 by Adam Cameron
  * 
  * @param str      String to modify. (Required)
  * @return Returns a string. 
  * @author Kevin Benore (Kevin@Benore.net) 
  * @version 2, August 30, 2011 
  */

code: |
 function stripExtendedAscii(str) {
   return reReplace(arguments.str, "[^\x20-\x7E]", "", "ALL"); // 0x20 = space, chr(32); \0x7E = ~ / tilde, chr(126)
 };

---

