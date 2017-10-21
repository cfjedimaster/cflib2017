---
layout: udf
title:  acronym
date:   2013-07-18T07:48:25.000Z
library: StrLib
argString: "sTerms"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Pass in a set of words to only display its acronym.
description: |
 Takes a full string of words as input then converts it for proper display in the html &lt;acronym&gt; tag. That way you see the acronym but in most browsers you can put your mouse over the acronym to display its full meaning. I often see acronyms used in Blogs.

returnValue: Returns a string.

example: |
 <cfoutput>I love #acronym( "Hyper Text Markup Language" )#.</cfoutput>

args:
 - name: sTerms
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Pass in a set of words to only display its acronym.
  * 
  * @param sTerms      String to modify. (Required)
  * @return Returns a string. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, July 18, 2013 
  */

code: |
 function acronym(sTerms) {
     return '<acronym title="' & sTerms & '">' & trim( reReplaceNoCase( " " & sTerms & " ", "(\w)\w+\s", "\1", "all" ) ) & '</acronym>';
 }

---

