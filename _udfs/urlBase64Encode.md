---
layout: udf
title:  urlBase64Encode
date:   2007-08-10T12:47:29.000Z
library: StrLib
argString: "str"
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF5
shortDescription: Encodes a string to base64 format, then urlEncodes the result so that it works when used as part of a URL string.
tagBased: false
description: |
 Encodes a string to Base64 format, then urlEncodes the result so that it works when used as part of a URL string. The &quot;Base64 then urlEncode&quot; is necessary to convert any reserved chars such as &quot;+&quot; or &quot;=&quot;, which would cause problems if used in a URL string.

returnValue: Returns a string.

example: |
 <cfscript>
 myVar = "chars like ? would be bad in a URL";
 myencodedvar = urlBase64Encode(myVar);
 </cfscript>
 
 <cfoutput>#myencodedvar#</cfoutput>

args:
 - name: str
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Encodes a string to base64 format, then urlEncodes the result so that it works when used as part of a URL string.
  * 
  * @param str      String to format. (Required)
  * @return Returns a string. 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, August 10, 2007 
  */

code: |
 function urlBase64Encode(str){
     
     /* encodes a string to base64 format,
     then urlEncodes the result so that it
     works when used as part of a URL string */
     
     var result = "";
     
     /* convert string to base64 format */
     result = toBase64(str);
     
     /* urlEncode to convert base64 chars that do not work when rendered in a URL 
     Note that this uses the single-argument format to work with earlier versions of CF. */
     result = urlEncodedFormat(result);
     
     return result;
 };

---

