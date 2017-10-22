---
layout: udf
title:  DeMoronize
date:   2010-09-02T18:32:51.000Z
library: StrLib
argString: "text"
author: Shawn Porter
authorEmail: sporter@rit.net
version: 2
cfVersion: CF5
shortDescription: Fixes text using Microsoft Latin-1 &quot;Extentions&quot;, namely ASCII characters 128-160.
tagBased: false
description: |
 Fixes text using Microsoft Latin-1 &quot;Extentions&quot;, namely ASCII characters 128-160.  Supplies semicolons where missing in HTML numeric and common non-numeric entities.
 
 This is a rough port of John Walker's demoroniser, written in Perl.
 http://www.fourmilab.ch/webtools/demoroniser/

returnValue: Returns a string.

example: |
 <cfset MSText = "My name is #Chr(147)#Foo#Chr(148)##Chr(133)#<br>">
 <cfoutput>With MS Latin-1 Extentions:<br>#MSText#</cfoutput>
 
 <cfset ValidText = DeMoronize(MSText)>
 <cfoutput>Valid ASCII:<br>#ValidText#</cfoutput>

args:
 - name: text
   desc: Text to be modified.
   req: true


javaDoc: |
 /**
  * Fixes text using Microsoft Latin-1 &quot;Extentions&quot;, namely ASCII characters 128-160.
  * ASCII8217 mod by Tony Brandner
  * 
  * @param text      Text to be modified. (Required)
  * @return Returns a string. 
  * @author Shawn Porter (sporter@rit.net) 
  * @version 2, September 2, 2010 
  */

code: |
 function deMoronize (text) {
     var i = 0;
 
 // map incompatible non-ISO characters into plausible 
     // substitutes
     text = Replace(text, Chr(128), "&euro;", "All");
 
     text = Replace(text, Chr(130), ",", "All");
     text = Replace(text, Chr(131), "<em>f</em>", "All");
     text = Replace(text, Chr(132), ",,", "All");
     text = Replace(text, Chr(133), "...", "All");
         
     text = Replace(text, Chr(136), "^", "All");
 
     text = Replace(text, Chr(139), ")", "All");
     text = Replace(text, Chr(140), "Oe", "All");
 
     text = Replace(text, Chr(145), "`", "All");
     text = Replace(text, Chr(146), "'", "All");
     text = Replace(text, Chr(147), """", "All");
     text = Replace(text, Chr(148), """", "All");
     text = Replace(text, Chr(149), "*", "All");
     text = Replace(text, Chr(150), "-", "All");
     text = Replace(text, Chr(151), "--", "All");
     text = Replace(text, Chr(152), "~", "All");
     text = Replace(text, Chr(153), "&trade;", "All");
 
     text = Replace(text, Chr(155), ")", "All");
     text = Replace(text, Chr(156), "oe", "All");
 
     // remove any remaining ASCII 128-159 characters
     for (i = 128; i LTE 159; i = i + 1)
         text = Replace(text, Chr(i), "", "All");
 
     // map Latin-1 supplemental characters into
     // their &name; encoded substitutes
     text = Replace(text, Chr(160), "&nbsp;", "All");
 
     text = Replace(text, Chr(163), "&pound;", "All");
 
     text = Replace(text, Chr(169), "&copy;", "All");
 
     text = Replace(text, Chr(176), "&deg;", "All");
 
     // encode ASCII 160-255 using ? format
     for (i = 160; i LTE 255; i = i + 1)
         text = REReplace(text, "(#Chr(i)#)", "&###i#;", "All");
 
     for (i = 8216; i LTE 8218; i = i + 1) text = Replace(text, Chr(i), "'", "All");
       
 // supply missing semicolon at end of numeric entities
     text = ReReplace(text, "&##([0-2][[:digit:]]{2})([^;])", "&##\1;\2", "All");
     
 // fix obscure numeric rendering of &lt; &gt; &amp;
     text = ReReplace(text, "&##038;", "&amp;", "All");
     text = ReReplace(text, "&##060;", "&lt;", "All");
     text = ReReplace(text, "&##062;", "&gt;", "All");
 
     // supply missing semicolon at the end of &amp; &quot;
     text = ReReplace(text, "&amp(^;)", "&amp;\1", "All");
     text = ReReplace(text, "&quot(^;)", "&quot;\1", "All");
 
     return text;
 }

---

