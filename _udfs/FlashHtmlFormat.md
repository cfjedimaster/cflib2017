---
layout: udf
title:  FlashHtmlFormat
date:   2003-09-15T20:37:54.000Z
library: StrLib
argString: "text"
author: William Steiner
authorEmail: williams@hkusa.com
version: 1
cfVersion: CF5
shortDescription: Converts a string into &quot;Flash&quot; safe HTML.
tagBased: false
description: |
 Flash doesn't support all html tags, and is very strict on the format of the tags it does support. This function to attempts to convert the string into &quot;Flash Safe&quot; HTML code.  Including simulation of &lt;ol&gt; and &lt;li&gt; tags.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="text">
 This some <b>html</b> text. It's <i>very</i> interesting.
 <p>
 <ol>
 <li>List items...
 <li>More list items.
 </ol>
 <p>
 <table>
 <tr>
 <td>foo</td>
 </tr>
 </table>
 </cfsavecontent>
 
 <cfoutput>
 &DisplayText=#FlashHtmlFormat(text)#&
 </cfoutput>

args:
 - name: text
   desc: Text to be converted.
   req: true


javaDoc: |
 /**
  * Converts a string into &quot;Flash&quot; safe HTML.
  * 
  * @param text      Text to be converted. (Required)
  * @return Returns a string. 
  * @author William Steiner (williams@hkusa.com) 
  * @version 1, September 15, 2003 
  */

code: |
 function FlashHTMLFormat(someText) {
     var returnText = someText;
     var listCount = 0;
     returnText = ReplaceNoCase(returnText, "#Chr(10)#", "", "ALL");
     returnText = ReplaceNoCase(returnText, "<OL></OL>", "", "ALL");
     returnText = StripCR(returnText);
 
     while (FindNoCase('<OL>', returnText) neq 0) {
         while ((FindNoCase('</OL>', returnText) gt FindNoCase('<li>', returnText)) AND (FindNoCase('<li>', returnText) neq 0)) {
             startSearchAt = FindNoCase('<OL>', returnText);
             listCount = listCount + 1;
             // replaces the next <li> with the correct number.
             if (listCount gt 9)
                 returnText = ReplaceNoCase(returnText, "<li>", "<BR>  #listCount#.  ");
             else
                 returnText = ReplaceNoCase(returnText, "<li>", "<BR>    #listCount#.  ");
         }
         // we are done with that list, get rid of the <ol> tag so we can find the next 
         listCount = 0;
         returnText = ReplaceNoCase(returnText, "<OL>", "<br>", "one"); 
         returnText = ReplaceNoCase(returnText, "</OL>", "<br><br>", "one"); 
     }
     
     returnText = ReplaceNoCase(returnText, "<LI>", "<br>", "ALL"); 
     // Step xx, get rid of ALL </li>, </ol>, and </ul> tags
     returnText = ReplaceNoCase(ReplaceNoCase(ReplaceNoCase(returnText, "</li>", "", "ALL"), "</ol>", "<br><br>", "ALL"), "</ul>", "<br><br>", "ALL");
     // Step xx, REReplace statement changes the color attribute of the font tag to have
     // quotes around it...ActiveEdit strips them out :(
     returnText = REReplaceNoCase(returnText, "<FONT color=(#Chr(35)#[A-Za-z0-9]*)></FONT>", "", "ALL");
     returnText = REReplaceNoCase(returnText, "target=([A-Za-z0-9_]*)", "target=#Chr(34)#\1#Chr(34)#", "ALL");
     returnText = REReplaceNoCase(returnText, "face=([A-Za-z0-9_ ]*)", "face=#Chr(34)#\1#Chr(34)#", "ALL");
     returnText = REReplaceNoCase(returnText, "color=(#Chr(35)#[A-Za-z0-9]*)", "color=#Chr(34)#\1#Chr(34)#", "ALL");
     returnText = REReplaceNoCase(returnText, "size=([A-Za-z0-9]*)", "size=#Chr(34)#\1#Chr(34)#", "ALL");
     returnText = ReplaceNoCase(returnText, "&nbsp;", " ", "ALL");
     returnText = ReplaceNoCase(returnText, "&##39;", "'", "ALL");
     returnText = ReplaceNoCase(returnText, "'", "'", "ALL");
     returnText = ReplaceNoCase(returnText, "'", "'", "ALL");
     returnText = ReplaceNoCase(returnText, """", "#Chr(34)#", "ALL");
     returnText = ReplaceNoCase(returnText, """", "#Chr(34)#", "ALL");
     returnText = ReplaceNoCase(returnText, "<EM>", "<I>", "ALL");
     returnText = ReplaceNoCase(returnText, "</EM>", "</I>", "ALL");
     returnText = ReplaceNoCase(returnText, "<STRONG>", "<B>", "ALL");
     returnText = ReplaceNoCase(returnText, "</STRONG>", "</B>", "ALL");
     return returnText;
 }

---

