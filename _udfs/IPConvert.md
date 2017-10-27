---
layout: udf
title:  IPConvert
date:   2003-08-28T09:40:17.000Z
library: NetLib
argString: "ip or numeric version"
author: Aaron Eisenberger
authorEmail: aaron@x-clothing.com
version: 1
cfVersion: CF5
shortDescription: Converts IPs to integers and back for efficient database storage.
tagBased: false
description: |
 IPConvert converts valid IP addresses into integers and back again.  This is useful for storing IP information in a database using the int datatype rather than char.

returnValue: Returns either a number of an IP.

example: |
 <cfset int=IPConvert(CGI.REMOTE_ADDR)>
 <cfset ip=IPConvert(int)>
 <cfoutput>
 Converted to: #int#<br>
 Converted back to: #ip#
 </cfoutput>

args:
 - name: ip or numeric version
   desc: IP or numeric version of IP.
   req: true


javaDoc: |
 /**
  * Converts IPs to integers and back for efficient database storage.
  * 
  * @param ip or numeric version      IP or numeric version of IP. (Required)
  * @return Returns either a number of an IP. 
  * @author Aaron Eisenberger (aaron@x-clothing.com) 
  * @version 1, August 28, 2003 
  */

code: |
 function IPConvert(val) {
     var int = '';
     var ip = arraynew(1);
     if (find('.',val))
         {
         int = 0;
         int = ListGetAt(val, 1, ".") * 256^3;
         int = int + ListGetAt(val, 2, ".") * 256^2;
         int = int + ListGetAt(val, 3, ".") * 256;
         int = int + ListGetAt(val, 4, ".");
         return int;
         }
     else
         {
         int = val;
         ip[1] = Int(int / 256^3);
         int = int - (ip[1] * 256^3);
         ip[2] = int(int / 256^2);
         int = int - (ip[2] * 256^2);
         ip[3] = int(int / 256);
         ip[4] = int - (ip[3] * 256);
         ip = ip[1] & "." & ip[2] & "." & ip[3] & "." & ip[4];
         return ip;
         }
 }

oldId: 946
---

