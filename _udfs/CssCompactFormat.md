---
layout: udf
title:  CssCompactFormat
date:   2002-11-19T14:43:42.000Z
library: StrLib
argString: "sInput"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Replaces all unnecessary characters from a section of CSS code.
tagBased: false
description: |
 This function is useful to reduce download time on large CSS style sheets, all unnecessary spaces are removed, pages will load faster. And your lovely CSS wont be ripped off as easily.

returnValue: Returns a string.

example: |
 <cfoutput>
 <cfsavecontent variable="css">
     .TextBig {
         font-size : 12pt;
         font-weight : normal;
         font-family : arial;
     }
     .TextSmall {
         font-size : 9pt;
         font-weight : normal;
         font-family : arial;
     }
     .TextTiny, SMALL {
         font-weight : normal;
         font-size : 8pt;
         font-family : helvetica;
     }
 </cfsavecontent>
 
 <b>Before:</b><br>
 &lt;style type="text/css"&gt;
 #HtmlCodeFormat(css)#
 &lt;/style&gt;
 <p>
 <b>After:</b><br>
 &lt;style type="text/css"&gt;
 #cssCompactFormat(css)#
 &lt;/style&gt;
 
 </cfoutput>

args:
 - name: sInput
   desc: CSS you want to compress.
   req: true


javaDoc: |
 /**
  * Replaces all unnecessary characters from a section of CSS code.
  * 
  * @param sInput      CSS you want to compress. (Required)
  * @return Returns a string. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, November 19, 2002 
  */

code: |
 function CssCompactFormat(sInput) {
   sInput = reReplace( sInput, "[[:space:]]{2,}", " ", "all" );
   sInput = reReplace( sInput, "/\*[^\*]+\*/", " ", "all" );
   sInput = reReplace( sInput, "[ ]*([:{};,])[ ]*", "\1", "all" );
   return sInput;
 }

---

