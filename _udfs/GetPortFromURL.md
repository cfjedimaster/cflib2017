---
layout: udf
title:  GetPortFromURL
date:   2002-02-22T01:18:14.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the port number from a specified URL.
description: |
 Returns the port number for the supplied URL. If no port number is found, then returns an empty string. Works with any protocol that follows a &quot;x.x:PortNumber&quot; syntax where PortNumber = one or more digits. Supporting protocols include http, ftp, telnet, and others. Note, this function will return an empty string for any implied port numbers (containing a &quot;:&quot; but no digits afterwards).

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetPortFromURL("telnet://guest:pass@somehost.com:21/")#<br>
 #GetPortFromURL("somehost.com:80")#<br>
 #GetPortFromURL("somehost.com:")#<br>
 #GetPortFromURL("http://somehost.com:8000")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the port number from a specified URL.
  * 
  * @param this_url      URL to parse. 
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetPortFromURL(this_url) {
     var re_found_struct = "";
     
     this_url = trim(this_url);
     
     re_found_struct = REFind("[^./].[^./:]+(:[[:digit:]]+)", this_url, 1, "True");
 
     if (re_found_struct.pos[1] GT 0) {
         return Mid(this_url, re_found_struct.pos[2]+1, re_found_struct.len[2]-1);
     } else {
         return "";
     }
 }

---

