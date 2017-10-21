---
layout: udf
title:  GetHostAddress
date:   2012-01-13T02:45:56.000Z
library: NetLib
argString: "host"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF5
shortDescription: Performs a DNS lookup.
description: |
 Performs a DNS lookup. Provide a host name, it'll return an IP address. If the host name is invalid an exception will be throw, so &lt;CFTRY&gt;/&lt;CFCATCH&gt;
 should be used.

returnValue: Returns an IP address.

example: |
 <cfset url1 = "macromedia.com">
 <cfset url2 = "microsoft.com">
 <cfoutput>
 Host address for #url1# is #GetHostAddress(url1)#<br>
 Host address for #url2# is #GetHostAddress(url2)#<br>
 </cfoutput>

args:
 - name: host
   desc: The host name to lookup.
   req: true


javaDoc: |
 /**
  * Performs a DNS lookup.
  * 
  * @param host      The host name to lookup. (Required)
  * @return Returns an IP address. 
  * @author Ben Forta (ben@forta.com) 
  * @version 1, January 12, 2012 
  */

code: |
 function GetHostAddress(host) {
    // Variables
    var iaclass="";
    var addr="";
    
    // Init class
    iaclass=CreateObject("java", "java.net.InetAddress");
 
    // Get address
    addr=iaclass.getByName(host);
 
    // Return the address    
    return addr.getHostAddress();
 }

---

