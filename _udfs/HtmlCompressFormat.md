---
layout: udf
title:  HtmlCompressFormat
date:   2002-11-19T14:31:28.000Z
library: StrLib
argString: "sInput"
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Replaces a huge amount of unnecessary whitespace from your HTML code.
tagBased: false
description: |
 This function is useful to reduce download time of your entire webpage. Client's will load pages noticably faster. Also very useful to compress a page before caching it for storage.
 
 Code is very useful in the fusebox 3 methodology, wrap this around your #fusebox.layout# variable to compress the html output.
 
 Code works on 3 levels of compression, and can easily be customized for more or different ways.
 
 Level 1: Replaces excessive spaces with no side effects.
 
 Level 2: (default) Removes more blank space but keeps html tags from wrapping into each other, so the code is still readable (maybe even more so)
 
 Level 3: Replaces all comments and any spaces possible, the side effect is space between html tags is removed, so alignment changes are possible.

returnValue: Returns a string.

example: |
 <cfoutput>
 <cfsavecontent variable="html">
 <table cellspacing="2" cellpadding="2" border="0">
 <tr>
     <td colspan="2">
         <b>Table Title</b>
     </td>
 </tr>
 <tr>
     <td>
         Column 1
     </td>
     <td>
         Column 2
     </td>
 </tr>
 </table>
 </cfsavecontent>
 <b>Before:</b><br>
   #HtmlCodeFormat(html)#
 <p>
 <b>After:</b><br>
  #HtmlCodeFormat(htmlCompressFormat(html, 2))#
 
 </cfoutput>

args:
 - name: sInput
   desc: HTML you wish to compress.
   req: true


javaDoc: |
 /**
  * Replaces a huge amount of unnecessary whitespace from your HTML code.
  * 
  * @param sInput      HTML you wish to compress. (Required)
  * @return Returns a string. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, November 19, 2002 
  */

code: |
 function HtmlCompressFormat(sInput)
 {
    var level = 2;
    if( arrayLen( arguments ) GTE 2 AND isNumeric(arguments[2]))
    {
       level = arguments[2];
    }
    // just take off the useless stuff
    sInput = trim(sInput);
    switch(level)
    {
       case "3":
       {
          //   extra compression can screw up a few little pieces of HTML, doh         
          sInput = reReplace( sInput, "[[:space:]]{2,}", " ", "all" );
          sInput = replace( sInput, "> <", "><", "all" );
          sInput = reReplace( sInput, "<!--[^>]+>", "", "all" );
          break;
       }
       case "2":
       {
          sInput = reReplace( sInput, "[[:space:]]{2,}", chr( 13 ), "all" );
          break;
       }
       case "1":
       {
          // only compresses after a line break
          sInput = reReplace( sInput, "(" & chr( 10 ) & "|" & chr( 13 ) & ")+[[:space:]]{2,}", chr( 13 ), "all" );
          break;
       }
    }
    return sInput;
 }

---

