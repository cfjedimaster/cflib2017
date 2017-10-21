---
layout: udf
title:  long2ip
date:   2009-01-09T23:24:18.000Z
library: NetLib
argString: "longip"
author: Troy Pullis
authorEmail: tpullis@yahoo.com
version: 0
cfVersion: CF8
shortDescription: Generates an (IPv4) Internet Protocol dotted address (aaa.bbb.ccc.ddd) from the proper address representation.
description: |
 Generates an (IPv4) Internet Protocol dotted address (aaa.bbb.ccc.ddd) from the proper address representation. Returns 0 if error occurs.

returnValue: Returns the IP as a string.

example: |
 long2ip(3401190660) = 202.186.13.4

args:
 - name: longip
   desc: Numeric version of IP address.
   req: true


javaDoc: |
 /**
  * Generates an (IPv4) Internet Protocol dotted address (aaa.bbb.ccc.ddd) from the proper address representation.
  * 
  * @param longip      Numeric version of IP address. (Required)
  * @return Returns the IP as a string. 
  * @author Troy Pullis (tpullis@yahoo.com) 
  * @version 0, January 9, 2009 
  */

code: |
 function long2ip(longip) {
     var ip = "";
     var i = "";
     if (longip < 0 || longip > 4294967295) 
         return 0;
     for (i=3;i>=0;i--) {
         ip = ip & int(longip / 256^i);
         longip = longip - int(longip / 256^i) * 256^i;
         if (i>0) 
             ip = ip & ".";
     }
     return ip;
 }

---

