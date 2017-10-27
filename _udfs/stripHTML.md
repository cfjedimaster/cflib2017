---
layout: udf
title:  stripHTML
date:   2016-05-10T22:48:53.000Z
library: StrLib
argString: "string"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 5
cfVersion: CF5
shortDescription: Removes HTML from the string.
tagBased: false
description: |
 Returns the string with all HTML removed. Unlike HTMLEditFormat which escapes HTML, this function actually removes the HTML.

returnValue: Returns a string.

example: |
 <cfset str="the <B>dog</B> jumped over the <A HREF=""foo.html"">fox</A>.">
 <cfoutput>
 Given str=#str#<BR>
 The StripHTML version is #StripHTML(str)#
 </cfoutput>

args:
 - name: string
   desc: String to be modified.
   req: true


javaDoc: |
 /**
  * Removes HTML from the string.
  * v2 - Mod by Steve Bryant to find trailing, half done HTML.
  * v4 mod by James Moberg - empties out script/style blocks
  * v5 mod by dolphinsboy
  * 
  * @param string      String to be modified. (Required)
  * @return Returns a string. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 4, October 4, 2010 
  */

code: |
 function stripHTML(str) {
     // remove the whole tag and its content
     var list = "style,script,noscript";
     for (var tag in list){
         str = reReplaceNoCase(str, "<s*(#tag#)[^>]*?>(.*?)","","all");
     }
 
     str = reReplaceNoCase(str, "<.*?>","","all");
     //get partial html in front
     str = reReplaceNoCase(str, "^.*?>","");
     //get partial html at end
     str = reReplaceNoCase(str, "<.*$","");
 
     return trim(str);
 
 }

oldId: 12
---

