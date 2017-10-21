---
layout: udf
title:  pwStrength
date:   2008-10-14T15:55:40.000Z
library: StrLib
argString: "pwString"
author: charlie griefer
authorEmail: charlie@griefer.com
version: 1
cfVersion: CF5
shortDescription: Checks the strength of a user supplied password.
description: |
 Returns a structure that holds data used to check the strength of a user supplied password.  keys include:
 
 string length
 number of alpha characters
 number of uppercase alpha characters
 number of lowercase alpha characters
 number of numeric characters
 number of bad (non alpha-numeric characters)

returnValue: Returns a struct.

example: |
 <cfset myStr = "dfWE2d %@ df4" />
 <cfdump var="#pwStrength(myStr)#" />

args:
 - name: pwString
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Checks the strength of a user supplied password.
  * 
  * @param pwString      String to check. (Required)
  * @return Returns a struct. 
  * @author charlie griefer (charlie@griefer.com) 
  * @version 1, October 14, 2008 
  */

code: |
 function pwStrength(pwString) {
     var retStruct = structNew();
 
     retStruct.originalString    = arguments.pwString;
     retStruct.originalLength    = len(arguments.pwString);
     retStruct.numericVals        = len(rereplace(pwString, '[^0-9]', '', 'all'));
     retStruct.alphas            = len(rereplaceNoCase(pwString, '[^a-z]', '', 'all'));
     retStruct.alphaUppers        = len(rereplace(pwString, '[^A-Z]', '', 'all'));
     retStruct.alphaLowers        = len(rereplace(pwString, '[^a-z]', '', 'all'));
     retStruct.badChars            = len(rereplace(pwString, '[\w]', '', 'all'));
     
     return retStruct;
 }

---

