---
layout: udf
title:  GetPathFromURL
date:   2002-02-22T01:14:28.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the path from a specified URL.
tagBased: false
description: |
 Returns the path (minus the file name) for the passed URL. If no path is found, then returns an empty string. Works with any protocol that follows the standard &quot;/path/&quot; syntax include http, ftp, and others. Relative and absolute URLs are accepted. The last &quot;/&quot; character can be implied, but the final component name must not have any dots (&quot;.&quot;) or it will be considered a file name (see GetFileFromURL).

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetPathFromURL("ftp://user:password@somehost.com/dir1/dir2/filename.htm")#<br>
 #GetPathFromURL("ftp://user:password@somehost.com/dir1/dir2")#<br>
 #GetPathFromURL("ftp://user:password@somehost.com/")#<br>
 #GetPathFromURL("ftp://user:password@somehost.com")#<br>
 #GetPathFromURL("somehost.com:80/dir1/dir2/filename.htm")#<br>
 #GetPathFromURL("somehost.com/dir1/dir2/filename.htm")#<br>
 #GetPathFromURL("/dir1/dir2/filename.htm")#<br>
 #GetPathFromURL("../../dir1/dir2/filename.htm")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the path from a specified URL.
  * 
  * @param this_url      URL to parse. 
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetPathFromURL(this_url) {
     var first_char        = "";
     var re_found_struct   = "";
     var path              = "";
     var i                 = 0;
     var cnt               = 0;
     
     this_url = trim(this_url);
     
     first_char = Left(this_url, 1);
     if (Find(first_char, "./")) {
         // relative URL (ex: "../dir1/filename.html" or "/dir1/filename.html")
         re_found_struct = REFind("[^##\?]+", this_url, 1, "True");
     } else if(Find("://", this_url)){
         // absolute URL    (ex: "ftp://user:pass@ftp.host.com")
         re_found_struct = REFind("/[^##\?]*", this_url, Find("://", this_url)+3, "True");
     } else {
         // abbreviated URL (ex: "user:pass@ftp.host.com")
         re_found_struct = REFind("/[^##\?]*", this_url, 1, "True");
     }
     
     if (re_found_struct.pos[1] GT 0)  {
         // get path with filename (if exists)
         path = Mid(this_url, re_found_struct.pos[1], re_found_struct.len[1]);
         
         // chop off the filename
          if(find("/", path)) {
             i = len(path) - find("/" ,reverse(path)) +1;
             cnt = len(path) -i;
             if (cnt LT 1) cnt =1;
             if (REFind("[^##\?]+\.[^##\?]+", Right(path, cnt))){
                 // if the part after the last slash is a file name then chop it off
                 path = Left(path, i);
             }
         }
         return path;
     } else {
         return "";
     }
 }

---

