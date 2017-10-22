---
layout: udf
title:  SpaceCap
date:   2002-09-20T11:26:36.000Z
library: StrLib
argString: "text"
author: Mark W. Breneman
authorEmail: Mark@vividmedia.com
version: 1
cfVersion: CF5
shortDescription: Returns a string with a space before each capital letter.
tagBased: false
description: |
 Returns a string with a space before each capital letter unless it is the first letter in the string. Handy if you need output a field name like &quot;FirstName&quot;  in the format of &quot;First Name&quot;.

returnValue: Returns a string.

example: |
 <CFSET RequiredField="FirstName">
 <CFOUTPUT>
 The <b>#spacecap(RequiredField)#</b> Field is Required.
 </CFOUTPUT>

args:
 - name: text
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Returns a string with a space before each capital letter.
  * 
  * @param text      String to modify. (Required)
  * @return Returns a string. 
  * @author Mark W. Breneman (Mark@vividmedia.com) 
  * @version 1, September 20, 2002 
  */

code: |
 function SpaceCap(text) {
   return REReplace(text, "([.^[:upper:]])", " \1","all");
 }

---

