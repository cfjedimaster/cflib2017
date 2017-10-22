---
layout: udf
title:  GetAnchorFromURL
date:   2002-02-22T01:19:13.000Z
library: StrLib
argString: "this_url"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns the page anchor from a specified URL.
tagBased: false
description: |
 Returns the page anchor for the supplied URL. If no anchor is found, then returns an empty string. Works with the http protocol where page anchors follow the &quot;filename#anchor&quot; syntax.

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetAnchorFromURL("http://somehost.com/dir1/dir2/filename.htm##anchor")#<br>
 #GetAnchorFromURL("filename.htm##anchor")#<br>
 #GetAnchorFromURL("filename.htm##")#<br>
 #GetAnchorFromURL("filename.htm")#<br>
 #GetAnchorFromURL("../filename.htm##anchor")#<br>
 </cfoutput>

args:
 - name: this_url
   desc: URL to parse.
   req: true


javaDoc: |
 /**
  * Returns the page anchor from a specified URL.
  * 
  * @param this_url      URL to parse. 
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, February 21, 2002 
  */

code: |
 function GetAnchorFromURL(this_url) {
     var re_found_struct = "";
     
     this_url = trim(this_url);
     
     re_found_struct = REFind("##[^\?]*", this_url, 1, "True");
     
     if (re_found_struct.pos[1] GT 0) {
         return Mid(this_url, re_found_struct.pos[1]+1, re_found_struct.len[1]-1);
     } else return "";
 }

---

