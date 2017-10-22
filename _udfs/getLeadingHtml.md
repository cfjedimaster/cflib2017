---
layout: udf
title:  getLeadingHtml
date:   2010-06-18T21:28:10.000Z
library: StrLib
argString: "input, maxChars"
author: Max Paperno
authorEmail: max@wdg.us
version: 1
cfVersion: CF5
shortDescription: Display N leading characters of a text block which may include HTML.
tagBased: false
description: |
 This UDF will return the first N characters of a text block (string). If the break lands in the middle of a word or HTML tag, the function will extend the selection until the end for the word/tag (so it will not break in the middle of a word/tag). It will also attempt to close any un-closed HTML tags (either due to bad HTML or due to the closing tags being cut off).
 
 This is useful for automatically generating &quot;teaser&quot; text for news items, event listings, etc. Based on JavaScript function of the same name by Steven Levithan ( http://blog.stevenlevithan.com/archives/get-html-summary ).

returnValue: Returns a string.

example: |
 <cfsavecontent variable="text">
 This is my input for the UDF. It will test the UDF and show me how well it crops and <b>ignores</b> HTML.
 </cfsavecontent>
 <cfoutput>#getLeadingHTMl(text, 50)#</cfoutput>

args:
 - name: input
   desc: String to parse.
   req: true
 - name: maxChars
   desc: Maximum number of characters.
   req: true


javaDoc: |
 /**
  * Display N leading characters of a text block which may include HTML.
  * 
  * @param input      String to parse. (Required)
  * @param maxChars      Maximum number of characters. (Required)
  * @return Returns a string. 
  * @author Max Paperno (max@wdg.us) 
  * @version 1, June 18, 2010 
  */

code: |
 function getLeadingHtml(input, maxChars) {
     // token matches a word, tag, or special character
     var    token = "[[:word:]]+|[^[:word:]<]|(?:<(\/)?([[:word:]]+)[^>]*(\/)?>)|<";
     var    selfClosingTag = "^(?:[hb]r|img)$";
     var    output = "";
     var    charCount = 0;
     var    openTags = ""; var strPos = 0; var tag = "";
     var i = 1;
 
     var    match = REFind(token, input, i, "true");
 
     while ( (charCount LT maxChars) AND match.pos[1] ) {
         // If this is an HTML tag
         if (match.pos[3]) {
             output = output & Mid(input, match.pos[1], match.len[1]);
             tag = Mid(input, match.pos[3], match.len[3]);
             // If this is not a self-closing tag
             if ( NOT ( match.pos[4] OR REFindNoCase(selfClosingTag, tag) ) ) {
                 // If this is a closing tag
                 if ( match.pos[2] AND ListFindNoCase(openTags, tag) ) {
                     openTags = ListDeleteAt(openTags, ListFindNoCase(openTags, tag)); 
                 } else {
                     openTags = ListAppend(openTags, tag);
                 }
             }
         } else {
             charCount = charCount +  match.len[1];
             if (charCount LTE maxChars) output = output & Mid(input, match.pos[1], match.len[1]);
         }
         
         i = i + match.len[1];
         match = REFind(token, input, i, "true");
     }
 
     // Close any tags which were left open
     while ( ListLen(openTags) ) {
         output = output & "</" & ListLast(openTags) & ">";
         openTags = ListDeleteAt(openTags, ListLen(openTags));
     }
 
     if ( Len(input) GT Len(output) )
         output = output & "...";
     
     return output;
 }

---

