---
layout: udf
title:  getAllHostAddresses
date:   2005-09-22T22:04:14.000Z
library: NetLib
argString: "host"
author: David Chaplin-Loebell
authorEmail: davidcl@tlavideo.com
version: 1
cfVersion: CF5
shortDescription: Looks up all IP addresses for a hostname and returns them in an array.  Requires Java.
description: |
 Performs an &quot;A&quot; record DNS lookup.  Based on GetHostAddress() by Ben Forta.  This version returns all A records for the host in an array.  Good if you need need to get all host addresses for a host that uses round-robin DNS.  (The comment in the original function refers to this as a &quot;reverse lookup&quot; but that is not actually correct DNS terminology-- this is a forward lookup.)

returnValue: Returns an array.

example: |
 <cfset addr = GetAllHostAddresses("www.yahoo.com")>
 <cfloop list="#arraytolist(addr)#" index="ip">
     <cfoutput>#ip#<br /></cfoutput>
 </cfloop>

args:
 - name: host
   desc: Host name.
   req: true


javaDoc: |
 /**
  * Looks up all IP addresses for a hostname and returns them in an array.  Requires Java.
  * 
  * @param host      Host name. (Required)
  * @return Returns an array. 
  * @author David Chaplin-Loebell (davidcl@tlavideo.com) 
  * @version 1, September 22, 2005 
  */

code: |
 function getAllHostAddresses(host) {
     var iaclass=""; //holds the Java object
     var addr="";    //holds the array returned by the java object
     var hostaddr=arrayNew(1);    //holds the returned array of IP addresses.
     var i = "";
        
     // Init class
     iaclass=CreateObject("java", "java.net.InetAddress");
 
     // Get address
     addr=iaclass.getAllByName(host);
 
     // Return the address
     for (i=1; i LTE ArrayLen(addr); i=i+1) {
         iaclass = Addr[i]; //can't access Addr[i].getHostAddress() directly in CF5
         hostaddr[i] = iaclass.getHostAddress();
     }
     return hostaddr;
 }

---

