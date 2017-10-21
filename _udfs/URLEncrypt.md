---
layout: udf
title:  URLEncrypt
date:   2003-02-19T13:49:07.000Z
library: SecurityLib
argString: "cQueryString, nKey"
author: Timothy Heald
authorEmail: theald@schoollink.net
version: 2
cfVersion: CF5
shortDescription: Add security by encrypting and decrypting URL variables.
description: |
 This is actually two functions.  The first urlEncrypt(&quot;name=value&amp;name=value&amp;name=value&quot;,key) you use when you would have a link or an action that you would be setting url variables in.  The second urlDecrypt(key) you use on whatever page you are calling, or using as the form action page.

returnValue: Returns an encrypted query string.

example: |
 <CFSET Name = "Ray">
 <CFSET Age = 28>
 <CFSET Key = "MySecretBlah348123190">
 <CFSET QS = "name=#Name#&age=#Age#">
 <CFOUTPUT>
 Link will be, foo.cfm#URLEncrypt(QS,key)#
 </CFOUTPUT>

args:
 - name: cQueryString
   desc: Query string to encrypt.
   req: true
 - name: nKey
   desc: Key to use for encryption.
   req: true


javaDoc: |
 /**
  * Add security by encrypting and decrypting URL variables.
  * 
  * @param cQueryString      Query string to encrypt. (Required)
  * @param nKey      Key to use for encryption. (Required)
  * @return Returns an encrypted query string. 
  * @author Timothy Heald (theald@schoollink.net) 
  * @version 2, February 19, 2003 
  */

code: |
 function urlEncrypt(queryString, key){
     // encode the string
     var uue = cfusion_encrypt(queryString, key);
         
     // make a checksum of the endoed string
     var checksum = left(hash(uue & key),2);
         
     // assemble the URL
     queryString = "/" & uue & checksum &"/index.htm";
         
     return queryString;
 }

---

