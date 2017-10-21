---
layout: udf
title:  NumbersOnly
date:   2002-09-06T15:51:51.000Z
library: StrLib
argString: "str"
author: Mindframe, Inc.
authorEmail: info@mindframe.com
version: 1
cfVersion: CF5
shortDescription: Strips all non-numeric characters from a string.
description: |
 This udf has the intended purpose of formatting a phone number that is in a (xxx) xxx-xxxx to a xxxxxxxxxx format.

returnValue: Returns a string.

example: |
 <cfset phoneNumber = "(612) 204-0320">
 <cfoutput>
 My Phone ## is #phoneNumber#<br>
 My NumbersOnly Phone ## is #NumbersOnly(phoneNumber)#
 </cfoutput>

args:
 - name: str
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Strips all non-numeric characters from a string.
  * Modified by RCamden to use one line of code.
  * 
  * @param str      String to format. (Required)
  * @return Returns a string. 
  * @author Mindframe, Inc. (info@mindframe.com) 
  * @version 1, September 6, 2002 
  */

code: |
 function NumbersOnly(str) {
     return reReplace(str,"[^[:digit:]]","","all");
 }

---

