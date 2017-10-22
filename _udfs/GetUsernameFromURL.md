---
layout: udf
title:  GetUsernameFromURL
date:   2002-08-23T10:36:17.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 2
cfVersion: CF5
shortDescription: Returns the username from a specified URL.
tagBased: false
description: |
 Returns the username (ending with either &quot;:&quot; or &quot;@&quot;) for the passed URL. If no user is found, then returns an empty string. Works with any protocol that follows a &quot;username:password@&quot; syntax including ftp, telnet, and imap and others.

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetUsernameFromURL("telnet://guest:pass@somehost.com:21/")#<br>
 #GetUsernameFromURL("guest:pass@somehost.com")#<br>
 #GetUsernameFromURL("http://host.com/")#<br>
 #GetUsernameFromURL("ftp://me:@host.com/")#<br>
 #GetUsernameFromURL("ftp://me@host.com/")#<br>
 #GetUsernameFromURL("ftp://:@host.com/")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the username from a specified URL.
  * Modified to handle differences in regex in cf5/mx. Thanks to Tom Lane for pointing out the issue.
  * 
  * @param this_url      URL to parse. (Required)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 2, August 23, 2002 
  */

code: |
 function GetUsernameFromURL(this_url) {
     var first_char       = "";
     var re_found_struct  = "";
     var num_expressions  = 0;
     
     this_url = trim(this_url);
     
     first_char = Left(this_url, 1);
     if (Find(first_char, "./")) {
         return "";   // relative URL = no username (ex: "../dir1/filename.html" or "/dir1/filename.html")
     } else if(Find("://", this_url)){
         // absolute URL    (ex: "ftp://user:pass@ftp.host.com")
         re_found_struct = REFind("(([^:@]*:)[^:@]*@)|([^:@]*@)", this_url, Find("://", this_url)+3, "True");
     } else {
         // abbreviated URL (ex: "user:pass@ftp.host.com")
         re_found_struct = REFind("(([^:@]*:)[^:@]*@)|([^:@]*@)", this_url, 1, "True");
     }
     
     if (re_found_struct.pos[1] GT 0) {
         num_expressions = ArrayLen(re_found_struct.pos);
         if(re_found_struct.pos[num_expressions] is 0) num_expressions = num_expressions - 1;
         return Mid(this_url, re_found_struct.pos[num_expressions], re_found_struct.len[num_expressions]-1);
     } else {
         return "";
     }
 }

---

