---
layout: udf
title:  GetSearchFromURL
date:   2002-02-22T01:24:56.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the search part from a specified URL.
tagBased: false
description: |
 Returns the search part from the supplied URL. If no search part is found, then returns an empty string. Works with any protocol that follows the &quot;?searchpart&quot; syntax, most notably HTTP.

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetSearchFromURL("http://somehost.com/dir1/dir2/filename.htm?q=perl+regular+expression")#<br>
 #GetSearchFromURL("filename.htm?action=detail&ID=8191")#<br>
 #GetSearchFromURL("?action=detail&ID=8191")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the search part from a specified URL.
  * 
  * @param this_url      URL to parse. 
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetSearchFromURL(this_url) {
     var re_found_struct = "";
     
     this_url = trim(this_url);
     
     // the search part is simply everything after a "?" character
     re_found_struct = REFind("\?.*", this_url, 1, "True");
     
     if (re_found_struct.pos[1] GT 0) {
         return Mid(this_url, re_found_struct.pos[1]+1, re_found_struct.len[1]);
     } else return "";
 }

---

