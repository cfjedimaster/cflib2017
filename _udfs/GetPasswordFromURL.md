---
layout: udf
title:  GetPasswordFromURL
date:   2002-02-22T01:21:25.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the password from a specified URL.
tagBased: false
description: |
 Returns the password (ending with &quot;@&quot;) for the supplied URL. If no password is found, then returns an empty string. Works with any protocol that follows a &quot;username:password@&quot; syntax including ftp, telnet, and imap and others.

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetPasswordFromURL("telnet://guest:pass@somehost.com:21/")#<br>
 #GetPasswordFromURL("guest:pass@somehost.com")#<br>
 #GetPasswordFromURL("http://host.com/")#<br>
 #GetPasswordFromURL("ftp://me:@host.com/")#<br>
 #GetPasswordFromURL("ftp://me@host.com/")#<br>
 #GetPasswordFromURL("ftp://:@host.com/")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the password from a specified URL.
  * 
  * @param this_url      URL to parse. 
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetPasswordFromURL(this_url) {
     var first_char       = "";
     var re_found_struct  = "";
     
     this_url = trim(this_url);
     
     first_char = Left(this_url, 1);
     if (Find(first_char, "./")) {
         return "";   // relative URL = no password   (ex: "../dir1/filename.html" or "/dir1/filename.html")
     } else if(Find("://", this_url)){
         // absolute URL    (ex: "ftp://user:pass@ftp.host.com")
         re_found_struct = REFind("[^:]*:([^@]*@)", this_url, Find("://", this_url)+3, "True");
     } else {
         // abbreviated URL (ex: "user:pass@ftp.host.com")
         re_found_struct = REFind("[^:]*:([^@]*@)", this_url, 1, "True");
     }
     
     if (re_found_struct.pos[1] GT 0) {
         return Mid(this_url, re_found_struct.pos[2], re_found_struct.len[2]-1);
     } else {
         return "";
     }
 }

---

