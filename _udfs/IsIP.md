---
layout: udf
title:  IsIP
date:   2001-07-17T17:55:11.000Z
library: StrLib
argString: "string"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Returns TRUE if the string is a valid IP address.
tagBased: false
description: |
 Performs a regex on the string and determines if it a valid IP address. The value passed
 must match contain four octets delimited by a period. Each octet must be a number from 1 to 255. The
 addresses 0.0.0.0 and 255.255.255.255 are not valid. <B>Note</B> This only checks the octet form of IP addresses. It does
 not check the binary form.

returnValue: Returns a boolean.

example: |
 <CFSET BADIP = "fred">
 <CFSET BADIP2 = "120.120.120.0">
 <CFSET IP = "216.115.108.245">
 <CFOUTPUT>
 Is #BADIP# valid? #IsIP(BADIP)#<BR>
 Is #BADIP2# valid? #IsIP(BADIP2)#<BR>
 Is #IP# valid? #IsIP(IP)#<BR>
 </CFOUTPUT>

args:
 - name: string
   desc: String to be checked.
   req: true


javaDoc: |
 /**
  * Returns TRUE if the string is a valid IP address.
  * 
  * @param string      String to be checked. 
  * @return Returns a boolean. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function isIP(ip){
     var ii = 1;
     //make sure it is a '.' delimited list 4 long
     if(listlen(ip,".") is not 4) return false;
 
     //make sure each item is a number between 1 and 255
     for(ii = 1;ii lte 4;ii = ii + 1){
         if(not isnumeric(listgetat(ip,ii,".")) OR listgetat(ip,ii,".") GT 255 OR listgetat(ip,ii,".") LT 0)    return false;
     }
     //check for the special cases of 255.255.255.255 or 0.0.0.0, which is not really valid
     if(ip is "255.255.255.255" OR IP is "0.0.0.0") return false;
     return true;
 }

oldId: 44
---

