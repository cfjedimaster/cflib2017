---
layout: udf
title:  GetHostName
date:   2001-12-19T20:14:39.000Z
library: NetLib
argString: "address"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF5
shortDescription: Performs a DNS lookup on an IP address.
description: |
 DNS lookup, provide an IP address, it'll return a host name. If the address is invalid an exception will be throw, so &lt;CFTRY&gt;/&lt;CFCATCH&gt; should be used.

returnValue: Returns a domain name.

example: |
 <CFOUTPUT>
 #GetHostName(CGI.REMOTE_ADDR)#<br>
 <i>Note, since we cache pages, the result of this test will not reflect your remote address.</i>
 </CFOUTPUT>

args:
 - name: address
   desc: IP address to look up.
   req: true


javaDoc: |
 /**
  * Performs a DNS lookup on an IP address.
  * 
  * @param address      IP address to look up. 
  * @return Returns a domain name. 
  * @author Ben Forta (ben@forta.com) 
  * @version 1, December 19, 2001 
  */

code: |
 function GetHostName(address) {
    // Variables
    var iaclass="";
    var addr="";
    
    // Init class
    iaclass=CreateObject("java", "java.net.InetAddress");
 
    // Get address
    addr=iaclass.getByName(address);
 
    // Return the name    
    return addr.getHostName();
 }

---

