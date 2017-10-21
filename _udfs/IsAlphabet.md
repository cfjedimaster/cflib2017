---
layout: udf
title:  IsAlphabet
date:   2002-06-21T12:09:49.000Z
library: StrLib
argString: "str"
author: Takaki Saito
authorEmail: saito@softai.co.jp
version: 1
cfVersion: CF5
shortDescription: This UDF confirms whether a string contains only letters.
description: |
 This UDF confirms that a string only contains letters, spaces, and periods.

returnValue: Returns a boolean.

example: |
 <CFSET strA = "abcde">
 <CFSET strB = "abc de">
 <CFSET strC = "abc.de">
 <CFSET strD = "abc*de">
 <CFSET strE = "abc1de">
 <CFOUTPUT>
 #strA# --- #IsAlphabet(strA)#<BR>
 #strB# --- #IsAlphabet(strB)#<BR>
 #strC# --- #IsAlphabet(strC)#<BR>
 #strD# --- #IsAlphabet(strD)#<BR>
 #strE# --- #IsAlphabet(strE)#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 /**
  * This UDF confirms whether a string contains only letters.
  * 
  * @param str      String to check. (Required)
  * @return Returns a boolean. 
  * @author Takaki Saito (saito@softai.co.jp) 
  * @version 1, June 21, 2002 
  */

code: |
 function IsAlphabet(str) {
     return not reFindNoCase("[^a-z\.[:space:]]",str);
 }

---

