---
layout: udf
title:  Highlight
date:   2003-06-12T18:39:01.000Z
library: StrLib
argString: "string, word[, front][, back][, matchCase]"
author: Dave Forrest
authorEmail: dmf67@yahoo.com
version: 2
cfVersion: CF5
shortDescription: Applies a simple highlight to a word in a string.
description: |
 This function applies a highlight to a word in a string. For example, you can use this to highlight search terms in the search results.

returnValue: Returns a string.

example: |
 <CFSAVECONTENT VARIABLE="String">
 This is a Test of the National Broadcasting System. If this had been a real emergency, most
 likely you would already be dead by now. Please do not call us, we will call you. If you would
 like to foo the foo, please send a check and two thousand dollars in hotdogs to the solution
 provided by the manual. We don't test everything, just the things we test. Please leave your
 shoes by the front door. I have a child and I have children in my home.
 </CFSAVECONTENT>
 
 <CFOUTPUT>
 Version 1, default settings.<BR>
 #highLight(String,"test")#
 <P>
 Version 2, changed highlight options to a red bold background.<BR>
 #highLight(String,"test","<span style=""background-color: red; font-weight: bold;"">","</span>")#
 <P>
 Version 3, case sensitive highlight on Test.<BR>
 #highLight(String,"Test","<span style=""background-color: red; font-weight: bold;"">","</span>",1)#
 <p>
 Illustratures using regex to match child, not child inside children.<br>
 #highLight(string,"\bchild\b")#
 
 </CFOUTPUT>

args:
 - name: string
   desc: The string to format.
   req: true
 - name: word
   desc: The word to highlight.
   req: true
 - name: front
   desc: This is the HTML that will be placed in front of the highlighted match. It defaults to <span style=
   req: false
 - name: back
   desc: This is the HTML that will be placed at the end of the highlighted match. Defaults to </span>
   req: false
 - name: matchCase
   desc: If true, the highlight will only match when the case is the same. Defaults to false.
   req: false


javaDoc: |
 /**
  * Applies a simple highlight to a word in a string.
  * Original version by Raymond Camden.
  * 
  * @param string      The string to format. (Required)
  * @param word      The word to highlight. (Required)
  * @param front      This is the HTML that will be placed in front of the highlighted match. It defaults to <span style= (Optional)
  * @param back      This is the HTML that will be placed at the end of the highlighted match. Defaults to </span> (Optional)
  * @param matchCase      If true, the highlight will only match when the case is the same. Defaults to false. (Optional)
  * @return Returns a string. 
  * @author Dave Forrest (dmf67@yahoo.com) 
  * @version 2, June 12, 2003 
  */

code: |
 function highLight(source,lookfor) {
     var tmpOn       = "[;;^";
     var tmpOff      = "^;;]";
     var hilightitem    = "<SPAN STYLE=""background-color:yellow;"">";
     var endhilight  = "</SPAN>";
     var matchCase   = false;
     var obracket    = "";
     var tmps        = "";
     var stripperRE  = "";
     var badTag        = "";
     var nextStart    = "";
     
     if(ArrayLen(arguments) GTE 3) hilightitem = arguments[3];
     if(ArrayLen(arguments) GTE 4) endhilight  = arguments[4];
     if(ArrayLen(arguments) GTE 5) matchCase   = arguments[5];
     if(NOT matchCase)     source = REReplaceNoCase(source,"(#lookfor#)","#tmpOn#\1#tmpOff#","ALL");
     else                 source = REReplace(source,"(#lookfor#)","#tmpOn#\1#tmpOff#","ALL");
     obracket   = find("<",source);
     stripperRE = "<.[^>]*>";    
     while(obracket){
         badTag = REFindNoCase(stripperRE,source,obracket,1);
         if(badTag.pos[1]){
             tmps       = Replace(Mid(source,badtag.pos[1],badtag.len[1]),"#tmpOn#","","ALL");
             source       = Replace(source,Mid(source,badtag.pos[1],badtag.len[1]),tmps,"ALL");
             tmps       = Replace(Mid(source,badtag.pos[1],badtag.len[1]),"#tmpOff#","","ALL");
             source       = Replace(source,Mid(source,badtag.pos[1],badtag.len[1]),tmps,"ALL");
             nextStart = badTag.pos[1] + badTag.len[1];
         }
         else nextStart = obracket + 1;
         obracket = find("<",source,nextStart);
     }
     source = Replace(source,tmpOn,hilightitem,"ALL");
     source = Replace(source,tmpOff,endhilight,"ALL");
     return source;
 }

---

