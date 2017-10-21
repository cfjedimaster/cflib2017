---
layout: udf
title:  isEmail
date:   2009-05-08T15:39:07.000Z
library: StrLib
argString: "str"
author: Jeff Guillaume
authorEmail: jeff@kazoomis.com
version: 7
cfVersion: CF5
shortDescription: Tests passed value to see if it is a valid e-mail address (supports subdomain nesting and new top-level domains).
description: |
 Tests passed value to see if it is a valid e-mail address (supports subdomain nesting and new top-level domains).

returnValue: Returns a boolean.

example: |
 <cfoutput>
 #YesNoFormat(IsEmail("jguillaume@stoneage.com"))#<br>
 #YesNoFormat(IsEmail("jguillaume@stoneage.com.info"))#<br>
 #YesNoFormat(IsEmail("jguillaume@subdomain.stoneage.museum"))#<br>
 #YesNoFormat(IsEmail("jguillaume@stoneage.invalidTLD"))#
 </cfoutput>

args:
 - name: str
   desc: The string to check.
   req: true


javaDoc: |
 /**
  * Tests passed value to see if it is a valid e-mail address (supports subdomain nesting and new top-level domains).
  * Update by David Kearns to support '
  * SBrown@xacting.com pointing out regex still wasn't accepting ' correctly.
  * Should support + gmail style addresses now.
  * More TLDs
  * Version 4 by P Farrel, supports limits on u/h
  * Added mobi
  * v6 more tlds
  * 
  * @param str      The string to check. (Required)
  * @return Returns a boolean. 
  * @author Jeff Guillaume (jeff@kazoomis.com) 
  * @version 7, May 8, 2009 
  */

code: |
 function isEmail(str) {
     return (REFindNoCase("^['_a-z0-9-\+]+(\.['_a-z0-9-\+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.(([a-z]{2,3})|(aero|asia|biz|cat|coop|info|museum|name|jobs|post|pro|tel|travel|mobi))$",
 arguments.str) AND len(listGetAt(arguments.str, 1, "@")) LTE 64 AND
 len(listGetAt(arguments.str, 2, "@")) LTE 255) IS 1;
 }

---

