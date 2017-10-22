---
layout: udf
title:  GetServerIP
date:   2004-01-12T21:23:05.000Z
library: UtilityLib
argString: ""
author: Robert Everland III
authorEmail: reverland@reactivevision.com
version: 1
cfVersion: CF5
shortDescription: Gets the ip address of the server.
tagBased: false
description: |
 This tag is able to get the ip address of your server. This can be used for servers that are in a cluster and you need to know the ipaddress of the computer throwing an error. This will only work for one ip of a machine.

returnValue: Returns a string.

example: |
 <cfoutput>#GetServerIP()#</cfoutput>

args:


javaDoc: |
 /**
  * Gets the ip address of the server.
  * 
  * @return Returns a string. 
  * @author Robert Everland III (reverland@reactivevision.com) 
  * @version 1, January 12, 2004 
  */

code: |
 function GetServerIP() {
    var iaclass="";
    var addr="";
       
    // Init class
    iaclass=CreateObject("java", "java.net.InetAddress");
 
    //Get Local host variable
    addr=iaclass.getLocalHost();
 
    // Return ip address
    return addr.getHostAddress();
 }

---

