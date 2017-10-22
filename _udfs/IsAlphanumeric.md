---
layout: udf
title:  IsAlphanumeric
date:   2001-11-02T17:52:19.000Z
library: StrLib
argString: "str"
author: Marcus Raphelt
authorEmail: cflib@raphelt.de
version: 1
cfVersion: CF5
shortDescription: Checks if a string is alphanumeric
tagBased: false
description: |
 This function checks if the passed string is alphanumeric.

returnValue: Returns a Boolean value.

example: |
 <CFSET x="abc123">
 <CFSET y="$123">
 
 <CFOUTPUT>
 Is "#x#" alphanumeric? #YesNoFormat(IsAlphanumeric(x))#<BR>
 Is "#y#" alphanumeric? #YesNoFormat(IsAlphanumeric(y))#
 </CFOUTPUT>

args:
 - name: str
   desc: String you want to check.
   req: true


javaDoc: |
 /**
  * Checks if a string is alphanumeric
  * 
  * @param str      String you want to check. 
  * @return Returns a Boolean value. 
  * @author Marcus Raphelt (cflib@raphelt.de) 
  * @version 1, November 2, 2001 
  */

code: |
 function IsAlphanumeric(str) {
   if (REFindNoCase("[^a-z0-9]", str) eq 0)
     return true;
   else
     return false;
 }

---

