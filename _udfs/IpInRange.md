---
layout: udf
title:  IpInRange
date:   2010-03-04T17:50:16.000Z
library: CFMLLib
argString: "start, end, ip"
author: A. Cole
authorEmail: acole76@NOSPAMgmail.com
version: 0
cfVersion: CF7
shortDescription: determine if IP is with in a range.
description: |
 determines if the ip is within the start and end range

returnValue: Returns a boolean.

example: |
 #isIpInRange("192.168.1.1", "192.168.1.255", "192.168.1.50")# in range<br>
 #isIpInRange("192.168.1.1", "192.168.3.255", "192.168.2.50")# in range<br>
 #isIpInRange("192.168.1.1", "192.168.1.255", "192.168.3.50")# not in range<br>

args:
 - name: start
   desc: start IP range
   req: true
 - name: end
   desc: end IP range
   req: true
 - name: ip
   desc: IP to test if in range
   req: true


javaDoc: |
 /**
  * determine if IP is with in a range.
  * 04-mar-2010 renamed to IPinRange so as not to conflict w/existing UDF
  * 
  * @param start      start IP range (Required)
  * @param end      end IP range (Required)
  * @param ip      IP to test if in range (Required)
  * @return Returns a boolean. 
  * @author A. Cole (acole76@NOSPAMgmail.com) 
  * @version 0, March 4, 2010 
  */

code: |
 function isIpInRange(start, end, ip)
     {
         var startArray = listtoarray(arguments.start, ".");
         var endArray = listtoarray(arguments.end, ".");
         var ipArray = listtoarray(arguments.ip, ".");
         var s = ((16777216 * startArray[1]) + (65536 * startArray[2]) + (256 * startArray[3]) + startArray[4]);
         var e = ((16777216 * endArray[1]) + (65536 * endArray[2]) + (256 * endArray[3]) + endArray[4]);
         var c = ((16777216 * ipArray[1]) + (65536 * ipArray[2]) + (256 * ipArray[3]) + ipArray[4]);
         
         return isvalid("range", c, s, e);
     }

---

