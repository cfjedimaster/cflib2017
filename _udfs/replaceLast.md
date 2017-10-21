---
layout: udf
title:  replaceLast
date:   2009-06-11T23:35:24.000Z
library: StrLib
argString: "string, substring1, substring2"
author: John Whish
authorEmail: john.whish@crisp-ebusiness.com
version: 0
cfVersion: CF5
shortDescription: Replaces the last occurrence of a substring in a string
description: |
 Replaces the last occurrence of a substring in a string, with another string.

returnValue: Returns a string.

example: |
 <cfset mystring = "Monday, Tuesday, Wednesday, Thursday, Friday, Friday, Sunday" />
 <cfoutput>
 #replaceLast(mystring,"Friday","Saturday")#
 </cfoutput>

args:
 - name: string
   desc: List to parse.
   req: true
 - name: substring1
   desc: Substring to search for.
   req: true
 - name: substring2
   desc: String to use for a replacement.
   req: true


javaDoc: |
 /**
  * Replaces the last occurrence of a substring in a string
  * 
  * @param string      List to parse. (Required)
  * @param substring1      Substring to search for. (Required)
  * @param substring2      String to use for a replacement. (Required)
  * @return Returns a string. 
  * @author John Whish (john.whish@crisp-ebusiness.com) 
  * @version 0, June 11, 2009 
  */

code: |
 function replaceLast(string, substring1, substring2) {
     return Reverse(Reverse(arguments.string).replaceFirst(Reverse(arguments.substring1),Reverse(arguments.substring2)));
 }

---

