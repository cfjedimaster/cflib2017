---
layout: udf
title:  ip2long
date:   2009-01-09T23:23:16.000Z
library: NetLib
argString: "ip"
author: Troy Pullis
authorEmail: tpullis@yahoo.com
version: 0
cfVersion: CF5
shortDescription: Converts a string containing an (IPv4) Internet Protocol dotted address (aaa.bbb.ccc.ddd) into a proper address representation.
description: |
 Converts a string containing an (IPv4) Internet Protocol dotted address (aaa.bbb.ccc.ddd) into a proper address representation. Returns 0 if error occurs.

returnValue: Returns a number.

example: |
 <cfoutput>
 #ip2long('202.186.13.4')#= 3401190660<br>
 </cfoutput>

args:
 - name: ip
   desc: IP address as string.
   req: true


javaDoc: |
 /**
  * Converts a string containing an (IPv4) Internet Protocol dotted address (aaa.bbb.ccc.ddd) into a proper address representation.
  * 
  * @param ip      IP address as string. (Required)
  * @return Returns a number. 
  * @author Troy Pullis (tpullis@yahoo.com) 
  * @version 0, January 9, 2009 
  */

code: |
 function ip2long(ip) {
     var iparr = ListToArray(ip,".");
     if (ArrayLen(iparr) != 4)
         return 0;
     else 
          return iparr[1]*256^3 + iparr[2]*256^2 + iparr[3]*256 + iparr[4];
 }

---

