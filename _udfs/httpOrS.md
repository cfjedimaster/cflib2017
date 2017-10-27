---
layout: udf
title:  httpOrS
date:   2008-07-29T22:53:16.000Z
library: UtilityLib
argString: ""
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF5
shortDescription: Returns &quot;https&quot; if the current browser session is via SSL, or &quot;http&quot; if not.
tagBased: false
description: |
 Useful for bulding display pages where you want to provide a non-relative link, such as a link to a .css or .js file. This lets you render the link as HTTPS if the current session is SSL, or as HTTP if the current session is not SSL.

returnValue: Returns a string.

example: |
 Example: <img src="#httpOrS()#://#foo#/someImg.jpg">

args:


javaDoc: |
 /**
  * Returns &quot;https&quot; if the current browser session is via SSL, or &quot;http&quot; if not.
  * 
  * @return Returns a string. 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, July 29, 2008 
  */

code: |
 function httpOrS() {   
    if(cgi.server_port_secure IS TRUE) return "https";
    else return "http";
 }

oldId: 1846
---

