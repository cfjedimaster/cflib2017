---
layout: udf
title:  IPclass
date:   2004-02-14T10:50:52.000Z
library: NetLib
argString: "ip"
author: del usr
authorEmail: delusrexpert@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Converts an IP address to a network class.
tagBased: false
description: |
 Converts an IP address to a network class.

returnValue: Returns a string.

example: |
 <cfset varip = "192.168.0.1">
 <cfset varclass = ipclass("192.168.0.1")>
 <cfoutput>
     IP: #varip#<br />
     Class: #varclass#<br />
 </cfoutput>

args:
 - name: ip
   desc: IP address.
   req: true


javaDoc: |
 /**
  * Converts an IP address to a network class.
  * 
  * @param ip      IP address. (Required)
  * @return Returns a string. 
  * @author del usr (delusrexpert@hotmail.com) 
  * @version 1, February 14, 2004 
  */

code: |
 function IPclass(ip) {
     var myint = listFirst(ip, ".");
     if (myint GTE 1 and myint LTE 127) return "Class A";
     if (myint GTE 128 and myint LTE 191) return "Class B";
     if (myint GTE 192 and myint LTE 223) return "Class C";
     if (myint GTE 224 and myint LTE 239) return "Class D";
     if (myint GTE 240 and myint LTE 255) return "Class E";
 }

---

