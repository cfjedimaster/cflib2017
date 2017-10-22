---
layout: udf
title:  isUpperLower
date:   2005-11-21T03:16:40.000Z
library: StrLib
argString: "character"
author: Larry Juncker
authorEmail: larry@aljnet.net
version: 1
cfVersion: CF5
shortDescription: Checks to see if a submitted letter is Upper or Lower Case.
tagBased: false
description: |
 This UDF will check to see if a submitted alpha character is Upper or Lower Case.

returnValue: Returns either &quot;upper&quot;, &quot;lower&quot;, or &quot;Not Alpha&quot;.

example: |
 <cfoutput>
 isUpperLower('U') = #isUpperLower('U')#<br>
 isUpperLower('d') = #isUpperLower('d')#<br>
 isUpperLower('F') = #isUpperLower('F')#<br>
 </cfoutput>

args:
 - name: character
   desc: The character to check.
   req: true


javaDoc: |
 /**
  * Checks to see if a submitted letter is Upper or Lower Case.
  * 
  * @param character      The character to check. (Required)
  * @return Returns either &quot;upper&quot;, &quot;lower&quot;, or &quot;Not Alpha&quot;. 
  * @author Larry Juncker (larry@aljnet.net) 
  * @version 1, November 20, 2005 
  */

code: |
 function isUpperLower(character) {
     if(asc(character) gte 65 and asc(character) lte 90) return "upper";
     else if(asc(character) gte 97 and asc(character) lte 122) return "lower";
      return "Not Alpha"; 
 }

---

