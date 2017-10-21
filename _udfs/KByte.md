---
layout: udf
title:  KByte
date:   2005-08-01T03:53:06.000Z
library: UtilityLib
argString: "bytes"
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 1
cfVersion: CF6
shortDescription: Converts a byte value into kb or mb if over 1,204 bytes.
description: |
 Given a number of bytes, this function will return an easier to read formatted value.  For example, &quot;10&quot; would return &quot;10 bytes&quot;, &quot;1024&quot; would return &quot;1 KB&quot;, &quot;1560&quot; would return &quot;1.5 KB&quot;.

returnValue: Returns a string.

example: |
 <cfoutput>
 1023: #KBytes(1023)#<br>
 1024: #KBytes(1024)#<br>
 1560: #KBytes(1560)#<br>
 1482843: #KBytes(1482843)#
 </cfoutput>

args:
 - name: bytes
   desc: The number of bytes.
   req: true


javaDoc: |
 /**
  * Converts a byte value into kb or mb if over 1,204 bytes.
  * 
  * @param bytes      The number of bytes. (Required)
  * @return Returns a string. 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 1, July 31, 2005 
  */

code: |
 function KBytes(bytes) {
     var b=0;
 
     if(arguments.bytes lt 1024) return trim(numberFormat(arguments.bytes,"9,999")) & " bytes";
     
     b=arguments.bytes / 1024;
     
     if (b lt 1024) {
         if(b eq int(b)) return trim(numberFormat(b,"9,999")) & " KB";
         return trim(numberFormat(b,"9,999.9")) & " KB";
     }
     b= b / 1024;
     if (b eq int(b)) return trim(numberFormat(b,"999,999,999")) & " MB";
     return trim(numberFormat(b,"999,999,999.9")) & " MB";
 }

---

