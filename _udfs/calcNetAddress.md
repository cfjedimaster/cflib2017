---
layout: udf
title:  calcNetAddress
date:   2003-05-12T11:16:14.000Z
library: NetLib
argString: "myIP, myNetMask"
author: Tanguy Rademakers
authorEmail: t@newmediatwins.net
version: 1
cfVersion: CF5
shortDescription: calculate a network address from an IP address and a (sub)Netmask.
tagBased: false
description: |
 calculate a network address from an IP address and a (sub)Netmask. Does not validate either input parameter.

returnValue: Returns an IP address (string).

example: |
 <cfoutput>
 #calcNetAddress('217.136.252.232','255.255.255.197')#
 </cfoutput>

args:
 - name: myIP
   desc: IP Address.
   req: true
 - name: myNetMask
   desc: Netmask.
   req: true


javaDoc: |
 /**
  * calculate a network address from an IP address and a (sub)Netmask.
  * 
  * @param myIP      IP Address. (Required)
  * @param myNetMask      Netmask. (Required)
  * @return Returns an IP address (string). 
  * @author Tanguy Rademakers (t@newmediatwins.net) 
  * @version 1, May 12, 2003 
  */

code: |
 function calcNetAddress (myIP, myNetMask) {
     var NetAddress = "";
     var i = 1;
     
     for (i = 1; i lte 4; i = i + 1) {
         NetAddress = ListAppend(NetAddress, BitAnd(ListGetAt(myIP,i,'.'),ListGetAt(myNetMask,i,'.')) ,'.'); 
     }
     return NetAddress;
 }

---

