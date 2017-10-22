---
layout: udf
title:  URLHash
date:   2002-01-07T12:52:47.000Z
library: SecurityLib
argString: "URLValue"
author: John Bartlett
authorEmail: jbartlett@strangejourney.com
version: 1
cfVersion: CF5
shortDescription: URL Security tool to prevent a user from changing any part of a URL.
tagBased: false
description: |
 This function generates a Hash value based off of the full URL including any URL variables and the remote user's IP address.
 
 You can use the URLCheckHash UDF to determine if the URL was changed.

returnValue: Returns a string.

example: |
 <cfset x = 2>
 <cfset urlData="id=#X#&mode=display">
 <cfoutput>
 Hashed URL is:<br>
 display.cfm?#URLHash(urlData)#
 </cfoutput>

args:
 - name: URLValue
   desc: The string to hash.
   req: true


javaDoc: |
 /**
  * URL Security tool to prevent a user from changing any part of a URL.
  * 
  * @param URLValue      The string to hash. 
  * @return Returns a string. 
  * @author John Bartlett (jbartlett@strangejourney.com) 
  * @version 1, January 7, 2002 
  */

code: |
 function URLHash(URLValue)
 {
   var HashData =cgi.Server_Name & cgi.Remote_Addr & cgi.Script_Name & URLValue;
   return URLValue & "&hash=" & LCase(Hash(HashData));
 }

---

