---
layout: udf
title:  firstParagraph
date:   2006-12-07T23:50:42.000Z
library: StrLib
argString: "str"
author: Neil Merton
authorEmail: neil.merton@mewebdev.net
version: 1
cfVersion: CF5
shortDescription: Finds the first paragraph in a given string.
description: |
 This function will return the first paragraph it finds in a string. It requires that the string is properly formed (i.e. has a closing paragraph tag).

returnValue: Returns a string.

example: |
 <cfsavecontent variable="paragraphs">
 <p>This is the first paragraph.</p>
 <p>Here's the second paragraph.</p>
 <p>And finally, the third paragraph.</p>
 </cfsavecontent>
 <cfoutput>#paragraphs#</cfoutput>
 <textarea id="newsExtract" name="newsExtract" cols="40" rows="5">
 <cfoutput>#firstParagraph(paragraphs)#</cfoutput>
 </textarea>

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Finds the first paragraph in a given string.
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Neil Merton (neil.merton@mewebdev.net) 
  * @version 1, December 7, 2006 
  */

code: |
 function firstParagraph(str) {
     str = trim(str);
     endTag = findNoCase("</p>", str);
     if (endTag gt 0) {
         endTag = endTag + 3;
         extract = left(str, endTag);
     } else {
         extract = str;
     }
     return extract;
 }

---

