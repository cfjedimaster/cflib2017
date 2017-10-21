---
layout: udf
title:  GetSchemeFromURL
date:   2002-02-22T01:22:56.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the scheme from a specified URL.
description: |
 Returns the scheme (ending with &quot;://&quot;) for the passed URL. If no scheme is found, then returns an empty string. Works with any protocol that follows a &quot;scheme://x&quot; syntax.

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetSchemeFromURL("http://host.com/")#<br>
 #GetSchemeFromURL("ftp://@host.com/")#<br>
 #GetSchemeFromURL("host.com/")#<br>
 #GetSchemeFromURL("telnet://guest:pass@somehost.com:21/")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the scheme from a specified URL.
  * 
  * @param this_url      URL to parse. 
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetSchemeFromURL(this_url) {
     var i = 0;
     
     this_url = trim(this_url);
     
     i = Find("://", this_url, 1);
     if (i LT 1) {
         return ""; // relative url = no scheme   (ex: "../dir1/filename.html" or "/dir1/filename.html")
     } else {
         return Left(this_url, i+2);  // return the "://" and everything to the left of it
     }
 }

---

