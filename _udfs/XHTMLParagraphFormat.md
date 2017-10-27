---
layout: udf
title:  XHTMLParagraphFormat
date:   2008-07-02T20:18:18.000Z
library: StrLib
argString: "string[, attributeString]"
author: Jeff Howden
authorEmail: cflib@jeffhowden.com
version: 1
cfVersion: CF5
shortDescription: Returns a XHTML compliant string wrapped with properly formatted paragraph tags.
tagBased: false
description: |
 Returns a string that starts with an opening paragraph tag, ends with a closing paragraph tag, has all CR/LF replaced with closing and then opening paragraph tags, and also accepts an optional argument that can be used to assign attributes to all opening paragraph tags inserted into the string.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="myVar">The nice thing about this function is that it will allow you to pass a string representing additional attributes to apply each opening paragraph tag applied to the string.
 Additionally, unlike the built-in ParagraphFormat() function, the string returned by the function begins with an opening paragraph tag (&lt;p&gt;) and ends with a closing paragraph tag (&lt;/p&gt;).  It also inserts a closing paragraph tag (&lt;/p&gt;) before starting the next paragraph.
 Finally, for those of you who like to have your applications generate nicely formatted HTML, this tag breaks each paragraph on to a separate line.</cfsavecontent>
 
 <cfoutput>#XHTMLParagraphFormat(myVar, "style=""font-family: tahoma; font-size: 12px; color: ##000099""")#</cfoutput>

args:
 - name: string
   desc: String you want XHTML formatted.
   req: true
 - name: attributeString
   desc: Optional attributes to assign to all opening paragraph tags (i.e. style=""font-family&#58; tahoma"").
   req: false


javaDoc: |
 /**
  * Returns a XHTML compliant string wrapped with properly formatted paragraph tags.
  * 
  * @param string      String you want XHTML formatted. (Required)
  * @param attributeString      Optional attributes to assign to all opening paragraph tags (i.e. style=""font-family: tahoma""). (Optional)
  * @return Returns a string. 
  * @author Jeff Howden (cflib@jeffhowden.com) 
  * @version 1, July 2, 2008 
  */

code: |
 function XHTMLParagraphFormat(string)
 {
   var attributeString = '';
   var returnValue = '';
   if(ArrayLen(arguments) GTE 2) attributeString = ' ' & arguments[2];
   if(Len(Trim(string)))
     returnValue = '<p' & attributeString & '>' & Replace(string, Chr(13) & Chr(10), '</p>' & Chr(13) & Chr(10) & '<p' & attributeString & '>', 'ALL') & '</p>';
   return returnValue;
 }

oldId: 419
---

