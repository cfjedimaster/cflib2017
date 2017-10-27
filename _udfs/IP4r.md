---
layout: udf
title:  IP4r
date:   2004-11-18T15:55:52.000Z
library: NetLib
argString: "ip4"
author: Scott Glassbrook
authorEmail: cflib@vox.phydiux.com
version: 2
cfVersion: CF5
shortDescription: IP4r converts standard dotted IP addresses to their reversed IP4r equivalent.
tagBased: false
description: |
 IP4R Takes a common IP address (like 192.168.0.1) and converts it to it's IP4r equivalent. (in this case, it'd be 1.0.168.192) This is used by mack DNS based black lists, and mail server software to check DNS based black lists.

returnValue: Returns a string.

example: |
 <cfscript>
  variables.ip_to_convert = '192.168.0.1';
  writeoutput("The IP4r of " & variables.ip_to_convert & " is " & ip4r(variables.ip_to_convert));
 </cfscript>

args:
 - name: ip4
   desc: IP address.
   req: true


javaDoc: |
 /**
  * IP4r converts standard dotted IP addresses to their reversed IP4r equivalent.
  * 
  * @param ip4      IP address. (Required)
  * @return Returns a string. 
  * @author Scott Glassbrook (cflib@vox.phydiux.com) 
  * @version 2, November 18, 2004 
  */

code: |
 function ip4r(ip4) {
     return ReReplaceNoCase(ip4,  "([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})",  "\4.\3.\2.\1");
 }

oldId: 1107
---

