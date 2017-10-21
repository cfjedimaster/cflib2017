---
layout: udf
title:  IsMulticastAddress
date:   2001-12-19T20:14:55.000Z
library: NetLib
argString: "address"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF5
shortDescription: Checks to see if a specifid address (IP address or host name) is a multicast address (Class D).
description: |
 Checks to see if a specifid address (IP address or host name) is a multicast address (Class D). If the host name is invalid an exception will be throw, so &lt;CFTRY&gt;/&lt;CFCATCH&gt; should be used.

returnValue: Returns a boolean.

example: |
 <CFOUTPUT>
 #IsMulticastAddress("#CGI.REMOTE_ADDR#")#
 </CFOUTPUT>

args:
 - name: address
   desc: The address to check.
   req: true


javaDoc: |
 /**
  * Checks to see if a specifid address (IP address or host name) is a multicast address (Class D).
  * 
  * @param address      The address to check. 
  * @return Returns a boolean. 
  * @author Ben Forta (ben@forta.com) 
  * @version 1, December 19, 2001 
  */

code: |
 function IsMulticastAddress(address) {
    // Variables
    var iaclass="";
    var addr="";
    
    // Init class
    iaclass=CreateObject("java", "java.net.InetAddress");
 
    // Get address
    addr=iaclass.getByName(address);
 
    // Is Multicast (Class D)?
    return addr.isMulticastAddress();
 }

---

