---
layout: udf
title:  createWEPKey
date:   2004-09-21T17:06:45.000Z
library: SecurityLib
argString: "[length]"
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF5
shortDescription: Creates a 40-bit or 128-bit WEP key.
tagBased: false
description: |
 Creates a 40-bit or 128-bit WEP key. Use entirely at your own risk. No security is implied or provided by using this. This function simply creates a key for you.

returnValue: Returns a string.

example: |
 createWEPKey(40) returns: B053D17A22
 createWEPKey(128) returns: DAB9CF62B96D59DC0883A3AEA8
 createWEPKey() returns: A156F82F5374722B6E1ADEB32B

args:
 - name: length
   desc: Length of the WEP key. Either 40 or 128 (default).
   req: false


javaDoc: |
 /**
  * Creates a 40-bit or 128-bit WEP key.
  * 
  * @param length      Length of the WEP key. Either 40 or 128 (default). (Optional)
  * @return Returns a string. 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, January 12, 2006 
  */

code: |
 function createWEPKey() {
     var baseKey = "";
     var key = "";
     var defaultLength = 128;
     var length = defaultLength;
     
     /* If user has passed in a specfic key length, and they want a 40-bit key,
     change the value of length to 40 instead of 128.
     Of course, a 40-bit WEP key is trivial to crack, but that is not my problem. */
     if (arrayLen(arguments) eq 1) {
         if(val(arguments[1]) eq 40)
             length = 40;
     }
     
         
     /* 
         CF generated UUIDs look like this:
         73B96C47-F5F1-0F5C-488C7C5170101FA0
         8 chars - 4 chars - 4 chars - 16 chars
         
         First off, generate a base key
     */
     baseKey = mid(createUUID(),20,16) & mid(createUUID(),15,4) & mid(createUUID(),10,4) & mid(createUUID(),25,2);
     
     /* Create a 40-bit or 128-bit key, as the user requested */
     switch(length) {
         case "40": {
             key = mid(baseKey,10,10);
             break;
         }
         case "128": {
             key = baseKey;
             break;
         }
     } //end switch
     
     return key;
 }

---

