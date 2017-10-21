---
layout: udf
title:  GetFileFromURL
date:   2002-02-22T01:06:25.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the file name from a specified URL.
description: |
 Returns the file name for the supplied URL. If no file is found, then returns an empty string. Works with any protocol that follows the standard &quot;filename.ext&quot; syntax include http, ftp, and others. Relative and absolute URLs are accepted.

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetFileFromURL("ftp://user:password@somehost.com/dir1/dir2/filename.htm")#<br>
 #GetFileFromURL("ftp://user:password@somehost.com/dir1/dir2")#<br>
 #GetFileFromURL("../filename.htm")#<br>
 #GetFileFromURL("../filename.htm##anchor")#<br>
 #GetFileFromURL("/filename.htm##anchor")#<br>
 #GetFileFromURL("somehost.com/filename.htm?query=true")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the file name from a specified URL.
  * 
  * @param this_url      URL to parse. 
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, March 4, 2002 
  */

code: |
 function GetFileFromURL(this_url) {
     var i               = 0;
     var cnt             = 0;
     var re_found_struct = "";
     var this_file_name  = "";
     var num_dots        = "";
     
     this_url = trim(this_url);
     
     // find the last "/" character, after the scheme
     if(not Find("/", this_url)) {
         i=1;
     } else {
         if(Find("://", this_url)){
             i = Find("://", this_url);
             cnt = Len(this_url) -i -2;
             if(cnt LT 1) cnt=1;
             this_url = Right(this_url, cnt);   // now the scheme is chopped off
         }
         i = Len(this_url) - Find("/", Reverse(this_url)) +2;
     }
     
     re_found_struct = REFind("([^##\?]+\.[^##\?]+)", this_url, i, "True");
     if (re_found_struct.pos[1] GT 0) {
         this_file_name = Mid(this_url, re_found_struct.pos[2], re_found_struct.len[2]);
         num_dots = (Len(this_file_name) - Len(Replace(this_file_name, ".", "", "ALL")));
         if ( ((not Find("/", this_url)) and (num_dots GT 1)) or (FindOneOf("@:", this_file_name)) ){
             // since this URL doesn't contain any "/" and since the "file" has two or more dots (".")
             // or if the filename contains a "@" or a ":"
             // then this filename is probably actually a host name
             return ""; 
         }
         return this_file_name;
     } else {
         return "";
     }
 }

---

