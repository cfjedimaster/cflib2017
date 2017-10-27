---
layout: udf
title:  isIPInRange
date:   2005-04-14T12:14:47.000Z
library: NetLib
argString: "sIP, sIPREList"
author: Peter Crowley
authorEmail: pcrowley@webzone.ie
version: 1
cfVersion: CF6
shortDescription: Is this IP within any of the IP ranges supplied.
tagBased: false
description: |
 Returns true if the passed IP address matchs any of the IP addresses or IP address ranges supplied in a Regex list. This code be to useful in blocking or granting people access based on location. I used it to block people running check/cheque scams from certain areas of the website. Must use comma delimited list.

returnValue: Returns a boolean.

example: |
 <CFSET blockedIPrange="^217\.78\.(6[4-9]|7[0-9])\.[0-9]+,^195\.166\.2(2[4-9]|[3-4][0-9]|5[0-5])\.[0-9]+">
 
 <cfif isIPInRange(CGI.REMOTE_ADDR,blockedIPrange)>
 This website is not available in your location.
 <cfabort>
 </cfif>

args:
 - name: sIP
   desc: The IP.
   req: true
 - name: sIPREList
   desc: List of IP Regex strings.
   req: true


javaDoc: |
 /**
  * Is this IP within any of the IP ranges supplied.
  * 
  * @param sIP      The IP. (Required)
  * @param sIPREList      List of IP Regex strings. (Required)
  * @return Returns a boolean. 
  * @author Peter Crowley (pcrowley@webzone.ie) 
  * @version 1, April 14, 2005 
  */

code: |
 function isIPInRange(sIP,sIPREList) {
     var i = 1;
     var nREListCount=ListLen(sIPREList);
     
     for (i = 1; i LTE nREListCount; i = i+1) {
         if (REFind(ListGetAt(sIPREList,i),sIP)) return true;
     }
     return false;
 }

oldId: 1075
---

