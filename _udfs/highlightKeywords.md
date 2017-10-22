---
layout: udf
title:  highlightKeywords
date:   2012-09-29T23:21:50.000Z
library: StrLib
argString: "str, keywords, highlight"
author: Simon Bingham
authorEmail: me@simonbingham.me.uk
version: 1
cfVersion: CF9
shortDescription: Highlights words in a string that are found in a keyword list.
tagBased: false
description: |
 Highlights words in a string that are found in a keyword list. Useful for search result pages.

returnValue: Returns the string  with the keywords highlighted.

example: |
 <cfoutput>
 <cfset l = "foo">
 <cfset s = "foo zfooz foo foo zfoo fooz">
 #l#<br />
 #s#<br />
 #highlightKeywords(s, l)#<br />
 <hr />
 
 <cfset l = "foo,bar">
 <cfset s = "foo bar zfooz zbarz foo bar foo bar">
 #l#<br />
 #s#<br />
 #highlightKeywords(s, l, {tag="span", attributes='style="color:red;"'})#<br />
 <hr />
 
 <cfset s = "fooz bar zfooz zbarz foo bar foo zbar">
 #l#<br />
 #s#<br />
 #highlightKeywords(s, l, {tag="strong"})#<br />
 <hr />
 </cfoutput>

args:
 - name: str
   desc: The string to highlight.
   req: true
 - name: keywords
   desc: The list of keywords to highlight within the string.
   req: true
 - name: highlight
   desc: A struct containing keys for tag and attributes, These are used to highlight the keyword. Defaults to an EM tag.
   req: true


javaDoc: |
 /**
  * Highlights words in a string that are found in a keyword list.
  * v0.9 by Simon Bingham.
  * v1.0 by Adam Cameron. Improved regex and added configurable highlighting.
  * 
  * @param str      The string to highlight. (Required)
  * @param keywords      The list of keywords to highlight within the string. (Required)
  * @param highlight      A struct containing keys for tag and attributes, These are used to highlight the keyword. Defaults to an EM tag. (Required)
  * @return Returns the string  with the keywords highlighted. 
  * @author Simon Bingham (me@simonbingham.me.uk) 
  * @version 1.0, September 29, 2012 
  */

code: |
 string function highlightKeywords(required string str, required string keywords, struct highlight){
     var keyword        = "";
     var replacement    = "";
     
     param name="highlight.tag"            default="em";
     param name="highlight.attributes"    default="";
     
     for (var index=1; index <= listLen( arguments.keywords ); index++){
         keyword = listGetAt(arguments.keywords, index);
         replacement = "<#highlight.tag#";
         if (len(highlight.attributes)){
             replacement &= " #highlight.attributes#";
         }
         replacement &= ">" & keyword & "</#highlight.tag#>";
 
         arguments.str = reReplaceNoCase( arguments.str, "\b#keyword#\b", replacement, "all" );
     }
     return arguments.str;
 }

---

